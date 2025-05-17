const dayMilliseconds = 24 * 60 * 60 * 1000;

export const getWeekNumber = (timestamp: number) =>
  Math.trunc((timestamp - (4 * dayMilliseconds - 1)) / (7 * dayMilliseconds));

export const getWeekPeriod = (timestamp: number) => {
  const weekNumber = getWeekNumber(timestamp);
  const end = new Date(dayMilliseconds * (weekNumber + 1) - 1);
  const start = new Date(dayMilliseconds * weekNumber + 1);
  return {
    start,
    end,
  };
};
