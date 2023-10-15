import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {HappeningDiaryModal} from '@modules/happening-diary/component';
import {useUIStore} from '@core/store/use-ui-store';
import {useWeekStore} from '@core/store/use-week-store';
import {todayKey} from '@core/time-handling';
import {HappeningDiaryListContainer} from './happening-diary-list.container';
import {HappeningDiaryHeaderContainer} from './happening-diary-header.container';

export const HappeningDiaryContainer = () => {
  const visible = useUIStore(state => state.happingDiaryModalVisible);
  const closeModal = useUIStore(state => state.closeHappingDiaryModal);
  const createHappeningDiary = useWeekStore(
    state => state.createHappeningDiary,
  );

  return (
    <View style={styles.container}>
      <HappeningDiaryModal
        onClose={closeModal}
        visible={visible}
        onSave={(title, description, fellingType) => {
          createHappeningDiary(todayKey, title, description, fellingType);
          closeModal();
        }}
      />
      <HappeningDiaryHeaderContainer />
      <HappeningDiaryListContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: theme.spaces.l,
    paddingHorizontal: theme.spaces.l,
    width: '100%',
  },
});
