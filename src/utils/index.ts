export const roundToSecondDigit = (num: number) => Math.round(num * 100) / 100;

export const parseDateTime = (str: string) => {
  const dateString = Date.parse(str);
  if (dateString !== NaN) {
    const newDate = new Date(dateString);
    return `${newDate.getFullYear()}년 ${newDate.getMonth()}월 ${newDate.getDate()}일 ${newDate.getHours()}시 ${newDate.getMinutes()}분`;
  } else {
    return str;
  }
};
