export const formatNumberWithCommas = (value: any) => {
  const numericValue = value.toString().replace(/[^0-9]/g, "");

  if (numericValue.length >= 3) {
    return new Intl.NumberFormat("en-US").format(Number(numericValue));
    // Use 'en-US' or your preferred locale as an argument
  }

  return numericValue;
};
