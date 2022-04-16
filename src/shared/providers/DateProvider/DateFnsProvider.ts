import {
  parseISO,
  startOfDay,
  endOfDay,
  startOfHour,
  endOfHour,
  isWithinInterval,
} from 'date-fns';
import { IDateProvider } from './IDateProvider';

export class DateFnsProvider implements IDateProvider {
  parseISO(unformattedDate: string): Date {
    return parseISO(unformattedDate);
  }
  startOfDay(date: Date): Date {
    return startOfDay(date);
  }
  endOfDay(date: Date): Date {
    return endOfDay(date);
  }
  startOfHour(date: Date): Date {
    return startOfHour(date);
  }
  endOfHour(date: Date): Date {
    return endOfHour(date);
  }
  isWithinInterval(
    date: Date,
    { start, end }: { start: Date; end: Date },
  ): boolean {
    return isWithinInterval(date, { start, end });
  }
}
