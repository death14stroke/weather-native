import { ms } from 'react-native-size-matters';

const SCALE_FACTOR_FONTS = 0.2;
const SCALE_FACTOR_SPACING = 0.2;

export const fs = (fontSize: number) => ms(fontSize, SCALE_FACTOR_FONTS);

export const ds = (spacing: number) => ms(spacing, SCALE_FACTOR_SPACING);
