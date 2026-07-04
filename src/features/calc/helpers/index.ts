export const isNumber = (value: string): boolean =>
  !Number.isNaN(Number(value));

export const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const containsTwoDigits = (str: string): boolean =>
  /(?:\d.*){2,}/.test(str);

const operatorRegex = /^[\+\-\*\/%=!<>&|\^~]+$/;
export const hasSpecialChar = (str: string) => operatorRegex.test(str);
