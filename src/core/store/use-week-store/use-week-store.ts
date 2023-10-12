import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FeelingType} from '@shared/types';
import {getFeelingJournalCurrentWeekQuery} from '@core/http/feeling-journal';
import {timeHandlingWithLocale} from '@core/time-handling';
import {todayIndex} from '@core/time-handling/time-handling';
import {getRandomColor} from '@shared/utils';

type WeekDay = {
  dayIndex: number;
  day: string;
  date: number;
  feelingType?: FeelingType;
};

type SelfCareActivitie = {
  id: number;
  description: string;
  darkColor: string;
  normalColor: string;
};

export type Week = Record<string, WeekDay>;
export type SelfCare = Record<string, SelfCareActivitie[]>;

type UseWeekStore = {
  loading: boolean;
  keys: string[];
  week: Week;
  selfCare: SelfCare;
  updateCurrentWeek: () => void;
  updateToday: (date: string, feelingType: FeelingType) => void;
  createSelfCare: (date: string, description: string) => void;
};

function getWeekDay(dayIndex: number, feelingType?: FeelingType): WeekDay {
  const dayEntity = timeHandlingWithLocale.day(dayIndex);

  return {
    dayIndex,
    day: dayEntity.format('ddd'),
    date: dayEntity.date(),
    feelingType,
  };
}

const weekIndices = Array(7)
  .fill(0)
  .map((_, index) => index);

const initialWeek = weekIndices.reduce<Week>((curr, dayIndex) => {
  const storeKey = timeHandlingWithLocale.day(dayIndex).format('YYYY-MM-DD');

  // eslint-disable-next-line no-param-reassign
  curr[storeKey] = getWeekDay(dayIndex);

  return curr;
}, {});

const initialSelfCare = weekIndices.reduce<SelfCare>((curr, dayIndex) => {
  const storeKey = timeHandlingWithLocale.day(dayIndex).format('YYYY-MM-DD');

  // eslint-disable-next-line no-param-reassign
  curr[storeKey] = [];

  return curr;
}, {});

const initialKeys = Object.keys(initialWeek);

export const useWeekStore = create(
  persist<UseWeekStore>(
    set => ({
      keys: initialKeys,
      week: initialWeek,
      selfCare: initialSelfCare,
      loading: false,
      createSelfCare: (date: string, description: string) => {
        const color = getRandomColor();

        set(state => ({
          selfCare: {
            ...state.selfCare,
            [date]: [
              ...(state.selfCare[date] || []),
              {
                id: (state.selfCare[date].length || 0) + 1,
                darkColor: color.dark,
                normalColor: color.normal,
                description,
              },
            ],
          },
        }));
      },
      updateToday: (date: string, feelingType: FeelingType) => {
        set(state => ({
          week: {
            ...state.week,
            [date]: getWeekDay(todayIndex, feelingType),
          },
        }));
      },
      updateCurrentWeek: () => {
        if (todayIndex !== 0) {
          return;
        }

        const endWeekIndex = 6;
        const start = timeHandlingWithLocale.day(0).format('YYYY-MM-DD');
        const end = timeHandlingWithLocale
          .day(endWeekIndex)
          .format('YYYY-MM-DD');

        set({loading: true});
        getFeelingJournalCurrentWeekQuery(start, end)
          .then(response => {
            const weekResponse = response.reduce<
              Record<string, {howWasToday: FeelingType}>
            >((curr, value) => {
              // eslint-disable-next-line no-param-reassign
              curr[value.date] = {
                howWasToday: value.howWasToday,
              };
              return curr;
            }, {});

            const week = weekIndices.reduce<Week>((curr, dayIndex) => {
              const storeKey = timeHandlingWithLocale
                .day(dayIndex)
                .format('YYYY-MM-DD');

              // eslint-disable-next-line no-param-reassign
              curr[storeKey] = getWeekDay(
                dayIndex,
                weekResponse[storeKey]?.howWasToday,
              );

              return curr;
            }, {});

            const keys = Object.keys(week);

            set({week, keys});
          })
          .catch(() => set(state => ({week: state.week, keys: state.keys})))
          .finally(() => set({loading: false}));
      },
    }),
    {
      name: 'week-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
