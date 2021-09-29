import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ColoredCurrencyDirective } from './colored-currency/colored-currency.directive';
import { OnFocusDirective } from './on-focus.directive';

@NgModule({
    declarations: [
        ColoredCurrencyDirective,
        OnFocusDirective,
    ],
    imports: [
        CommonModule
    ],
    providers: [
        CurrencyPipe,
    ],
    exports: [
        ColoredCurrencyDirective,
        OnFocusDirective,
    ]
})
export class UtilsModule { }
