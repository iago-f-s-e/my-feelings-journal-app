import {theme} from '@shared/styles';

export function getRandomColor() {
  const colors = [
    {
      normal: theme.colors.veryGood,
      dark: theme.colors.veryGoodDark,
    },
    {
      normal: theme.colors.good,
      dark: theme.colors.goodDark,
    },
    {
      normal: theme.colors.normal,
      dark: theme.colors.normalDark,
    },
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
