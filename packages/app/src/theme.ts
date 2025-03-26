import { createTheme } from '@mui/material/styles';
import { palettes } from './palettes';


export const lightTheme = createTheme({
  palette: palettes.light,
});

export const darkTheme = createTheme({
  palette: palettes.dark,
});
