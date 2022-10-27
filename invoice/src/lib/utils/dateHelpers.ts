import { isBefore } from 'date-fns';
/**
 * This takes a date yyyy-mm-dd and returns d-m-yyyy
 *
 */
export const convertDate = (myDate: string): string => {
  // break aparte the date
  const [year, month, day] = splitDate(myDate);
  //return it in the correct format
  return `${parseInt(day)}-${parseInt(month)}-${parseInt(year)}`;
};

export const isLate = (myDate: string): boolean => {
  const [year, month, day] = splitDate(myDate);
  const dueDate = new Date(parseInt(year), parseInt(month), parseInt(day));
  const today = new Date();
  return isBefore(dueDate, today);
};
/*
Takes
*/
export const splitDate = (myDate: string): string[] => {
  return myDate.split('-');
};
