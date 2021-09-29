import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const lightTheme: IThemeOptions = {
    name: Theme.Light,
    tableTheme: 'ag-theme-alpine',
    customProperties: {
        [AvailableProperties.Background]: '#fefefe',
        [AvailableProperties.FontColor]: '#24292e',
        [AvailableProperties.SecondaryFontColor]: '#666666',
        [AvailableProperties.NavigationColor]: '#ffffff',
        [AvailableProperties.BorderColor]: '#009688',
        [AvailableProperties.InputHoverBorderColor]: '#24292e',
        [AvailableProperties.HomeImage]: 'url("assets/home-bright.jpg")',
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
        [AvailableProperties.ElevationLight]: '0 2px 4px -1px #00000029, 0 4px 5px #0000001d, 0 1px 10px #00000018',
        [AvailableProperties.ElevationHeavy]: '0 5px 5px -3px #00000029, 0 8px 10px 1px #0000001d, 0 3px 14px 2px #00000018',
        [AvailableProperties.RippleColor]: 'rgba(36, 41 ,46, 0.3)'
    }
};
