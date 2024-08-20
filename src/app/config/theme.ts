import { createTheme, ThemeProvider } from '@fluentui/react';

export const theme = createTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#f3f9fd',
    themeLighter: '#d0e7f8',
    themeLight: '#a9d3f2',
    themeTertiary: '#5ca9e5',
    themeSecondary: '#1a86d9',
    themeDarkAlt: '#006cbe',
    themeDark: '#005ba1',
    themeDarker: '#004377',
    neutralLighterAlt: '#fafafa',
    neutralLighter: '#f3f3f3',
    neutralLight: '#ededed',
    neutralQuaternaryAlt: '#e1e1e1',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#a6a6a6',
    neutralSecondary: '#666666',
    neutralPrimaryAlt: '#3c3c3c',
    neutralPrimary: '#333333',
    neutralDark: '#212121',
    black: '#1a1a1a',
    white: '#ffffff',
    // colorNeutralBackground1:'#ffffff'
  },
  fonts: {
    small: {
      fontSize: '10px',
    },
    medium: {
      fontSize: '14px',
    },
    large: {
      fontSize: '18px',
    },
  },
});
