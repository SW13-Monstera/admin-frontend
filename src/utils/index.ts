export const roundToSecondDigit = (num: number) => Math.round(num * 100) / 100;

export const parseDateTime = (str: string) => {
  const re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}).(\d{6})/;
  const [date, time] = str.slice(0, -7).split('T');
  return re.test(str) ? `${date} ${time}` : str;
};
