import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { UtilsModule } from '../utils/utils.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatCardModule,
        UtilsModule,
        AgGridModule.withComponents([]),
    ],
    exports: [
        CommonModule,
    ],
})
export class DashboardModule { }
