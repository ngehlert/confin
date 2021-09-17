import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const darkTheme: IThemeOptions = {
    name: Theme.Dark,
    customProperties: {
        [AvailableProperties.Background]: '#1a202a',
        [AvailableProperties.FontColor]: '#c9d1c9',
        [AvailableProperties.SecondaryFontColor]: '#8e988e',
        [AvailableProperties.NavigationColor]: '#ffffff',
        [AvailableProperties.BorderColor]: '#009688',
        [AvailableProperties.InputHoverBorderColor]: '#c9d1c9',
        [AvailableProperties.HomeImage]: 'url("assets/home-dark.jpg")',
        [AvailableProperties.HomeShadow]: `linear-gradient(
            0deg,
            rgba(89, 89, 89, 0) 0%,
            rgba(86, 86, 86, 0.034375) 16.36%,
            rgba(81, 81, 81, 0.125) 33.34%,
            rgba(73, 73, 73, 0.253125) 50.1%,
            rgba(63, 63, 63, 0.4) 65.75%,
            rgba(51, 51, 51, 0.546875) 79.43%,
            rgba(35, 35, 35, 0.675) 90.28%,
            rgba(17, 17, 17, 0.765625) 97.43%,
            rgba(0, 0, 0, 0.8) 100%
        )`,
        [AvailableProperties.HomeTextColor]: '#fff',
        [AvailableProperties.HomeTextColorShadow]: '0 0 8px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.7), 0 0 8px rgba(0,0,0,0.7)',
    }
};
