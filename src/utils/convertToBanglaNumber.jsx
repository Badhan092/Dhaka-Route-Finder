/** Convert English digits to Bangla digits **/

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const convertToBanglaNumber = (value) => {
  if (value === null || value === undefined) return value;

  return String(value).replace(/\d/g, (digit) => BN_DIGITS[digit]);
};