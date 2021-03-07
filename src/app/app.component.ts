import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme/theme.service';
import { Theme } from './theme/Theme';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
    constructor(private themeService: ThemeService) {}

    public ngOnInit(): void {
        setTimeout(() => {
            this.themeService.setTheme(Theme.Dark);
        }, 4000);
    }
}
