import {NativeDateAdapter} from "@angular/material/core";
// @ts-ignore
import moment from 'moment';

export class GermanDateAdapter extends NativeDateAdapter{
  dateFormat = 'DD/MM/YYYY';

  format(date: Date): string {
    return moment(date).format(this.dateFormat);
  }

  parse(value: any): Date | null {
    if (!moment(value, this.dateFormat, true).isValid()) {
      return this.invalid();
    }
    return moment.utc(value, this.dateFormat, true).toDate();
  }

  createDate(year: number, month: number, date: number): Date {
    // Moment.js will create an invalid date if any of the components are out of bounds, but we
    // explicitly check each case so we can throw more descriptive errors.
    if (month < 0 || month > 11) {
      throw Error(`Invalid month index "${month}". Month index has to be between 0 and 11.`);
    }

    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }

    const result = moment.utc({ year, month, date }).locale(this.locale);

    // If the result isn't valid, the date must have been out of bounds for this month.
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }

    return result.toDate();
  }
}
