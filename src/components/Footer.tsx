import React from 'react';
import { Github as GitHub } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <p className="mb-2">
          CipherVerse &copy; {new Date().getFullYear()} | Created with React, TypeScript & Tailwind
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="https://github.com/muheeb-codes" 
            className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            aria-label="GitHub repository"
          >
            <GitHub size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;