import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const IS_PORTRAIT = SCREEN_HEIGHT > SCREEN_WIDTH;

const realWidth = IS_PORTRAIT ? SCREEN_WIDTH : SCREEN_HEIGHT;
const baseWidth = IS_PORTRAIT ? BASE_WIDTH : BASE_HEIGHT;
const realHeight = SCREEN_HEIGHT - getStatusBarHeight();

const vp = (size: number): number => Math.round((size * realWidth) / baseWidth);

const colors = {
  grey: '#666666',
  darkGrey: '#333333',
  lightGrey: '#f5f5f5',
  background: '#F7F3EC',
  secondaryBackground: '#CCCCCC',
  lightWhite: '#FFFFFF',
  lightDark: '#00000040',
  veryBad: 'rgb(215, 177, 238)',
  veryBadLight: 'rgba(215, 177, 238, 0.25)',
  veryGood: 'rgb(186, 251, 192)',
  veryGoodDark: 'rgb(166, 231, 172)',
  veryGoodLight: 'rgba(186, 251, 192, 0.25)',
  normal: 'rgb(255, 221, 193)',
  normalDark: 'rgb(245, 211, 183)',
  normalLight: 'rgba(255, 221, 193, 0.25)',
  bad: 'rgb(192, 204, 238)',
  badLight: 'rgba(192, 204, 238, 0.25)',
  good: 'rgb(250, 247, 177)',
  goodDark: 'rgb(240, 237, 167)',
  goodLight: 'rgba(250, 247, 177, 0.25)',
};

const spaces = {
  x: vp(2), // Spartan
  xs: vp(4), // Teeny
  l: vp(8), // Compact
  xl: vp(16), // Cozy
  xll: vp(24),
  xxs: vp(32), // Comfortable
  xxl: vp(64), // Luxurious
};

const typography = {
  size: {
    mini: vp(12),
    verySmall: vp(14),
    small: vp(16),
    medium: vp(18),
    large: vp(22),
    extraLarge: vp(30),
  },
  weight: {
    extraLight: '300',
    light: '300',
    medium: '400',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  } as const,
};

export const theme = {
  colors,
  typography,
  spaces,
  vp,
  realHeight,
};
