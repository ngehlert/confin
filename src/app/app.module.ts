import { NgModule } from '@angular/core';
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
    ],
    providers: [],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
})
export class AppModule { }
