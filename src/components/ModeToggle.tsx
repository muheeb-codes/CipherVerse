import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { Mode } from '../types';

interface ModeToggleProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  return (
    <div className="flex p-1 bg-gray-200 dark:bg-gray-700 rounded-lg">
      <button
        onClick={() => setMode('encrypt')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
          mode === 'encrypt'
            ? 'bg-white dark:bg-gray-800 text-violet-600 dark:text-violet-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
        }`}
      >
        <Lock size={16} />
        <span>Encrypt</span>
      </button>
      
      <button
        onClick={() => setMode('decrypt')}
        className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md transition-all duration-300 ${
          mode === 'decrypt'
            ? 'bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50'
        }`}
      >
        <Unlock size={16} />
        <span>Decrypt</span>
      </button>
    </div>
  );
};

export default ModeToggle;