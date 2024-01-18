import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {timeHandlingWithLocale} from '@core/time-handling';
import {getRandomColor} from '@shared/utils';

export type SelfCareActivitie = {
  id: number;
  description: string;
  darkColor: string;
  normalColor: string;
  finished: boolean;
};

type SelfCareActivities = {
  ids: string[];
  entities: Record<string, SelfCareActivitie>;
};

export type SelfCare = Record<string, SelfCareActivities>;

type UseSelfCareStore = {
  keys: string[];
  selfCare: SelfCare;
  createSelfCare: (date: string, description: string) => void;
  updateSelfCare: (date: string, id: string, description: string) => void;
  deleteSelfCare: (date: string, id: string) => void;
  finishSelfCare: (date: string, id: string) => void;
  updateCurrentWeek: () => void;
};

const weekIndices = Array(7)
  .fill(0)
  .map((_, index) => index);

const initialSelfCare = weekIndices.reduce<SelfCare>((curr, dayIndex) => {
  const storeKey = timeHandlingWithLocale.day(dayIndex).format('YYYY-MM-DD');

  // eslint-disable-next-line no-param-reassign
  curr[storeKey] = {
    ids: [],
    entities: {},
  };

  return curr;
}, {});

const initialKeys = Object.keys(initialSelfCare);

export const useSelfCareStore = create(
  persist<UseSelfCareStore>(
    set => ({
      keys: initialKeys,
      selfCare: initialSelfCare,
      createSelfCare: (date: string, description: string) => {
        const color = getRandomColor();

        set(state => {
          const ids = state.selfCare[date]?.ids || [];
          const newId = ids.length + 1;

          return {
            selfCare: {
              ...state.selfCare,
              [date]: {
                ids: [...ids, newId.toString()],
                entities: {
                  ...(state.selfCare[date]?.entities || {}),
                  [newId]: {
                    id: newId,
                    darkColor: color.dark,
                    normalColor: color.normal,
                    finished: false,
                    description,
                  },
                },
              },
            },
          };
        });
      },

      updateSelfCare: (date, id, description) => {
        set(state => {
          const selfCare = state.selfCare[date].entities[id];

          return {
            selfCare: {
              ...state.selfCare,
              [date]: {
                ids: state.selfCare[date]?.ids,
                entities: {
                  ...(state.selfCare[date]?.entities || {}),
                  [id]: {
                    ...selfCare,
                    description,
                  },
                },
              },
            },
          };
        });
      },

      deleteSelfCare: (date, id) => {
        set(state => {
          const ids = state.selfCare[date].ids.filter(
            stateId => stateId !== id,
          );
          const {entities} = state.selfCare[date];
          delete entities[id];

          return {
            selfCare: {
              ...state.selfCare,
              [date]: {ids, entities},
            },
          };
        });
      },

      finishSelfCare: (date, id) => {
        set(state => {
          const selfCare = state.selfCare[date].entities[id];

          return {
            selfCare: {
              ...state.selfCare,
              [date]: {
                ids: state.selfCare[date]?.ids,
                entities: {
                  ...(state.selfCare[date]?.entities || {}),
                  [id]: {
                    ...selfCare,
                    finished: true,
                  },
                },
              },
            },
          };
        });
      },

      updateCurrentWeek: () => {
        set(() => {
          return {
            keys: initialKeys,
            selfCare: initialSelfCare,
          };
        });
      },
    }),
    {
      name: 'self-care-store',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
