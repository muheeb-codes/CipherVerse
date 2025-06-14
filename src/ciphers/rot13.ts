export const encrypt = (text: string): string => {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      // a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + 13) % 26) + 97);
      }
      // A-Z
      else if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + 13) % 26) + 65);
      }
      return char;
    })
    .join('');
};

// For ROT13, encryption and decryption are the same operation
export const decrypt = encrypt;

export default {
  name: "ROT13",
  type: "cipher",
  description: "Shifts letters by 13",
  encrypt,
  decrypt
};