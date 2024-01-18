import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {todayKey} from '@core/time-handling/time-handling';
import {useUIStore} from '@core/store/use-ui-store';
import {useSelfCareStore} from '@core/store/use-self-care-store';
import {EmptySelfCare, SelfCarePostIt} from '../components';

export const SelfCareActivitieListContainer = () => {
  const openCreateModal = useUIStore(state => state.openCreateSelfCareModal);
  const openModal = useUIStore(state => state.openSelfCareModal);
  const selfCareByDay = useSelfCareStore(state => state.selfCare)[todayKey];

  return selfCareByDay?.ids?.length ? (
    <FlatList
      data={selfCareByDay.ids}
      renderItem={({item}) => (
        <SelfCarePostIt
          selfCare={selfCareByDay.entities[item]}
          onClick={selfCare => openModal(selfCare)}
        />
      )}
      keyExtractor={selfCareId => selfCareId}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  ) : (
    <EmptySelfCare onCreateActivity={openCreateModal} />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: '100%',
    width: theme.spaces.l,
  },
});
