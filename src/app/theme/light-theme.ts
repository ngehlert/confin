import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const lightTheme: IThemeOptions = {
    name: Theme.Light,
    customProperties: {
        [AvailableProperties.Background]: '#fefefe',
        [AvailableProperties.Color]: '#fefefe',
    }
};
