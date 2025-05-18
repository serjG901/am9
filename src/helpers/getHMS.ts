const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

export default function getHMS(milliseconds: number) {
  const allHours = Math.trunc(milliseconds / hour);
  const allMinutes = Math.trunc(milliseconds / minute);
  const allSeconds = Math.trunc(milliseconds / second);
  const hours = allHours ? `${allHours}h ` : "";
  const minutesTail = allMinutes - allHours * 60;
  const minutes = allMinutes
    ? `${minutesTail < 10 ? `0${minutesTail}` : minutesTail}m `
    : "";
  const secondsTail = allSeconds - allMinutes * 60;
  const seconds = allSeconds
    ? `${secondsTail < 10 ? `0${secondsTail}` : secondsTail}s`
    : "";
  return hours + minutes + seconds;
}
