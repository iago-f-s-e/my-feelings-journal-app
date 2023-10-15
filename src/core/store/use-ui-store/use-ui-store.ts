import {create} from 'zustand';

type UseUIStore = {
  selfCareModalVisible: boolean;
  openSelfCareModal: () => void;
  closeSelfCareModal: () => void;

  happingDiaryModalVisible: boolean;
  openHappingDiaryModal: () => void;
  closeHappingDiaryModal: () => void;
};

export const useUIStore = create<UseUIStore>(set => ({
  selfCareModalVisible: false,
  closeSelfCareModal: () =>
    set(state => ({...state, selfCareModalVisible: false})),
  openSelfCareModal: () =>
    set(state => ({...state, selfCareModalVisible: true})),

  happingDiaryModalVisible: false,
  closeHappingDiaryModal: () =>
    set(state => ({...state, happingDiaryModalVisible: false})),
  openHappingDiaryModal: () =>
    set(state => ({...state, happingDiaryModalVisible: true})),
}));
