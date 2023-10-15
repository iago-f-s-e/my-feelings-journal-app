import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {useWeekStore} from '@core/store/use-week-store';
import {theme} from '@shared/styles';
import {SelfCareActivitieContainer} from '@modules/self-care-activitie/containers';
import {HappeningDiaryContainer} from '@modules/happening-diary/containers';
import {CheckInContainer, HeaderContainer} from './containers';

export const FeelingJournalScreen = () => {
  const updateCurrentWeek = useWeekStore(state => state.updateCurrentWeek);

  useEffect(() => {
    updateCurrentWeek();
  }, [updateCurrentWeek]);

  return (
    <ScrollView style={styles.container}>
      <HeaderContainer />
      <CheckInContainer />
      <SelfCareActivitieContainer />
      <View style={styles.footer}>
        <HappeningDiaryContainer />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spaces.l,
    paddingBottom: theme.spaces.l,
  },
  footer: {
    paddingBottom: theme.spaces.l,
  },
});
