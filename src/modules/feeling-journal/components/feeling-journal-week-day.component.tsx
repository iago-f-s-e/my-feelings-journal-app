import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {theme} from '@shared/styles';
import {MoodIcon} from '@shared/components';
import {FeelingType} from '@shared/types';

type FeelingJournalWeekDayProps = {
  day: string;
  date: number;
  opacity: number;
  feelingType?: FeelingType;
};

export const FeelingJournalWeekDay = ({
  day,
  date,
  opacity,
  feelingType,
}: FeelingJournalWeekDayProps) => {
  return (
    <View style={{...styles.container, opacity}}>
      <Text style={styles.text}>{day}</Text>
      <Text style={styles.text}>{date}</Text>
      <View style={styles.mood}>
        <MoodIcon type={feelingType as FeelingType} size="small" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mood: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondaryBackground,
    borderRadius: theme.spaces.xll,
    height: theme.spaces.xll,
    justifyContent: 'center',
    marginTop: 4,
    width: theme.spaces.xll,
  },
  text: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.mini,
    fontWeight: theme.typography.weight.semiBold,
  },
});
