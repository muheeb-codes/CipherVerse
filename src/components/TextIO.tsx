import React, { useRef } from 'react';
import { Copy, Share2, RefreshCw, Lock, Upload, Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface TextIOProps {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  canCopy?: boolean;
  canShare?: boolean;
  canClear?: boolean;
  onCopy?: (text: string) => void;
  onShare?: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  isPasswordProtected?: boolean;
  onPasswordChange?: (password: string) => void;
  onFileUpload?: (content: string) => void;
}

const TextIO: React.FC<TextIOProps> = ({
  id,
  label,
  value,
  onChange,
  readOnly = false,
  canCopy = false,
  canShare = false,
  canClear = false,
  onCopy,
  onShare,
  onClear,
  placeholder,
  isPasswordProtected = false,
  onPasswordChange,
  onFileUpload
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onFileUpload) return;

    if (file.type === 'application/pdf') {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items
            .map((item: any) => item.str)
            .join(' ');
          fullText += pageText + '\n';
        }
        
        onFileUpload(fullText.trim());
      } catch (error) {
        console.error('Error reading PDF:', error);
        alert('Error reading PDF file. Please try again.');
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'cipherverse-output.txt');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
        <label htmlFor={id} className="font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        
        <div className="flex gap-2">
          {!readOnly && onFileUpload && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".txt,.md,.pdf"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                aria-label="Upload file"
                title="Upload file"
              >
                <Upload size={16} />
              </button>
            </>
          )}

          {canCopy && onCopy && (
            <button
              onClick={() => onCopy(value)}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Copy to clipboard"
              title="Copy to clipboard"
              disabled={!value}
            >
              <Copy size={16} />
            </button>
          )}
          
          {canShare && onShare && (
            <button
              onClick={() => onShare(value)}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Share text"
              title="Share text"
              disabled={!value}
            >
              <Share2 size={16} />
            </button>
          )}
          
          {value && (
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Download text"
              title="Download text"
            >
              <Download size={16} />
            </button>
          )}

          {canClear && onClear && (
            <button
              onClick={onClear}
              className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              aria-label="Clear text"
              title="Clear text"
              disabled={!value}
            >
              <RefreshCw size={16} />
            </button>
          )}

          {isPasswordProtected && (
            <button
              className="p-1.5 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
              aria-label="Password protected"
              title="Password protected"
            >
              <Lock size={16} />
            </button>
          )}
        </div>
      </div>

      {isPasswordProtected && onPasswordChange && (
        <div className="px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-100 dark:border-violet-800">
          <input
            type="password"
            placeholder="Enter password to protect/unlock text"
            onChange={(e) => onPasswordChange(e.target.value)}
            className="w-full px-3 py-1 rounded border border-violet-200 dark:border-violet-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-violet-500"
          />
        </div>
      )}
      
      <textarea
        id={id}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        className="w-full min-h-[150px] p-4 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
      />
    </div>
  );
};

export default TextIO;