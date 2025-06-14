import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import languageModules from '../ciphers';
import { AppState, Mode } from '../types';

const useCipherState = () => {
  const savedState = localStorage.getItem('cipherverseState');
  const initialState: AppState = savedState ? JSON.parse(savedState) : {
    inputText: '',
    outputText: '',
    selectedLanguage: languageModules[0].name,
    mode: 'encrypt' as Mode,
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    password: '',
    isPasswordProtected: false
  };

  const [state, setState] = useState<AppState>(initialState);
  
  useEffect(() => {
    if (state.inputText) {
      let processedText = state.inputText;
      
      // Handle password protection for encryption
      if (state.mode === 'encrypt' && state.isPasswordProtected && state.password) {
        processedText = CryptoJS.AES.encrypt(processedText, state.password).toString();
      }
      
      // Process with selected cipher
      const selectedModule = languageModules.find(module => module.name === state.selectedLanguage);
      if (!selectedModule) return;

      let output = state.mode === 'encrypt' 
        ? selectedModule.encrypt(processedText)
        : selectedModule.decrypt(processedText);
        
      // Handle password protection for decryption
      if (state.mode === 'decrypt' && state.isPasswordProtected && state.password) {
        try {
          const decrypted = CryptoJS.AES.decrypt(output, state.password);
          output = decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
          output = 'Invalid password or corrupted text';
        }
      }

      setState(prev => ({ ...prev, outputText: output }));
    }
  }, [state.inputText, state.mode, state.selectedLanguage, state.password, state.isPasswordProtected]);

  useEffect(() => {
    localStorage.setItem('cipherverseState', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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