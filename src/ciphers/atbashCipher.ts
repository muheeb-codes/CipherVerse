export const encrypt = (text: string): string => {
  return text
    .split('')
    .map(char => {
      const code = char.charCodeAt(0);
      // Check if character is a-z
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(219 - code); // 219 = 97 + 122
      }
      // Check if character is A-Z
      else if (code >= 65 && code <= 90) {
        return String.fromCharCode(155 - code); // 155 = 65 + 90
      }
      return char;
    })
    .join('');
};

// For Atbash, encryption and decryption are the same operation
export const decrypt = encrypt;

export default {
  name: "Atbash Cipher",
  type: "cipher",
  description: "Reverses the alphabet (A=Z, B=Y...)",
  encrypt,
  decrypt
};