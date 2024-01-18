import React from 'react';

import {useUIStore} from '@core/store/use-ui-store';
import {ContainerHeader} from '@shared/components';

export const SelfCareActivitieHeaderContainer = () => {
  const openModal = useUIStore(state => state.openCreateSelfCareModal);

  return (
    <ContainerHeader
      title="Autocuidado do dia"
      subtitle="O que vamos fazer hoje?"
      onPress={openModal}
    />
  );
};
