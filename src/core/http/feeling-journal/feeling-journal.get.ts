import {httpGET} from '@core/http/http-client';
import {GetCurrentWeekResponse} from '@shared/types';

export function getFeelingJournalCurrentWeekQuery(start: string, end: string) {
  return httpGET<GetCurrentWeekResponse>(
    `feeling-journal/week?start=${start}&end=${end}`,
  );
}
