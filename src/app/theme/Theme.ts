export enum AvailableProperties {
    Background = '--background',
    FontColor = '--font-color',
    SecondaryFontColor = '--secondary-font-color',
    NavigationColor = '--navigation-color',
    BorderColor = '--border-color',
    InputHoverBorderColor = '--input-hover-border-color',
    HomeImage = '--home-image',
    HomeShadow = '--home-shadow',
    HomeTextColor = '--home-text-color',
    HomeTextColorShadow = '--home-text-color-shadow',
    ElevationLight = '--elevation-light',
    ElevationHeavy = '--elevation-heavy',
    RippleColor = '--ripple-color',
}

export enum Theme {
    Light = 'Light',
    Dark = 'Dark',
}

export interface IThemeOptions {
    name: Theme;
    customProperties: Record<AvailableProperties, string>;
    tableTheme: string;
}
