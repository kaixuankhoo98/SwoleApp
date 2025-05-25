import { format, parse } from 'date-fns';
import { z } from 'zod';

export const dateStringToDate = (date: string) => {
  return parse(date, "yyyy-MM-dd HH:mm:ss", new Date());
}

export const dateToDateOnly = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

export const dateStringToDateOnly = (date: string) => {
  return parse(date, "yyyy-MM-dd", new Date());
}

export const dateToTimeOnly = (date: Date) => {
  return format(date, "HH:mm:ss");
}


// zod objects
export const dateTime = z.preprocess((value) => {
  if (typeof value === "string") {
    return new Date(value);
  }
  throw new Error(`Invalid date type: ${typeof value}`);
}, z.date());

export const nullableDateTime = z.preprocess((value) => {
  if (typeof value === "string") {
    return new Date(value);
  }
  if (value === null) return null;
  throw new Error("Invalid date");
}, z.date().nullable());

export const dateOnly = z.preprocess((value) => {
  if (typeof value === "string") {
    return dateStringToDateOnly(value);
  }
  throw new Error("Invalid date");
}, z.date());

export const nullableDateOnly = z.preprocess((value) => {
  if (typeof value === "string") {
    return dateStringToDateOnly(value);
  }
  if (value === null) return null;
  throw new Error("Invalid date");
}, z.date().nullable());
