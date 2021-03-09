import { Component } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Theme } from './theme/Theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent {
    public isLightThemeActive: boolean = true;

    constructor(private themeService: ThemeService) {}

    public toggleTheme(): void {
        this.isLightThemeActive = !this.isLightThemeActive;
        if (this.isLightThemeActive) {
            this.themeService.setTheme(Theme.Light);
        } else {
            this.themeService.setTheme(Theme.Dark);
        }
    }
}
