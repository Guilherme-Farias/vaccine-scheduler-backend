export interface IDateProvider {
  startOfDay(date: Date): Date;
  endOfDay(date: Date): Date;
  startOfHour(date: Date): Date;
  endOfHour(date: Date): Date;
  isWithinInterval(
    date: Date,
    { start, end }: { start: Date; end: Date },
  ): boolean;
}
