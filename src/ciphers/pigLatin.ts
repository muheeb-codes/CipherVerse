export const encrypt = (text: string): string => {
  return text
    .split(/\s+/)
    .map(word => {
      if (!word) return word;
      
      // Check if word consists only of punctuation
      if (word.match(/^[^\w]+$/)) return word;
      
      // Extract leading punctuation
      const leadingPunctMatch = word.match(/^([^\w]+)(.*)/);
      const leadingPunct = leadingPunctMatch ? leadingPunctMatch[1] : '';
      const wordWithoutLeadingPunct = leadingPunctMatch ? leadingPunctMatch[2] : word;
      
      // Extract trailing punctuation
      const trailingPunctMatch = wordWithoutLeadingPunct.match(/(.*?)([^\w]+)$/);
      const trailingPunct = trailingPunctMatch ? trailingPunctMatch[2] : '';
      const cleanWord = trailingPunctMatch ? trailingPunctMatch[1] : wordWithoutLeadingPunct;
      
      if (!cleanWord) return word;
      
      // Pig Latin transformation
      const firstVowelIndex = cleanWord.toLowerCase().search(/[aeiouy]/);
      let result = '';
      
      if (firstVowelIndex === 0) {
        // Word starts with vowel
        result = cleanWord + 'way';
      } else if (firstVowelIndex > 0) {
        // Word starts with consonant
        result = cleanWord.slice(firstVowelIndex) + cleanWord.slice(0, firstVowelIndex) + 'ay';
      } else {
        // No vowels found
        result = cleanWord + 'ay';
      }
      
      return leadingPunct + result + trailingPunct;
    })
    .join(' ');
};

export const decrypt = (text: string): string => {
  return text
    .split(/\s+/)
    .map(word => {
      if (!word) return word;
      
      // Check if word consists only of punctuation
      if (word.match(/^[^\w]+$/)) return word;
      
      // Extract leading punctuation
      const leadingPunctMatch = word.match(/^([^\w]+)(.*)/);
      const leadingPunct = leadingPunctMatch ? leadingPunctMatch[1] : '';
      const wordWithoutLeadingPunct = leadingPunctMatch ? leadingPunctMatch[2] : word;
      
      // Extract trailing punctuation
      const trailingPunctMatch = wordWithoutLeadingPunct.match(/(.*?)([^\w]+)$/);
      const trailingPunct = trailingPunctMatch ? trailingPunctMatch[2] : '';
      const cleanWord = trailingPunctMatch ? trailingPunctMatch[1] : wordWithoutLeadingPunct;
      
      if (!cleanWord) return word;
      
      if (cleanWord.toLowerCase().endsWith('way') && cleanWord.length > 3) {
        // Word starts with vowel case
        return leadingPunct + cleanWord.slice(0, -3) + trailingPunct;
      } else if (cleanWord.toLowerCase().endsWith('ay') && cleanWord.length > 2) {
        // Word starts with consonant case
        const base = cleanWord.slice(0, -2);
        
        // Find the last consonant cluster
        let lastConsonantIndex = -1;
        for (let i = base.length - 1; i >= 0; i--) {
          if (!'aeiouy'.includes(base[i].toLowerCase())) {
            lastConsonantIndex = i;
          } else {
            break;
          }
        }
        
        if (lastConsonantIndex === -1) {
          return leadingPunct + base + trailingPunct;
        }
        
        const consonantCluster = base.slice(lastConsonantIndex + 1);
        const stem = base.slice(0, lastConsonantIndex + 1);
        
        return leadingPunct + consonantCluster + stem + trailingPunct;
      }
      
      return word;
    })
    .join(' ');
};

export default {
  name: "Pig Latin",
  type: "wordplay",
  description: "Reorders syllables for obfuscation",
  encrypt,
  decrypt
};