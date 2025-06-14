export interface LanguageModule {
  name: string;
  type: LanguageType;
  description: string;
  encrypt: (text: string) => string;
  decrypt: (text: string) => string;
}

export type LanguageType = 
  | 'cipher'
  | 'obscure'
  | 'cant'
  | 'coded speak'
  | 'secret'
  | 'internet code'
  | 'wordplay'
  | 'phonetic code'
  | 'symbol code'
  | 'historical'
  | 'cryptolect'
  | 'slang blend';

export type Mode = 'encrypt' | 'decrypt';

export interface AppState {
  inputText: string;
  outputText: string;
  selectedLanguage: string;
  mode: Mode;
  darkMode: boolean;
  password: string;
  isPasswordProtected: boolean;
}