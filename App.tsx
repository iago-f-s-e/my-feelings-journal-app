import React from 'react';
import {MainNavigation} from '@core/navigation';
import {StatusBar} from '@shared/components';
import {SafeAreaView, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <MainNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});
