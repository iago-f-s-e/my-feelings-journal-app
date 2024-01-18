import React, {useMemo} from 'react';
import {
  EmptyHappeningDiary,
  HappeningDiarySheep,
} from '@modules/happening-diary/component';
import {FlatList, StyleSheet} from 'react-native';
import {FeelingType} from '@shared/types';
import {theme} from '@shared/styles';
import {todayKey} from '@core/time-handling';
import {useUIStore} from '@core/store/use-ui-store';
import {useHappeningDiaryStore} from '@core/store/user-happening-diary-store';

export const HappeningDiaryListContainer = () => {
  const openCreateModal = useUIStore(
    state => state.openCreateHappingDiaryModal,
  );
  const happeningDiaryState = useHappeningDiaryStore(
    state => state.happeningDiary,
  );

  const happeningDiaryByDay = useMemo(() => {
    return happeningDiaryState[todayKey] || {};
  }, [happeningDiaryState]);

  return happeningDiaryByDay.ids?.length ? (
    <FlatList
      contentContainerStyle={styles.flatListContent}
      data={happeningDiaryByDay.ids}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <HappeningDiarySheep
          title={happeningDiaryByDay.entities[item].title}
          description={happeningDiaryByDay.entities[item].description}
          feelingType={
            happeningDiaryByDay.entities[item].feelingType as FeelingType
          }
        />
      )}
      keyExtractor={item => item}
    />
  ) : (
    <EmptyHappeningDiary onCreateActivity={openCreateModal} />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    gap: theme.spaces.xll,
  },
});
