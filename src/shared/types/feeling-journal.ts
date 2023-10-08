import {FeelingType} from '@shared/types/feeling-type';

export type CreateFeelingJournalRequest = {
  date: string;
  howWasToday: FeelingType;
  description?: string;
};

export type CreateFeelingJournalResponse = {
  id: number;
  date: string;
  howWasToday: FeelingType;
  description?: string;
};
