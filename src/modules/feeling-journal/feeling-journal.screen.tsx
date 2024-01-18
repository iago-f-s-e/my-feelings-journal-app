import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {theme} from '@shared/styles';
import {SelfCareActivitieContainer} from '@modules/self-care-activitie/containers';
import {HappeningDiaryContainer} from '@modules/happening-diary/containers';
import {useUIStore} from '@core/store/use-ui-store';
import {CheckInContainer, HeaderContainer} from './containers';

export const FeelingJournalScreen = () => {
  const updateStores = useUIStore(state => state.updateStores);

  useEffect(() => {
    updateStores();
  }, [updateStores]);

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
