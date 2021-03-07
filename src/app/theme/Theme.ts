export enum AvailableProperties {
    Background = '--background',
    Color = '--color',
}

export enum Theme {
    Light = 'Light',
    Dark = 'Dark',
}

export interface IThemeOptions {
    name: Theme;
    customProperties: Record<AvailableProperties, string>;
}
