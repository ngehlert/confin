import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableProperties, IThemeOptions } from './Theme';

@Directive({
    selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

    @Input() public attachToBody: boolean = false;

    private unsubscribe: Subject<boolean> = new Subject();

    constructor(
        private elementRef: ElementRef,
        private themeService: ThemeService
    ) {}

    public ngOnInit(): void {
        const active: IThemeOptions = this.themeService.getActiveTheme();
        if (active) {
            this.updateTheme(active);
        }
        this.themeService.themeChange
            .pipe(
                takeUntil(this.unsubscribe)
            )
            .subscribe((theme: IThemeOptions) => this.updateTheme(theme));
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next();
    }

    public updateTheme(theme: IThemeOptions): void {
        Object.keys(theme.customProperties).forEach((key: string): void => {
            if (this.attachToBody) {
                this.elementRef.nativeElement.closest('body').style.setProperty(key, theme.customProperties[key as AvailableProperties]);
            } else {
                this.elementRef.nativeElement.style.setProperty(key, theme.customProperties[key as AvailableProperties]);
            }
        });
    }

}
