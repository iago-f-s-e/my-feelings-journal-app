import {create} from 'zustand';

type UseUIStore = {
  selfCareModalVisible: boolean;
  openSelfCareModal: () => void;
  closeSelfCareModal: () => void;
};

export const useUIStore = create<UseUIStore>(set => ({
  selfCareModalVisible: false,
  closeSelfCareModal: () =>
    set(state => ({...state, selfCareModalVisible: false})),
  openSelfCareModal: () =>
    set(state => ({...state, selfCareModalVisible: true})),
}));
