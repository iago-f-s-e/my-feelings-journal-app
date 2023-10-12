import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

import {VeryBadOutline} from '@shared/icons';
import {theme} from '@shared/styles';

type EmptySelfCareProp = {
  onCreateActivity: () => void;
};

export const EmptySelfCare = ({onCreateActivity}: EmptySelfCareProp) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.content} onPress={onCreateActivity}>
        <Text style={styles.title}>Não temos nada pra hoje</Text>
        <VeryBadOutline />
        <Text style={styles.label}>Que tal fazermos algo?</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    borderColor: theme.colors.grey,
    borderRadius: theme.spaces.xl,
    borderWidth: 2,
    gap: theme.spaces.l,
    height: theme.vp(150),
    justifyContent: 'center',
    width: theme.vp(200),
  },
  label: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.semiBold,
  },
  title: {
    color: theme.colors.grey,
    fontSize: theme.typography.size.small,
    fontWeight: theme.typography.weight.semiBold,
  },
});
