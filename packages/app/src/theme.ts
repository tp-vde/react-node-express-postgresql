import { createTheme } from '@mui/material/styles';
import { palettes } from './palettes';

// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
// });

export const lightTheme = createTheme({
  palette: palettes.light,
});

export const darkTheme = createTheme({
  palette: palettes.dark,
});
