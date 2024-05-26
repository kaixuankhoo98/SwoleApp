import { SimplePaletteColorOptions } from '@mui/material';
import colors from './colors';

export const getColorObject = (color: string): SimplePaletteColorOptions => ({
  light: color,
  main: color,
  dark: color,
  contrastText: colors.white,
});

export default getColorObject;