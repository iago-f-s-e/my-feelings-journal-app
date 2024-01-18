import React from 'react';

import {ContainerHeader} from '@shared/components';
import {useUIStore} from '@core/store/use-ui-store';

export const HappeningDiaryHeaderContainer = () => {
  const openModal = useUIStore(state => state.openCreateHappingDiaryModal);

  return (
    <ContainerHeader
      title="Acontecimentos de hoje"
      subtitle="Aconteceu algo novo?"
      onPress={openModal}
    />
  );
};
