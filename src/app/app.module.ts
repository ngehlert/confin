import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { DemoInterceptor } from './demo.interceptor';

export const tokenGetter: () => string | null = (): string | null => localStorage.getItem(environment.tokenKey);

@NgModule({
    imports: [
        BrowserModule,
        ThemeModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatMenuModule,
        HttpClientModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: ['confin-api.ngehlert.de'],
                disallowedRoutes: ['https://confin-api.ngehlert.de/index.php/auth', /.*de\.svg$/, /.*gb\.svg$/],
                throwNoTokenError: false,
            },
        }),
    ],
    providers: [
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
            hasBackdrop: true,
            scrollStrategy: new NoopScrollStrategy(),
        }},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DemoInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
    ],
})
export class AppModule { }
