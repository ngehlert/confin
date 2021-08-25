import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account, Booking, Category, RequestResult } from '../types';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ColDef } from 'ag-grid-community';
import { startOfDay, subDays, addDays, format } from 'date-fns';
import { ValueFormatterParams } from 'ag-grid-community/dist/lib/entities/colDef';
import { CurrencyPipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

    @ViewChild('agGrid', {static: false}) public agGrid?: AgGridAngular;
    @ViewChild('tableSection', {static: false}) public tableSection?: ElementRef;

    public accounts$?: Observable<Array<Account>>;

    public columnDefs: Array<ColDef> = this.getColumnDefs();
    public defaultColDef: ColDef = {
        sortingOrder: ['desc', 'asc'],
        floatingFilter: true,
        suppressMenu: true,
    }
    public tableData: Observable<Array<TableEntry>> = of([]);
    public hasTableData: boolean = false;

    constructor(
        private http: HttpClient,
        private currencyPipe: CurrencyPipe,
    ) { }

    public ngOnInit(): void {
        this.accounts$ = this.http.get<RequestResult<Array<Account>>>(
            `${environment.apiUrl}/accounts`
        ).pipe(map((result: RequestResult<Array<Account>>) => result.data.filter((account: Account) => account.visible)));
    }

    public loadBookings(accountId: number): void {
        if (!accountId) {
            return;
        }
        this.hasTableData = true;
        setTimeout(() => {
            if (this.tableSection) {
                window.scrollTo({ top: this.tableSection.nativeElement.offsetTop, behavior: 'smooth' })
            }
        });

        const fromDate: string = format(subDays(new Date(), 30), 'yyyy-MM-dd');
        const toDate: string = format(addDays(new Date(), 7), 'yyyy-MM-dd');
        this.tableData = this.http.get<RequestResult<Array<Booking>>>(
            `${environment.apiUrl}/bookings?from=${fromDate}&to=${toDate}&accountId=${accountId}`
        ).pipe(
            map((result: RequestResult<Array<Booking>>): Array<TableEntry> => {
                return result.data
                    .map((booking: Booking) => {
                        return {booking, date: startOfDay(new Date(booking.date))}
                    });
            }),
            switchMap((tableEntries: Array<TableEntry>) => {
                const categoryIds: Set<number> = new Set(tableEntries.map((entry: TableEntry) => entry.booking.category_id));
                categoryIds.delete(0);

                return this.loadCategories(categoryIds).pipe(map((categories: Array<Category>) => {
                    const categoriesById: Map<number, Category> = new Map();
                    categories.forEach((category: Category) => categoriesById.set(category.id, category));
                    return tableEntries.map((entry: TableEntry) => {
                        if (entry.booking.category_id !== 0) {
                            entry.category = categoriesById.get(entry.booking.category_id);
                        }

                        return entry;
                    })
                }))
            })
        );
    }

    private loadCategories(categoryIds: Set<number>): Observable<Array<Category>> {
        categoryIds.delete(0);
        if (categoryIds.size === 0) {
            return of([]);
        }

        return this.http.get<RequestResult<Array<Category>>>(
            `${environment.apiUrl}/categories/${Array.from(categoryIds).join(',')}`
        ).pipe(map((result: RequestResult<Array<Category>>) => result.data));
    }

    private getColumnDefs(): Array<ColDef> {
        return [
            {
                headerName: $localize`COLUMN_HEADER_NAME`,
                field: 'booking.name',
                filter: 'agTextColumnFilter',
                minWidth: 150,
                flex: 2,
            },
            {
                headerName: $localize`COLUMN_HEADER_CATEGORY`,
                field: 'category.name',
                filter: 'agTextColumnFilter',
                minWidth: 150,
                flex: 1,
            },
            {
                headerName: $localize`COLUMN_HEADER_DATE`,
                field: 'date',
                filter: 'agDateColumnFilter',
                width: 210,
                valueFormatter(params: ValueFormatterParams): string {
                    return format(params.value, 'dd.MM.yyyy');
                },
                filterParams: {
                    buttons: ['apply', 'reset'],
                },
                sort: 'desc',
            },
            {
                headerName: $localize`COLUMN_HEADER_PRICE`,
                field: 'booking.price',
                filter: 'agNumberColumnFilter',
                pinned: 'right',
                width: 120,
                valueFormatter: (params: ValueFormatterParams): string => {
                    return this.currencyPipe.transform(params.value) || '';
                },
                cellStyle: {
                    'text-align': 'right',
                }
            }
        ]
    }
}

interface TableEntry {
    booking: Booking;
    date: Date;
    category?: Category;
}
