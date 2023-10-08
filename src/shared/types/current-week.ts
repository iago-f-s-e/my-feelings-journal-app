import {FeelingType} from '@shared/types/feeling-type';

export type GetCurrentWeekResponse = Array<{
  date: string;
  description?: string;
  howWasToday: FeelingType;
}>;
