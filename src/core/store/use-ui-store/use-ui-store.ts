import {create} from 'zustand';
import {
  SelfCareActivitie,
  useSelfCareStore,
} from '@core/store/use-self-care-store/use-self-care-store';
import {
  HappeningDiaryEvent,
  useHappeningDiaryStore,
} from '@core/store/user-happening-diary-store';
import {useWeekStore} from '@core/store/use-week-store';

type UseUIStore = {
  selfCare: SelfCareActivitie;
  selfCareModalVisible: boolean;
  openSelfCareModal: (selfCare: SelfCareActivitie) => void;
  closeSelfCareModal: () => void;

  createSelfCareModalVisible: boolean;
  openCreateSelfCareModal: () => void;
  closeCreateSelfCareModal: () => void;

  happeningDiary: HappeningDiaryEvent;
  createHappingDiaryModalVisible: boolean;
  openCreateHappingDiaryModal: (happeningDiary?: HappeningDiaryEvent) => void;
  closeCreateHappingDiaryModal: () => void;

  updateStores: () => void;
};

export const useUIStore = create<UseUIStore>(set => ({
  selfCare: {} as SelfCareActivitie,
  happeningDiary: {} as HappeningDiaryEvent,
  selfCareModalVisible: false,
  closeSelfCareModal: () =>
    set(state => ({...state, selfCareModalVisible: false})),
  openSelfCareModal: (selfCare: SelfCareActivitie) =>
    set(state => ({...state, selfCareModalVisible: true, selfCare})),

  createSelfCareModalVisible: false,
  closeCreateSelfCareModal: () =>
    set(state => ({...state, createSelfCareModalVisible: false})),
  openCreateSelfCareModal: () =>
    set(state => ({...state, createSelfCareModalVisible: true})),

  createHappingDiaryModalVisible: false,
  closeCreateHappingDiaryModal: () =>
    set(state => ({
      ...state,
      createHappingDiaryModalVisible: false,
      happeningDiary: {} as HappeningDiaryEvent,
    })),
  openCreateHappingDiaryModal: happeningDiary =>
    set(state => ({
      ...state,
      createHappingDiaryModalVisible: true,
      happeningDiary: happeningDiary || ({} as HappeningDiaryEvent),
    })),

  updateStores: () => {
    useWeekStore.getState().updateCurrentWeek();
    useSelfCareStore.getState().updateCurrentWeek();
    useHappeningDiaryStore.getState().updateCurrentWeek();
  },
}));
