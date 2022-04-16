import { throwError } from '@/tests/mocks';

import dateFns from 'date-fns';
import { faker } from '@faker-js/faker';

import { DateFnsProvider } from '@/shared/providers/DateProvider';

jest.mock('date-fns', () => ({
  startOfDay(): Date {
    return 'start_of_day' as unknown as Date;
  },
  endOfDay(): Date {
    return 'end_of_day' as unknown as Date;
  },
  startOfHour(): Date {
    return 'start_of_hour' as unknown as Date;
  },
  endOfHour(): Date {
    return 'end_of_hour' as unknown as Date;
  },
  isWithinInterval(): boolean {
    return true;
  },
}));

describe('DateFnsProvider', () => {
  let sut: DateFnsProvider;
  const date = faker.date.soon();

  beforeEach(() => {
    sut = new DateFnsProvider();
  });

  describe('startOfDay()', () => {
    it('should call startOfDay with correct values', () => {
      const startOfDaySpy = jest.spyOn(dateFns, 'startOfDay');
      sut.startOfDay(date);
      expect(startOfDaySpy).toHaveBeenCalledWith(date);
    });

    it('should return a start of day on success', async () => {
      const startOfDay = sut.startOfDay(date);
      expect(startOfDay).toBe('start_of_day');
    });

    it('should throw if startOfDay throws', async () => {
      jest.spyOn(dateFns, 'startOfDay').mockImplementationOnce(throwError);

      expect(() => sut.startOfDay(date)).toThrow();
    });
  });

  describe('endOfDay()', () => {
    it('should call endOfDay with correct values', () => {
      const endOfDaySpy = jest.spyOn(dateFns, 'endOfDay');
      sut.endOfDay(date);
      expect(endOfDaySpy).toHaveBeenCalledWith(date);
    });

    it('should return a end of day on success', async () => {
      const endOfDay = sut.endOfDay(date);
      expect(endOfDay).toBe('end_of_day');
    });

    it('should throw if endOfDay throws', async () => {
      jest.spyOn(dateFns, 'endOfDay').mockImplementationOnce(throwError);

      expect(() => sut.endOfDay(date)).toThrow();
    });
  });

  describe('startOfHour()', () => {
    it('should call startOfHour with correct values', () => {
      const startOfHourSpy = jest.spyOn(dateFns, 'startOfHour');
      sut.startOfHour(date);
      expect(startOfHourSpy).toHaveBeenCalledWith(date);
    });

    it('should return a start of hour on success', async () => {
      const startOfHour = sut.startOfHour(date);
      expect(startOfHour).toBe('start_of_hour');
    });

    it('should throw if startOfHour throws', async () => {
      jest.spyOn(dateFns, 'startOfHour').mockImplementationOnce(throwError);

      expect(() => sut.startOfHour(date)).toThrow();
    });
  });

  describe('endOfHour()', () => {
    it('should call endOfHour with correct values', () => {
      const endOfHourSpy = jest.spyOn(dateFns, 'endOfHour');
      sut.endOfHour(date);
      expect(endOfHourSpy).toHaveBeenCalledWith(date);
    });

    it('should return a end of hour on success', async () => {
      const endOfHour = sut.endOfHour(date);
      expect(endOfHour).toBe('end_of_hour');
    });

    it('should throw if endOfHour throws', async () => {
      jest.spyOn(dateFns, 'endOfHour').mockImplementationOnce(throwError);

      expect(() => sut.endOfHour(date)).toThrow();
    });
  });
  describe('isWithinInterval()', () => {
    const start_date = faker.date.past();
    const end_date = faker.date.future();

    it('should call isWithinInterval with correct values', () => {
      const isWithinIntervalSpy = jest.spyOn(dateFns, 'isWithinInterval');
      sut.isWithinInterval(date, {
        start: start_date,
        end: end_date,
      });
      expect(isWithinIntervalSpy).toHaveBeenCalledWith(date, {
        start: start_date,
        end: end_date,
      });
    });

    it('should return true if the provided date is within the success range', async () => {
      const isWithinInterval = sut.isWithinInterval(date, {
        start: start_date,
        end: end_date,
      });
      expect(isWithinInterval).toBe(true);
    });

    it('should throw if isWithinInterval throws', async () => {
      jest
        .spyOn(dateFns, 'isWithinInterval')
        .mockImplementationOnce(throwError);

      expect(() =>
        sut.isWithinInterval(date, {
          start: start_date,
          end: end_date,
        }),
      ).toThrow();
    });
  });
});
