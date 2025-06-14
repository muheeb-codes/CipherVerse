import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { LanguageModule } from '../types';

interface LanguageSelectorProps {
  languages: LanguageModule[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  languages, 
  selectedLanguage, 
  onSelect 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedLanguageDetails = languages.find(l => l.name === selectedLanguage);
  
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm flex justify-between items-center hover:border-violet-500 dark:hover:border-violet-400 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col items-start">
          <span className="font-medium">{selectedLanguage}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {selectedLanguageDetails?.type} - {selectedLanguageDetails?.description}
          </span>
        </div>
        <ChevronDown size={18} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search languages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredLanguages.map((language) => (
              <button
                key={language.name}
                onClick={() => {
                  onSelect(language.name);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  language.name === selectedLanguage ? 'bg-violet-100 dark:bg-violet-900/30' : ''
                }`}
              >
                <div className="font-medium">{language.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {language.type} - {language.description}
                </div>
              </button>
            ))}
            
            {filteredLanguages.length === 0 && (
              <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                No languages found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;