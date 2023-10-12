import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {theme} from '@shared/styles';
import {getRandomColor} from '@shared/utils';

type SelfCarePostItProp = {
  description: string;
  normalColor: string;
  darkColor: string;
};

export const SelfCarePostIt = ({
  description,
  normalColor,
  darkColor,
}: SelfCarePostItProp) => {
  return (
    <View style={{...styles.container, backgroundColor: normalColor}}>
      <View style={{...styles.bend, backgroundColor: darkColor}}>
        <View style={styles.bendOutside} />
      </View>
      <View style={styles.content}>
        <Text style={styles.description} numberOfLines={6}>
          {description}
        </Text>
      </View>
    </View>
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
  container: {
    borderRadius: theme.spaces.x,
    height: theme.vp(150),
    overflow: 'hidden',

    width: theme.vp(200),
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.vp(5),
  },
  description: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.semiBold,
    textAlign: 'justify',
  },
});
