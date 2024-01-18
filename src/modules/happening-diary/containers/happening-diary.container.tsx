import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {CreateHappeningDiaryModal} from '@modules/happening-diary/component';
import {useUIStore} from '@core/store/use-ui-store';
import {todayKey} from '@core/time-handling';
import {useHappeningDiaryStore} from '@core/store/user-happening-diary-store';
import {HappeningDiaryListContainer} from './happening-diary-list.container';
import {HappeningDiaryHeaderContainer} from './happening-diary-header.container';

export const HappeningDiaryContainer = () => {
  const createVisible = useUIStore(
    state => state.createHappingDiaryModalVisible,
  );
  const closeCreateModal = useUIStore(
    state => state.closeCreateHappingDiaryModal,
  );
  const createHappeningDiary = useHappeningDiaryStore(
    state => state.createHappeningDiary,
  );
  const updateHappeningDiary = useHappeningDiaryStore(
    state => state.updateHappeningDiary,
  );

  return (
    <View style={styles.container}>
      <CreateHappeningDiaryModal
        onClose={closeCreateModal}
        visible={createVisible}
        onSave={(title, description, fellingType, id) => {
          if (id !== undefined) {
            // if create by selfcare
            updateHappeningDiary(todayKey, id, title, description, fellingType);
          } else {
            createHappeningDiary(todayKey, title, description, fellingType);
          }
          closeCreateModal();
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
