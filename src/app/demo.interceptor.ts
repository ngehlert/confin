import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpContextToken, HttpContext, HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Account } from './types';

export const DEMO_REQUEST = new HttpContextToken<boolean>(() => false);

@Injectable()
export class DemoInterceptor implements HttpInterceptor {

    private accounts: Map<number, Account> = new Map();

    constructor() {
        this.setUpFakeAccounts();
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        /**
         * Filter out all results that are not requests to the api
         */
        if (!request.url.includes(environment.apiUrl)) {
            return next.handle(request);
        }

        /**
         * Filter out all results that do not contain the demo context
         */
        if(!request.context.get(DEMO_REQUEST)) {
            return next.handle(request);
        }

        const body: Record<string, unknown> = {
            data: [],
        };
        if (request.url.endsWith('/accounts')) {
            body.data = Array.from(this.accounts.values());
        }

        return of(new HttpResponse({body}));
    }

    private setUpFakeAccounts(): void {
        this.accounts.set(1, {
            id: 1,
            name: 'Deutsche Bank',
            start: 200,
            balance: 400,
            visible: true,
        });
        this.accounts.set(2, {
            id: 2,
            name: 'Wallstreet',
            start: 1000,
            balance: 9000,
            visible: true,
        });
        this.accounts.set(3, {
            id: 3,
            name: 'Cash',
            start: 0,
            balance: 20,
            visible: true,
        });
    }
}
