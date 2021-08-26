import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { UtilsModule } from '../utils/utils.module';
import { AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { A11yModule } from '@angular/cdk/a11y';
import { OnFocusDirective } from './on-focus.directive';

@NgModule({
    declarations: [
        DashboardComponent,
        OnFocusDirective,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatRippleModule,
        UtilsModule,
        AgGridModule.withComponents([]),
        A11yModule,
    ],
    exports: [
        CommonModule,
    ],
})
export class DashboardModule { }
