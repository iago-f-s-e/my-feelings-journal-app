import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';

type PostItProp = {
  size: 'normal' | 'large';
  normalColor: string;
  darkColor: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export const PostIt = ({
  size,
  normalColor,
  darkColor,
  onClick,
  children,
}: PostItProp) => {
  const containerStyles =
    size === 'normal' ? styles.containerNormal : styles.containerLarge;

  return (
    <Pressable
      disabled={!onClick}
      onPress={() => onClick?.()}
      style={[containerStyles, {backgroundColor: normalColor}]}>
      <View style={[styles.bend, {backgroundColor: darkColor}]}>
        <View style={styles.bendOutside} />
      </View>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  bend: {
    alignItems: 'flex-end',
    borderBottomLeftRadius: theme.spaces.x,
    height: theme.vp(30),
    position: 'absolute',
    right: 0,
    top: 0,
    width: theme.vp(30),
  },
  bendOutside: {
    backgroundColor: theme.colors.background,
    height: theme.vp(40),
    right: theme.vp(-20),
    top: theme.vp(-20),
    transform: [{rotate: '45deg'}],
    width: theme.vp(40),
  },
  containerLarge: {
    borderRadius: theme.spaces.x,
    height: theme.vp(250),
    overflow: 'hidden',
    width: theme.vp(300),
  },
  containerNormal: {
    borderRadius: theme.spaces.x,
    height: theme.vp(150),
    overflow: 'hidden',
    width: theme.vp(200),
  },
});
