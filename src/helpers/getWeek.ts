const minuteMilliseconds = 60 * 1000;
const dayMilliseconds = 24 * 60 * minuteMilliseconds;
const thursdayCorrection = 4 * dayMilliseconds;
const weekMilliseconds = 7 * dayMilliseconds;
const localeCorrection = new Date().getTimezoneOffset();

export const getWeekNumber = (timestamp: number) =>
  Math.trunc((timestamp - thursdayCorrection) / weekMilliseconds);

export const getWeekPeriod = (timestamp: number) => {
  const weekNumber = getWeekNumber(timestamp);
  const end = new Date(
    thursdayCorrection +
      weekMilliseconds * (weekNumber + 1) -
      1 +
      localeCorrection * minuteMilliseconds
  ).toLocaleString();
  const start = new Date(
    thursdayCorrection +
      weekMilliseconds * weekNumber +
      1 +
      localeCorrection * minuteMilliseconds
  ).toLocaleString();
  return {
    start,
    end,
  };
};
