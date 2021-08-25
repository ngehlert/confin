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

@NgModule({
    declarations: [
        DashboardComponent,
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
    ],
    exports: [
        CommonModule,
    ],
})
export class DashboardModule { }
