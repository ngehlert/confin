import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const darkTheme: IThemeOptions = {
    name: Theme.Dark,
    customProperties: {
        [AvailableProperties.Background]: '#263238',
        [AvailableProperties.FontColor]: '#c9d1c9',
        [AvailableProperties.SecondaryFontColor]: '#8e988e',
        [AvailableProperties.NavigationColor]: '#ffffff',
        [AvailableProperties.BorderColor]: '#009688',
        [AvailableProperties.InputHoverBorderColor]: '#c9d1c9',
    }
};
