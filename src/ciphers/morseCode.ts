const morseCodeMap: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
  'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
  'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

// Invert the map for decryption
const invertedMorseCodeMap: Record<string, string> = {};

Object.keys(morseCodeMap).forEach(key => {
  invertedMorseCodeMap[morseCodeMap[key]] = key;
});

export const encrypt = (text: string): string => {
  return text
    .toUpperCase()
    .split('')
    .map(char => {
      if (char === ' ') {
        return '/'
      }
      return morseCodeMap[char] || char;
    })
    .join(' ');
};

export const decrypt = (text: string): string => {
  // Split by spaces, but treat / as a space character
  return text
    .split(' ')
    .map(code => {
      if (code === '/') {
        return ' ';
      }
      return invertedMorseCodeMap[code] || code;
    })
    .join('');
};

export default {
  name: "Morse Code",
  type: "symbol code",
  description: "Converts text to dots and dashes",
  encrypt,
  decrypt
};