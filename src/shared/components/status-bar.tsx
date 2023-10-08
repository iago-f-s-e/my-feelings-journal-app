import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {View, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';

export const StatusBar = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    height: getStatusBarHeight(),
    width: '100%',
  },
});
