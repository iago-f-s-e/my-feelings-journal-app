import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';

type ContainerHeaderProps = {
  title: string;
  subtitle: string;
  onPress: () => void;
};

export const ContainerHeader = ({
  subtitle,
  title,
  onPress,
}: ContainerHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.addContainer}>
        <Text style={styles.addTitle}>{subtitle}</Text>
        <Pressable onPress={onPress}>
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
