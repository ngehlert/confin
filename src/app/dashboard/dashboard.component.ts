import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Account, RequestResult } from '../types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.styl']
})
export class DashboardComponent implements OnInit {

    public accounts$?: Observable<Array<Account>>;

    constructor(
        private http: HttpClient,
    ) { }

    public ngOnInit(): void {
        this.accounts$ = this.http.get<RequestResult<Array<Account>>>(
            `${environment.apiUrl}/accounts`
        ).pipe(map((result: RequestResult<Array<Account>>) => result.data));
    }
}
