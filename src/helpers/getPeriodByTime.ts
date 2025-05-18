import { getWeekNumber, getWeekPeriod } from "./getWeek";

export default function getPeriodByTime(time: number, periodType: string) {
  switch (periodType) {
    case "years":
      return new Date(time).getFullYear();
    case "months": {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      return `${year}.${month < 10 ? `0${month}` : month}`;
    }
    case "weeks": {
      const weekNumber = getWeekNumber(time);
      const { start, end } = getWeekPeriod(time);
      return `${weekNumber}: ${start} - ${end}`;
    }
    default:
      return new Date(time).toLocaleDateString();
  }
}
