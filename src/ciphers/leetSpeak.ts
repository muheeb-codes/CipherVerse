const leetMap: Record<string, string> = {
  'a': '4',
  'b': '8',
  'c': '(',
  'd': 'd',
  'e': '3',
  'f': 'f',
  'g': '6',
  'h': '#',
  'i': '1',
  'j': 'j',
  'k': 'k',
  'l': '1',
  'm': 'm',
  'n': 'n',
  'o': '0',
  'p': 'p',
  'q': 'q',
  'r': 'r',
  's': '5',
  't': '7',
  'u': 'u',
  'v': 'v',
  'w': 'w',
  'x': 'x',
  'y': 'y',
  'z': '2'
};

// Create reverse mapping for decryption
const reverseLeetMap: Record<string, string> = {};
Object.keys(leetMap).forEach(key => {
  reverseLeetMap[leetMap[key]] = key;
});

export const encrypt = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map(char => leetMap[char] || char)
    .join('');
};

export const decrypt = (text: string): string => {
  return text
    .split('')
    .map(char => reverseLeetMap[char] || char)
    .join('');
};

export default {
  name: "Leet Speak (1337)",
  type: "internet code",
  description: "Text replaced with symbols/numbers",
  encrypt,
  decrypt
};