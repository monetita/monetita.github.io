import { createTheme } from '@mui/material/styles';

const COLOR1 = '#FCF9F6';
const COLOR2 = '#EC9A8D';
const COLOR3 = '#F3A933';
const COLOR4 = '#6C9289';
const COLOR5 = '#C53650';
const COLOR6 = '#972E2E';

declare module '@mui/material/styles' {
  interface Palette {
    color1: Palette['primary'];
    color2: Palette['primary'];
    color3: Palette['primary'];
    color4: Palette['primary'];
    color5: Palette['primary'];
    color6: Palette['primary'];
  }

  interface PaletteOptions {
    color1?: PaletteOptions['primary'];
    color2?: PaletteOptions['primary'];
    color3?: PaletteOptions['primary'];
    color4?: PaletteOptions['primary'];
    color5?: PaletteOptions['primary'];
    color6?: PaletteOptions['primary'];
  }
}


const Theme1 = createTheme({
  palette: {
    color1: {
      main: COLOR1,
      contrastText: COLOR6,
    },
    color2: {
      main: COLOR2,
      contrastText: "black",
    },
    color3: {
      main: COLOR3,
      contrastText: "black",
    },
    color4: {
      main: COLOR4,
      contrastText: "black",
    },
    color5: {
      main: COLOR5,
      contrastText: "black",
    },
    color6: {
      main: COLOR6,
      contrastText: COLOR1,
    },
    mode: 'light',
    primary: {
      main: COLOR1,
      contrastText: COLOR5,
    },
    secondary: {
      main: COLOR3,
      contrastText: COLOR6,
      light: COLOR1,
      dark: COLOR5,
    },
    background: {
      paper: COLOR1,
    },
    text: {
      primary: COLOR6,
      secondary: COLOR4,
    },
    error: {
      main: COLOR5,
    },
    warning: {
      main: COLOR3,
    },
    info: {
      main: COLOR4,
    },
    success: {
      main: '#526655',
    },
    divider: COLOR2,
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Montserrat, sans-serif',

  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Montserrat';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  }
});

Theme1.typography.h1 = {
  color: COLOR6,
    fontWeight: "bold",
  fontSize: '2.4rem',
  '@media (min-width:600px)': {
    fontSize: '3rem',
  },
  [Theme1.breakpoints.up('md')]: {
    fontSize: '4.8rem',
  },
};

Theme1.typography.h2 = {
  color: COLOR6,
  fontWeight: "normal",
  fontSize: '1.8rem',
  '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  [Theme1.breakpoints.up('md')]: {
    fontSize: '3.4rem',
  },
};

Theme1.typography.body1 = {
    fontFamily: Theme1.typography.fontFamily,
    fontSize: '0.5rem',
    '@media (min-width:600px)': {
        fontSize: '1.2rem',
    },
    [Theme1.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};

Theme1.typography.body2 = {
  fontFamily: Theme1.typography.fontFamily,
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
      fontSize: '1.2rem',
  },
  [Theme1.breakpoints.up('md')]: {
      fontSize: '1.5rem',
  },
};

export default Theme1;