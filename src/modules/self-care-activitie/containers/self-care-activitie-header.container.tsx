import React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {theme} from '@shared/styles';

import {useUIStore} from '@core/store/use-ui-store';

export const SelfCareActivitieHeaderContainer = () => {
  const openModal = useUIStore(state => state.openSelfCareModal);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autocuidado do dia</Text>
      <View style={styles.addContainer}>
        <Text style={styles.addTitle}>O que vamos fazer hoje?</Text>
        <Pressable onPress={openModal}>
          <Text style={styles.addButton}>Adicionar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.semiBold,
    textDecorationLine: 'underline',
  },
  addContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addTitle: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.verySmall,
    fontWeight: theme.typography.weight.semiBold,
  },
  container: {
    gap: theme.spaces.l,
    width: '100%',
  },
  title: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.medium,
    fontWeight: theme.typography.weight.semiBold,
    textAlign: 'center',
  },
});
