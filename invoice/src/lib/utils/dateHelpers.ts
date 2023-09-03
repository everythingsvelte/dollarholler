import { isBefore, format } from 'date-fns';

export const today = format(new Date(), 'dd-MM-yyyy');
/**
 * This takes a date yyyy-mm-dd and returns d-m-yyyy
 *
 */
export const convertDate = (myDate: string): string => {
  // break aparte the date
  const [year, month, date] = splitDate(myDate);
  //return it in the correct format
  return `${parseInt(date)}-${parseInt(month)}-${parseInt(year)}`;
};

export const isLate = (myDate: string): boolean => {
  const [year, month, date] = splitDate(myDate);
  const dueDate = new Date(parseInt(date), parseInt(month), parseInt(year));
  const today = new Date();
  return isBefore(dueDate, today);
};
/*
Takes
*/
export const splitDate = (myDate: string): string[] => {
  return myDate.split('-');
};
