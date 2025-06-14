import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import ModeToggle from './components/ModeToggle';
import TextIO from './components/TextIO';
import useCipherState from './hooks/useCipherState';
import { Lock, Unlock } from 'lucide-react';

function App() {
  const {
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
  } = useCipherState();

  return (
    <div className="min-h-screen flex flex-col bg-pattern">
      <Header 
        darkMode={state.darkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <main className="container mx-auto px-4 py-8 flex-grow max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">
            Multilingual Secret Code Translator
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Encrypt and decrypt messages using various secret codes, ciphers, and obscure languages.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Select a Language or Cipher</h2>
              <LanguageSelector 
                languages={languageModules}
                selectedLanguage={state.selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>
            
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Choose Operation Mode</h2>
              <ModeToggle mode={state.mode} setMode={setMode} />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Security Options</h2>
              <button
                onClick={togglePasswordProtection}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  state.isPasswordProtected
                    ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                {state.isPasswordProtected ? <Lock size={18} /> : <Unlock size={18} />}
                {state.isPasswordProtected ? 'Password Protected' : 'Add Password Protection'}
              </button>
            </div>
          </div>
          
          <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
            <div className="flex-grow">
              <h2 className="text-lg font-medium mb-1">Current Cipher</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {state.selectedLanguage} ({languageModules.find(l => l.name === state.selectedLanguage)?.type})
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {languageModules.find(l => l.name === state.selectedLanguage)?.description}
              </p>
            </div>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              state.mode === 'encrypt' 
                ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400' 
                : 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400'
            }`}>
              <span className="text-xl font-bold">
                {state.mode === 'encrypt' ? '🔒' : '🔓'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <TextIO 
            id="input-text"
            label={state.mode === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
            value={state.inputText}
            onChange={setInputText}
            placeholder={state.mode === 'encrypt' 
              ? 'Enter text to encrypt...' 
              : 'Enter text to decrypt...'}
            canClear={true}
            onClear={clearText}
            isPasswordProtected={state.isPasswordProtected}
            onPasswordChange={setPassword}
            onFileUpload={handleFileUpload}
          />
          
          <TextIO 
            id="output-text"
            label={state.mode === 'encrypt' ? 'Encrypted Text' : 'Plain Text'}
            value={state.outputText}
            readOnly={true}
            canCopy={true}
            canShare={true}
            onCopy={copyToClipboard}
            onShare={shareText}
            isPasswordProtected={state.isPasswordProtected}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;