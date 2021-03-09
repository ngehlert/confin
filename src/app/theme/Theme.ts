export enum AvailableProperties {
    Background = '--background',
    FontColor = '--font-color',
    NavigationColor = '--navigation-color'
}

export enum Theme {
    Light = 'Light',
    Dark = 'Dark',
}

export interface IThemeOptions {
    name: Theme;
    customProperties: Record<AvailableProperties, string>;
}
