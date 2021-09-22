import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account, Booking, Category, RequestResult } from '../types';
import { Observable, of } from 'rxjs';
import { finalize, map, publishReplay, refCount, switchMap, take } from 'rxjs/operators';
import { ColDef } from 'ag-grid-community';
import { startOfDay, subDays, addDays, format } from 'date-fns';
import { ValueFormatterParams } from 'ag-grid-community/dist/lib/entities/colDef';
import { CurrencyPipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
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
    public areAccountsLoading: boolean = false;

    private currentlyVisibleAccount: number | null = null;

    constructor(
        private http: HttpClient,
        private currencyPipe: CurrencyPipe,
        private changeDetector: ChangeDetectorRef,
    ) { }

    public ngOnInit(): void {
        this.loadAccounts();
    }

    public loadBookings(accountId: number): void {
        if (!accountId) {
            return;
        }
        this.currentlyVisibleAccount = accountId;
        this.showTable();
        this.scrollToTable();
        this.updateTableData(accountId);
        this.selectFirstTableCell();
    }

    public addBooking(): void {
        console.log(this.currentlyVisibleAccount);
    }

    private showTable(): void {
        this.hasTableData = true;
        this.changeDetector.detectChanges();
    }

    private loadAccounts(): void {
        this.areAccountsLoading = true;
        this.accounts$ = this.http.get<RequestResult<Array<Account>>>(
            `${environment.apiUrl}/accounts`
        ).pipe(
            map((result: RequestResult<Array<Account>>) => result.data.filter((account: Account) => account.visible)),
            publishReplay(1),
            refCount(),
            finalize(() => { this.areAccountsLoading = false; }),
        );
    }

    private scrollToTable(): void {
        if (this.tableSection) {
            window.scrollTo({ top: this.tableSection.nativeElement.offsetTop - 64, behavior: 'smooth' });
        }
    }

    private selectFirstTableCell(): void {
        if (this.agGrid) {
            this.agGrid.rowDataChanged.pipe(take(1)).subscribe(() => {
                setTimeout(() => {
                    if (this.agGrid) {
                        this.agGrid.api.setFocusedCell(0, 'name');
                    }
                }, 200)
            });
        }
    }

    private updateTableData(accountId: number): void {
        if (!this.agGrid) {
            return;
        }
        this.agGrid.api.showLoadingOverlay();
        const fromDate: string = format(subDays(new Date(), 30), 'yyyy-MM-dd');
        const toDate: string = format(addDays(new Date(), 7), 'yyyy-MM-dd');
        this.http.get<RequestResult<Array<Booking>>>(
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
            }),
            take(1),
        ).subscribe((result: Array<TableEntry>) => {
            if (this.agGrid) {
                this.agGrid.api.setRowData(result);
            }
        });
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
                colId: 'name',
                headerName: $localize`COLUMN_HEADER_NAME`,
                field: 'booking.name',
                filter: 'agTextColumnFilter',
                minWidth: 150,
                flex: 2,
            },
            {
                colId: 'category',
                headerName: $localize`COLUMN_HEADER_CATEGORY`,
                field: 'category.name',
                filter: 'agTextColumnFilter',
                minWidth: 150,
                flex: 1,
            },
            {
                colId: 'date',
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
                colId: 'price',
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
