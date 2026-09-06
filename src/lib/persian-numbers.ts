const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

export function toEnglishDigits(value: string | number) {
  return String(value).replace(/[۰-۹]/g, (digit) =>
    String(persianDigits.indexOf(digit)),
  );
}

export function toEnglishPaddedNumber(value: number, length = 2) {
  return String(value).padStart(length, "0");
}
