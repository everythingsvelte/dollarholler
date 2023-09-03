export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) return 0;
  return lineItems.reduce((prevValue, curValue) => prevValue + curValue.amount, 0);
};
/** Converting cents to euros, without commas
 * @param {number} cents
 * @returns {string}
 * */

export const centsToEurosWithoutCommas = (cents: number) => {
  const euros = cents / 100;
  return twoDecimals(euros);
};

/*
Takes the lineItems and discount and returns the total amount of the invoice.
*@param lineItems - array of lineItems
*@param discount - discount percentage
*@returns {number}
*/

export const invoiceTotal = (
  lineItems: LineItem[] | undefined,
  discount: number | undefined
): number => {
  const lineItemsSum = sumLineItems(lineItems);
  if (discount) {
    const invoiceDiscount = lineItemsSum * (discount / 100);
    return lineItemsSum - invoiceDiscount;
  }
  return lineItemsSum;
};

export const centsToEuros = (cents: number): string => {
  const euros = cents / 100;
  const addDecimals = twoDecimals(euros);
  return addThousandsSeparator(addDecimals);
};

export const eurosToCents = (euros: number): number => {
  return euros * 100;
};

export const twoDecimals = (myNum: number): string => {
  return myNum.toFixed(2);
};

export const addThousandsSeparator = (myNum: string): string => {
  return myNum.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const sumInvoices = (invoices: Invoice[] | undefined): number => {
  if (!invoices) return 0;
  return invoices.reduce((prevValue, curValue) => {
    const invoiceSum = invoiceTotal(curValue.lineItems, curValue.discount);
    return prevValue + invoiceSum;
  }, 0);
};
