import React from 'react';
import type { IconInfo } from '../types';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Copy, Check } from './icons/InterfaceIcons';

const IconCard: React.FC<IconInfo> = ({ name, char }) => {
    const { isCopied, copy } = useCopyToClipboard();

    return (
        <div className="group relative flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg border border-gray-700 aspect-square transition-all duration-300 hover:bg-gray-700 hover:border-blue-500 hover:scale-105 hover:shadow-lg">
            <span className="text-5xl transition-transform group-hover:scale-110" role="img" aria-label={name}>
                {char}
            </span>
            <p className="mt-2 text-center text-xs text-gray-400 group-hover:text-white transition-colors truncate w-full">{name}</p>
            <button
                onClick={() => copy(char)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-900/50 text-gray-400 transition-all opacity-0 group-hover:opacity-100 hover:bg-blue-600 hover:text-white focus:opacity-100"
                aria-label={`Copy emoji ${name}`}
            >
                {isCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </button>
            {isCopied && <div className="absolute bottom-2 px-2 py-1 bg-green-600 text-white text-xs rounded-md animate-fade-in-out">Copied!</div>}
        </div>
    );
};

export default IconCard;