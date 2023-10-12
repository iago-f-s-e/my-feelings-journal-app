import {useState} from 'react';

export const useSelfCareModal = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  return {visible, openModal, closeModal};
};

export type State = {
  visible: boolean;
};

type Actions = 'openModal' | 'closeModal';

type Action = {
  type: Actions;
};

type Reducer = (action: Action) => State;

const reducers: {[key in Actions]: Reducer} = {
  closeModal: (): State => ({visible: false}),
  openModal: (): State => ({visible: true}),
};

export const useSelfCareModalReducer: Reducer = action =>
  reducers[action.type](action);
