import React from 'react';
import {View, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {todayKey} from '@core/time-handling/time-handling';
import {useUIStore} from '@core/store/use-ui-store';
import {SelfCareModal} from '@modules/self-care-activitie/components/self-care-modal.component';
import {useSelfCareStore} from '@core/store/use-self-care-store';
import {useHappeningDiaryStore} from '@core/store/user-happening-diary-store';
import {SelfCareActivitieListContainer} from './self-care-activities-list.container';
import {SelfCareActivitieHeaderContainer} from './self-care-activitie-header.container';
import {CreateSelfCareModal} from '../components';

export const SelfCareActivitieContainer = () => {
  const selfCareVisible = useUIStore(state => state.selfCareModalVisible);
  const closeSelfCareModal = useUIStore(state => state.closeSelfCareModal);
  const openCreateHappingDiaryModal = useUIStore(
    state => state.openCreateHappingDiaryModal,
  );
  const createSelfCareVisible = useUIStore(
    state => state.createSelfCareModalVisible,
  );
  const closeCreateSelfCareModal = useUIStore(
    state => state.closeCreateSelfCareModal,
  );
  const createSelfCare = useSelfCareStore(state => state.createSelfCare);
  const createHappeningDiaryBySelfCare = useHappeningDiaryStore(
    state => state.createHappeningDiaryBySelfCare,
  );

  return (
    <View style={styles.container}>
      <CreateSelfCareModal
        visible={createSelfCareVisible}
        onClose={closeCreateSelfCareModal}
        onSave={description => {
          createSelfCare(todayKey, description);
          closeCreateSelfCareModal();
        }}
      />

      <SelfCareModal
        visible={selfCareVisible}
        onClose={closeSelfCareModal}
        onFinish={title => {
          const createdHappeningDiary = createHappeningDiaryBySelfCare(
            todayKey,
            title,
          );
          closeSelfCareModal();
          openCreateHappingDiaryModal(createdHappeningDiary);
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
