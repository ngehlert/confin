import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
@Directive({
    selector: '[onFocus]',
})
export class OnFocusDirective {
    @Input('onFocus') public classes: Array<string> = [];

    private el: ElementRef;
    constructor(private _el: ElementRef, public renderer: Renderer2) {
        this.el = this._el;
    }

    @HostListener('focus', ['$event'])
    public onFocus(): void {
        this.addClasses();
    }

    @HostListener('blur', ['$event'])
    public onblur(): void {
        this.removeClasses();
    }

    @HostListener('mouseenter')
    public onMouseEnter(): void {
        this.addClasses();
    }

    @HostListener('mouseleave')
    public onMouseLeave() : void{
        this.removeClasses();
    }

    private addClasses(): void {
        this.classes.forEach((style: string) => {
            this.renderer.addClass(this._el.nativeElement, style);
        });
    }

    private removeClasses(): void {
        this.classes.forEach((style: string) => {
            this.renderer.removeClass(this._el.nativeElement, style);
        });
    }
}
