import { Injectable, EventEmitter } from '@angular/core';
import { lightTheme } from './light-theme';
import { darkTheme } from './dark-theme';
import { IThemeOptions, Theme } from './Theme';

@Injectable()
export class ThemeService {
    public themeChange: EventEmitter<IThemeOptions> = new EventEmitter<IThemeOptions>();

    private themes: Array<IThemeOptions> = [lightTheme, darkTheme];
    private activeTheme: Theme = Theme.Light;

    public getActiveTheme(): IThemeOptions {
        const theme: IThemeOptions | undefined = this.themes.find((option: IThemeOptions) => option.name === this.activeTheme);
        if (!theme) {
            throw new Error(`Theme not found: '${this.activeTheme}'`);
        }

        return theme;
    }

    public setTheme(name: Theme): void {
        this.activeTheme = name;
        this.themeChange.emit( this.getActiveTheme());
    }

}
