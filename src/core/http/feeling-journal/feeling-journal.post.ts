import {httpPOST} from '@core/http/http-client';
import {
  CreateFeelingJournalRequest,
  CreateFeelingJournalResponse,
} from '@shared/types';

export function createFeelingJournalMutation(
  data: CreateFeelingJournalRequest,
) {
  return httpPOST<CreateFeelingJournalRequest, CreateFeelingJournalResponse>(
    'feeling-journal',
    data,
  );
}
