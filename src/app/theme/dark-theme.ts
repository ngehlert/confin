import { AvailableProperties, IThemeOptions, Theme } from './Theme';

export const darkTheme: IThemeOptions = {
    name: Theme.Dark,
    customProperties: {
        [AvailableProperties.Background]: '#1f2128',
        [AvailableProperties.Color]: '#1f2128',
    }
};
