import { format, parse } from 'date-fns';
import { z } from 'zod';

export const dateToDateOnly = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const dateStringToDate = (date: string) => {
  return parse(date, "yyyy-MM-dd", new Date());
}

export const dateToTimeOnly = (date: Date) => {
  return format(date, "HH:mm:ss");
}


// zod objects
export const dateOnly = z.preprocess((value) => {
  if (typeof value === "string") {
    return dateStringToDate(value);
  }
  throw new Error("Invalid date");
}, z.date());
