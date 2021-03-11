import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Theme } from './theme/Theme';
// @ts-ignore
import deFlag from '!!raw-loader!/node_modules/svg-country-flags/svg/de.svg';
// @ts-ignore
import enFlag from '!!raw-loader!/node_modules/svg-country-flags/svg/gb.svg';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    public isLightThemeActive: boolean = true;
    public selectedFlag: string = 'deFlag';

    constructor(
        private themeService: ThemeService,
        private iconRegistry: MatIconRegistry,
        private sanitizer: DomSanitizer,
        @Inject(LOCALE_ID) private locale: string,
        private router: Router,
    ) {
        this.iconRegistry.addSvgIconLiteral(
            'deFlag', sanitizer.bypassSecurityTrustHtml(deFlag));
        this.iconRegistry.addSvgIconLiteral(
            'enFlag', sanitizer.bypassSecurityTrustHtml(enFlag));
        if (this.locale === 'de') {
            this.selectedFlag = 'de';
        } else if (this.locale === 'en') {
            this.selectedFlag = 'en';
        }
    }

    public toggleTheme(): void {
        this.isLightThemeActive = !this.isLightThemeActive;
        if (this.isLightThemeActive) {
            this.themeService.setTheme(Theme.Light);
        } else {
            this.themeService.setTheme(Theme.Dark);
        }
    }

    public changeToGerman(): void {
        this.changeLanguage('de');
    }

    public changeToEnglish(): void {
        this.changeLanguage('en');
    }

    private changeLanguage(language: string): void {
        window.location.href = `${window.location.origin}/${language}/${this.router.url}`;
    }
}
