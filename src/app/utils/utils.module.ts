import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ColoredCurrencyDirective } from './colored-currency/colored-currency.directive';

@NgModule({
    declarations: [
        ColoredCurrencyDirective,
    ],
    imports: [
        CommonModule
    ],
    providers: [
        CurrencyPipe,
    ],
    exports: [
        ColoredCurrencyDirective,
    ]
})
export class UtilsModule { }
