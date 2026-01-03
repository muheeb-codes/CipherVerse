import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import languageModules from '../ciphers';
import { AppState, Mode } from '../types';

const useCipherState = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const savedState = isClient ? localStorage.getItem('cipherverseState') : null;
  const initialState: AppState = savedState ? JSON.parse(savedState) : {
    inputText: '',
    outputText: '',
    selectedLanguage: languageModules[0].name,
    mode: 'encrypt' as Mode,
    darkMode: isClient ? window.matchMedia('(prefers-color-scheme: dark)').matches : false,
    password: '',
    isPasswordProtected: false
  };

  const [state, setState] = useState<AppState>(initialState);
  
  useEffect(() => {
    if (!state.inputText) {
      setState(prev => ({ ...prev, outputText: '' }));
      return;
    }

    const selectedModule = languageModules.find(module => module.name === state.selectedLanguage);
    if (!selectedModule) return;

    let output = '';

    if (state.mode === 'encrypt') {
      // For encryption: cipher first, then password
      output = selectedModule.encrypt(state.inputText);
      
      if (state.isPasswordProtected && state.password) {
        output = CryptoJS.AES.encrypt(output, state.password).toString();
      }
    } else {
      // For decryption: password first, then cipher
      let decryptedText = state.inputText;
      
      if (state.isPasswordProtected && state.password) {
        try {
          const decrypted = CryptoJS.AES.decrypt(decryptedText, state.password);
          decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
          output = 'Invalid password or corrupted text';
          setState(prev => ({ ...prev, outputText: output }));
          return;
        }
      }
      
      output = selectedModule.decrypt(decryptedText);
    }

    setState(prev => ({ ...prev, outputText: output }));
  }, [state.inputText, state.mode, state.selectedLanguage, state.password, state.isPasswordProtected]);

  useEffect(() => {
    localStorage.setItem('cipherverseState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [state.darkMode]);

  const setInputText = (text: string) => {
    setState(prev => ({ ...prev, inputText: text }));
  };

  const setMode = (mode: Mode) => {
    setState(prev => ({ ...prev, mode }));
  };

  const setSelectedLanguage = (language: string) => {
    setState(prev => ({ ...prev, selectedLanguage: language }));
  };

  const toggleDarkMode = () => {
    setState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const clearText = () => {
    setState(prev => ({ ...prev, inputText: '', outputText: '' }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const shareText = async (text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CipherVerse Translation',
          text: text
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard(text);
      alert('Sharing not supported. Text copied to clipboard instead.');
    }
  };

  const setPassword = (password: string) => {
    setState(prev => ({ ...prev, password }));
  };

  const togglePasswordProtection = () => {
    setState(prev => ({ ...prev, isPasswordProtected: !prev.isPasswordProtected }));
  };

  const handleFileUpload = (content: string) => {
    setInputText(content);
  };

  return {
    state,
    setInputText,
    setMode,
    setSelectedLanguage,
    toggleDarkMode,
    clearText,
    copyToClipboard,
    shareText,
    setPassword,
    togglePasswordProtection,
    handleFileUpload,
    languageModules
  };
};

export default useCipherState;