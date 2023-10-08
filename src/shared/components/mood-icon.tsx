import React from 'react';
import {FeelingType, IconSize} from '@shared/types';
import {
  BadIcon,
  GoodIcon,
  NormalIcon,
  VeryBadIcon,
  VeryGoodIcon,
} from '@shared/icons';

type MoodIconProp = {
  type: FeelingType;
  size?: IconSize;
};

export const MoodIcon = ({type, size}: MoodIconProp) => {
  switch (type) {
    case 'VERY_GOOD':
      return <VeryGoodIcon size={size} />;

    case 'GOOD':
      return <GoodIcon size={size} />;

    case 'NORMAL':
      return <NormalIcon size={size} />;

    case 'BAD':
      return <BadIcon size={size} />;

    case 'VERY_BAD':
      return <VeryBadIcon size={size} />;

    default:
      return null;
  }
};
