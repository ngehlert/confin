import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MatRippleModule } from '@angular/material/core';
import { UtilsModule } from '../../utils/utils.module';



@NgModule({
    declarations: [
        CardComponent,
    ],
    exports: [
        CardComponent,
    ],
    imports: [
        CommonModule,
        MatRippleModule,
        UtilsModule,
    ]
})
export class CardModule { }
