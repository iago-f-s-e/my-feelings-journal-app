import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {useWeekStore} from '@core/store/use-week-store';
import {todayKey} from '@core/time-handling/time-handling';
import {useUIStore} from '@core/store/use-ui-store';
import {SelfCareActivitieListContainer} from './self-care-activities-list.container';
import {SelfCareActivitieHeaderContainer} from './self-care-activitie-header.container';
import {SelfCareModal} from '../components';

export const SelfCareActivitieContainer = () => {
  const visible = useUIStore(state => state.selfCareModalVisible);
  const closeModal = useUIStore(state => state.closeSelfCareModal);
  const createSelfCare = useWeekStore(state => state.createSelfCare);

  return (
    <View style={styles.container}>
      <SelfCareModal
        visible={visible}
        onClose={closeModal}
        onSave={description => {
          createSelfCare(todayKey, description);
          closeModal();
        }}
      />
      <SelfCareActivitieHeaderContainer />
      <SelfCareActivitieListContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spaces.l,
    height: theme.vp(250),
    paddingHorizontal: theme.spaces.l,
    width: '100%',
  },
});
