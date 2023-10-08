import 'dayjs/locale/pt-br';
import weekday from 'dayjs/plugin/weekday';
import dayjs from 'dayjs';

dayjs.extend(weekday);

export const timeHandling = dayjs;

export const timeHandlingWithLocale = dayjs().locale('pt-br');

export const today = timeHandlingWithLocale.format('DD MMM');
export const todayISO = timeHandlingWithLocale.toISOString();
export const todayKey = timeHandlingWithLocale.format('YYYY-MM-DD');

export const todayIndex = timeHandlingWithLocale.day();
