export const convertToBengaliDigits = (
  input: string | number | null | undefined,
): string => {
  if (input == null) {
    // If input is null or undefined, return an empty string or handle as needed
    return "";
  }

  const englishToBengaliMap: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  const str = input.toString(); // Convert number to string if necessary

  return str.replace(/[0-9]/g, (match) => englishToBengaliMap[match]);
};
