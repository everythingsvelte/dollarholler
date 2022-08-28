import { isBefore } from 'date-fns'

/**
 * Takes yyyy-mm-dd and returns m-d-yyyy
 */
export const convertDate = (myDate: string): string => {
  // break apart the date
  const [year, month, date] = splitDate(myDate);
  // return it in the correct format
  return `${month} / ${date} / ${year}`
}

const splitDate = (myDate: string): Array<string> => {
  return myDate.split('-');
}

export const isLate = (myDate: string): boolean => {
  const [year, month, date] = splitDate(myDate);
  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(date));
  const today = new Date();
  return isBefore(dueDate, today);
}