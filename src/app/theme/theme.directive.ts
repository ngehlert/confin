import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ThemeService } from './theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AvailableProperties, IThemeOptions } from './Theme';

@Directive({
    selector: '[appTheme]'
})
export class ThemeDirective implements OnInit, OnDestroy {

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
            this.elementRef.nativeElement.style.setProperty(key, theme.customProperties[key as AvailableProperties]);
        });
    }

}
