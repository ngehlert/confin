import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account, Booking, RequestResult } from '../types';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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
        ).pipe(map((result: RequestResult<Array<Account>>) => result.data));
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
        ).pipe(map((result: RequestResult<Array<Booking>>): Array<TableEntry> => {
            return result.data.map((booking: Booking) => {
                return {booking, date: startOfDay(new Date(booking.date))}
            });
        }));
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
                field: 'booking.category_id',
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
}
