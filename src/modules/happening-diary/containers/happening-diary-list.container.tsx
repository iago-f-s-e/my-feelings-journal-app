import React from 'react';
import {
  EmptyHappeningDiary,
  HappeningDiarySheep,
} from '@modules/happening-diary/component';
import {FlatList, StyleSheet} from 'react-native';
import {FeelingType} from '@shared/types';
import {theme} from '@shared/styles';
import {useWeekStore} from '@core/store/use-week-store';
import {todayKey} from '@core/time-handling';
import {useUIStore} from '@core/store/use-ui-store';

export const HappeningDiaryListContainer = () => {
  const openModal = useUIStore(state => state.openHappingDiaryModal);
  const happeningDiaryByDay = useWeekStore(state => state.happeningDiary);

  return happeningDiaryByDay[todayKey]?.length ? (
    <FlatList
      contentContainerStyle={styles.flatListContent}
      data={happeningDiaryByDay[todayKey]}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <HappeningDiarySheep
          title={item.title}
          description={item.description}
          feelingType={item.feelingType as FeelingType}
        />
      )}
      keyExtractor={item => item.id.toString()}
    />
  ) : (
    <EmptyHappeningDiary onCreateActivity={openModal} />
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    gap: theme.spaces.xll,
  },
});
