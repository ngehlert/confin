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
import { CardModule } from '../shared/card/card.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountComponent } from './dialogs/account/account.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        DashboardComponent,
        AccountComponent,
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
        CardModule,
        FlexLayoutModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        CommonModule,
    ],
})
export class DashboardModule { }
