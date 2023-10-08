import {FeelingJournalHeader} from '@modules/feeling-journal/components';
import React from 'react';
import {useWeekStore} from '@core/store/use-week-store';

export const HeaderContainer = () => {
  const week = useWeekStore(state => state.week);
  const weekKeys = useWeekStore(state => state.keys);

  return <FeelingJournalHeader week={week} weekKeys={weekKeys} />;
};
