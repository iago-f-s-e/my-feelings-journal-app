import {FeelingType} from '@shared/types';

import {timeHandlingWithLocale} from '@core/time-handling';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type HappeningDiaryEvent = {
  id: number;
  title: string;
  description: string;
  feelingType: FeelingType;
};

type HappeningDiaryEvents = {
  ids: string[];
  entities: Record<string, HappeningDiaryEvent>;
};

export type HappeningDiary = Record<string, HappeningDiaryEvents>;

type UseHappeningDiaryStore = {
  keys: string[];
  happeningDiary: HappeningDiary;
  createHappeningDiary: (
    date: string,
    title: string,
    description: string,
    feelingType: FeelingType,
  ) => void;
  updateHappeningDiary: (
    date: string,
    id: string,
    title: string,
    description: string,
    feelingType: FeelingType,
  ) => void;
  createHappeningDiaryBySelfCare: (
    date: string,
    title: string,
  ) => HappeningDiaryEvent;
  updateCurrentWeek: () => void;
};

function getFeelingTypeOrder(feelingType: FeelingType): number {
  const feelingTypes: Record<FeelingType, number> = {
    VERY_GOOD: 1,
    GOOD: 2,
    NORMAL: 3,
    BAD: 4,
    VERY_BAD: 5,
  };

  return feelingTypes[feelingType] || 6;
}

const weekIndices = Array(7)
  .fill(0)
  .map((_, index) => index);

const initialHappeningDiary = weekIndices.reduce<HappeningDiary>(
  (curr, dayIndex) => {
    const storeKey = timeHandlingWithLocale.day(dayIndex).format('YYYY-MM-DD');

    // eslint-disable-next-line no-param-reassign
    curr[storeKey] = {
      ids: [],
      entities: {},
    };

    return curr;
  },
  {},
);

const initialKeys = Object.keys(initialHappeningDiary);

export const useHappeningDiaryStore = create(
  persist<UseHappeningDiaryStore>(
    (set, get) => ({
      keys: initialKeys,
      happeningDiary: initialHappeningDiary,
      createHappeningDiary: (date, title, description, feelingType) => {
        set(state => {
          const ids = state.happeningDiary[date].ids || [];
          const newId = ids.length + 1;

          const entitiesState = state.happeningDiary[date].entities;
          entitiesState[newId] = {
            id: newId,
            title,
            description,
            feelingType,
          };

          const sortedIds = [...(ids || []), newId.toString()].sort(
            (prev, next) =>
              getFeelingTypeOrder(entitiesState[prev].feelingType) -
              getFeelingTypeOrder(entitiesState[next].feelingType),
          );

          return {
            happeningDiary: {
              ...state.happeningDiary,
              [date]: {
                ids: sortedIds,
                entities: entitiesState,
              },
            },
          };
        });
      },

      updateHappeningDiary: (date, id, title, description, feelingType) => {
        set(state => {
          const entitiesState = state.happeningDiary[date].entities;
          entitiesState[id] = {
            ...(entitiesState[id] || {}),
            title,
            description,
            feelingType,
          };

          const sortedIds = state.happeningDiary[date].ids.sort(
            (prev, next) =>
              getFeelingTypeOrder(entitiesState[prev].feelingType) -
              getFeelingTypeOrder(entitiesState[next].feelingType),
          );

          return {
            happeningDiary: {
              ...state.happeningDiary,
              [date]: {
                ids: sortedIds,
                entities: entitiesState,
              },
            },
          };
        });
      },

      createHappeningDiaryBySelfCare: (date, title) => {
        const ids = get().happeningDiary[date].ids || [];
        const newId = ids.length + 1;

        const happeningDiaryEvent = {
          id: newId,
          title,
        } as HappeningDiaryEvent;

        set(state => {
          const entitiesState = state.happeningDiary[date].entities;
          entitiesState[newId] = happeningDiaryEvent;
          return {
            happeningDiary: {
              ...state.happeningDiary,
              [date]: {
                ids: [...(ids || []), newId.toString()],
                entities: entitiesState,
              },
            },
          };
        });

        return happeningDiaryEvent;
      },

      updateCurrentWeek: () => {
        set(() => ({
          keys: initialKeys,
          happeningDiary: initialHappeningDiary,
        }));
      },
    }),
    {
      name: 'happening-diary-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
