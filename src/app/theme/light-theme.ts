import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const lightTheme: IThemeOptions = {
    name: Theme.Light,
    customProperties: {
        [AvailableProperties.Background]: '#fefefe',
        [AvailableProperties.FontColor]: '#24292e',
        [AvailableProperties.SecondaryFontColor]: '#666666',
        [AvailableProperties.NavigationColor]: '#ffffff',
        [AvailableProperties.BorderColor]: '#009688',
        [AvailableProperties.InputHoverBorderColor]: '#24292e',
    }
};
