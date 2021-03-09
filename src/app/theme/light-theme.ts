import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const lightTheme: IThemeOptions = {
    name: Theme.Light,
    customProperties: {
        [AvailableProperties.Background]: '#fefefe',
        [AvailableProperties.FontColor]: '#24292e',
        [AvailableProperties.NavigationColor]: '#ffffff',
    }
};
