import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const darkTheme: IThemeOptions = {
    name: Theme.Dark,
    customProperties: {
        [AvailableProperties.Background]: '#263238',
        [AvailableProperties.FontColor]: '#c9d1c9',
        [AvailableProperties.NavigationColor]: '#ffffff',
    }
};
