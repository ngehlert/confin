import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeModule } from './theme/theme.module';

@NgModule({
    imports: [
        BrowserModule,
        ThemeModule,
        AppRoutingModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
})
export class AppModule { }
