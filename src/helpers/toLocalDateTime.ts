export default function toLocalDateTime(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}
