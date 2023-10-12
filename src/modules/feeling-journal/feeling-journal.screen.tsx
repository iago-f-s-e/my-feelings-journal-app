import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useWeekStore} from '@core/store/use-week-store';
import {theme} from '@shared/styles';
import {SelfCareActivitieContainer} from '@modules/self-care-activitie/containers';
import {CheckInContainer, HeaderContainer} from './containers';

export const FeelingJournalScreen = () => {
  const updateCurrentWeek = useWeekStore(state => state.updateCurrentWeek);

  useEffect(() => {
    updateCurrentWeek();
  }, [updateCurrentWeek]);

  return (
    <View style={styles.container}>
      <HeaderContainer />
      <CheckInContainer />
      <SelfCareActivitieContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: theme.spaces.l,
  },
});
