export const encrypt = (text: string): string => {
  return text
    .split('')
    .map(char => {
      // Check if the character is a vowel
      if ('aeiouAEIOU'.includes(char)) {
        return 'ub' + char;
      }
      return char;
    })
    .join('');
};

export const decrypt = (text: string): string => {
  // Replace all instances of 'ub' followed by a vowel with just the vowel
  return text.replace(/ub([aeiouAEIOU])/g, '$1');
};

export default {
  name: "Ubbi Dubbi",
  type: "phonetic code",
  description: "Adds 'ub' before vowels",
  encrypt,
  decrypt
};