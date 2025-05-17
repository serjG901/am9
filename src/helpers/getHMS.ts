const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;

export default function getHMS(milliseconds: number) {
  const allHours = Math.trunc(milliseconds / hour);
  const allMinutes = Math.trunc(milliseconds / minute);
  const allSeconds = Math.trunc(milliseconds / second);
  const hours = allHours ? `${allHours}h ` : "";
  const minutes = allMinutes ? `${allMinutes - allHours * 60}m ` : "";
  const seconds = allSeconds ? `${allSeconds - allMinutes * 60}s` : "";
  return hours + minutes + seconds;
}
