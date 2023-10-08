import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';

import {today} from '@core/time-handling';
import {Week} from '@core/store/use-week-store/use-week-store';
import {FeelingJournalWeekDay} from './feeling-journal-week-day.component';

type FeelingJournalHeaderProps = {
  week: Week;
  weekKeys: string[];
};

export const FeelingJournalHeader = ({
  weekKeys,
  week,
}: FeelingJournalHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.todayContainer}>
        <Text style={styles.todayText}>{`Hoje, ${today}`}</Text>
      </View>
      <View style={styles.weekContainer}>
        {weekKeys.map(key => {
          const weekDay = week[key];
          return (
            <FeelingJournalWeekDay
              key={weekDay.dayIndex.toString()}
              day={weekDay.day}
              date={weekDay.date}
              opacity={!weekDay.isToday && !weekDay.feelingType ? 0.5 : 1}
              feelingType={weekDay.feelingType}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: theme.vp(120),
    padding: theme.spaces.xl,
  },
  todayContainer: {
    flexDirection: 'row',
  },
  todayText: {
    color: theme.colors.darkGrey,
    fontSize: theme.typography.size.small,
    fontWeight: theme.typography.weight.medium,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spaces.xl,
    paddingTop: theme.spaces.xl,
  },
});
