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
import { HttpClientModule } from '@angular/common/http';

export const tokenGetter: () => string | null = (): string | null => sessionStorage.getItem(environment.tokenKey);

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
                throwNoTokenError: true,
            },
        }),
    ],
    providers: [
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}
    ],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
    ],
})
export class AppModule { }
