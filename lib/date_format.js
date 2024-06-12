export function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate()}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}