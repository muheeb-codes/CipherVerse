import gematriaPrimus from './gematriaPrimus';
import pigLatin from './pigLatin';
import morseCode from './morseCode';
import leetSpeak from './leetSpeak';
import atbashCipher from './atbashCipher';
import rot13 from './rot13';
import caesarCipher from './caesarCipher';
import ubbiDubbi from './ubbiDubbi';
import customTemplate from './customTemplate';
import { LanguageModule } from '../types';

// Mock implementations for the remaining ciphers
const createMock = (name: string, type: string, description: string): LanguageModule => ({
  name,
  type: type as any,
  description,
  encrypt: (text: string) => `[${name}] ${text}`,
  decrypt: (text: string) => text.replace(`[${name}] `, '')
});

// Create the language modules array
const languageModules: LanguageModule[] = [
  gematriaPrimus,
  createMock("Boontling", "obscure", "Regional slang from Boonville, CA"),
  createMock("Thieves' Cant", "cant", "Criminal slang from 16th–19th c. England"),
  createMock("Carnie Speak", "coded speak", "Circus workers' lingo"),
  createMock("Kallawaya", "secret", "Medicinal language from Bolivia"),
  leetSpeak,
  pigLatin,
  ubbiDubbi,
  morseCode,
  createMock("Nüshu", "historical", "Secret writing used by Chinese women"),
  atbashCipher,
  rot13,
  caesarCipher,
  createMock("Zargari", "cryptolect", "Secret language of Iranian Roma"),
  createMock("Swardspeak", "slang blend", "Wordplay and gender codes, Philippines"),
  customTemplate
];

export default languageModules;