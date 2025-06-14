const primeNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// Create mapping of letters to prime numbers
const letterToPrime: Record<string, number> = {};
const primeToLetter: Record<number, string> = {};

alphabet.forEach((letter, index) => {
  letterToPrime[letter] = primeNumbers[index];
  primeToLetter[primeNumbers[index]] = letter;
});

export const encrypt = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (letterToPrime[char]) {
        return letterToPrime[char].toString();
      }
      // Preserve spaces and special characters
      return char.match(/[A-Z]/) ? '' : char;
    })
    .join(' ');
};

export const decrypt = (text: string): string => {
  // Split by spaces or any non-numeric character
  return text
    .split(/\s+/)
    .map(numStr => {
      const num = parseInt(numStr.trim(), 10);
      return primeToLetter[num] || (isNaN(num) ? numStr : '');
    })
    .join('');
};

export default {
  name: "Gematria Primus",
  type: "cipher",
  description: "Maps A–Z to unique prime numbers",
  encrypt,
  decrypt
};