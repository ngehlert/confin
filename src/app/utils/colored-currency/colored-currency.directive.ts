import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Directive({
  selector: '[appColoredCurrency]'
})
export class ColoredCurrencyDirective implements OnChanges{
    @Input() public appColoredCurrency?: number;

    constructor(private elementRef: ElementRef, private currencyPipe: CurrencyPipe) {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.appColoredCurrency && changes.appColoredCurrency.currentValue !== undefined) {
            if (changes.appColoredCurrency.currentValue < 0) {
                this.elementRef.nativeElement.style.color = '#FF5722';
            } else if (changes.appColoredCurrency.currentValue > 0) {
                this.elementRef.nativeElement.style.color = '#4CAF50';
            }
            this.elementRef.nativeElement.innerHTML = this.currencyPipe.transform(changes.appColoredCurrency.currentValue);
        }
    }



}
