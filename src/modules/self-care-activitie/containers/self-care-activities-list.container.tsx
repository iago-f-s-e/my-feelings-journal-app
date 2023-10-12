import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {theme} from '@shared/styles';
import {useWeekStore} from '@core/store/use-week-store';
import {todayKey} from '@core/time-handling/time-handling';
import {useUIStore} from '@core/store/use-ui-store';
import {EmptySelfCare, SelfCarePostIt} from '../components';

export const SelfCareActivitieListContainer = () => {
  const openModal = useUIStore(state => state.openSelfCareModal);
  const selfCareByDay = useWeekStore(state => state.selfCare);

  return selfCareByDay[todayKey]?.length ? (
    <FlatList
      data={selfCareByDay[todayKey]}
      renderItem={({item}) => (
        <SelfCarePostIt
          description={item.description}
          darkColor={item.darkColor}
          normalColor={item.normalColor}
        />
      )}
      keyExtractor={item => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={() => <EmptySelfCare onCreateActivity={openModal} />}
    />
  ) : (
    <EmptySelfCare onCreateActivity={openModal} />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: '100%',
    width: theme.spaces.l,
  },
});
