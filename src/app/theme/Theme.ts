export enum AvailableProperties {
    Background = '--background',
    FontColor = '--font-color',
    SecondaryFontColor = '--secondary-font-color',
    NavigationColor = '--navigation-color',
    BorderColor = '--border-color',
    InputHoverBorderColor = '--input-hover-border-color',
}

export enum Theme {
    Light = 'Light',
    Dark = 'Dark',
}

export interface IThemeOptions {
    name: Theme;
    customProperties: Record<AvailableProperties, string>;
}
