export function formatDate(dateString: any) {
  if (!dateString) return "";

  const date = new Date(dateString);
  const [day, month, year] = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .split(" ");

  return `${day} ${month}, ${year}`; // "17 Apr, 2025"
}
