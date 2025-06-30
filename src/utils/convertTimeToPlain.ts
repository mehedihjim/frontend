export function convertTimeToPlain(time?: string): string {
  if (!time || !time.includes(":")) return "";
  return time.replace(":", "");
}
