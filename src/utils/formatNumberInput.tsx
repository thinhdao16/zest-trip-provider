export const formatNumberInput = (number: number): string => {
  const formattedNumber = number?.toLocaleString("en-US");
  return formattedNumber; // Thêm 'đ' nếu giá trị được định dạng, ngược lại trả về chuỗi trống.
};
