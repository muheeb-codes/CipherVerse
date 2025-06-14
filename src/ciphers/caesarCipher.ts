// Default shift value
const DEFAULT_SHIFT = 3;

export const encrypt = (text: string, shift = DEFAULT_SHIFT): string => {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      // a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
      // A-Z
      else if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      return char;
    })
    .join('');
};

export const decrypt = (text: string, shift = DEFAULT_SHIFT): string => {
  // To decrypt, we shift in the opposite direction
  return encrypt(text, 26 - (shift % 26));
};

export default {
  name: "Caesar Cipher",
  type: "cipher",
  description: "Shifts letters by 3 (default)",
  encrypt: (text: string) => encrypt(text),
  decrypt: (text: string) => decrypt(text)
};