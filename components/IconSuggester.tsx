import React, { useState, useCallback } from 'react';
import { embellishTextWithIcons } from '../services/geminiService';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { Copy, Check } from './icons/InterfaceIcons';

// Sub-component for displaying a single suggestion
const SuggestionCard: React.FC<{ text: string }> = ({ text }) => {
    const { isCopied, copy } = useCopyToClipboard();

    return (
        <div className="bg-gray-900 p-4 rounded-lg flex items-center justify-between gap-4 animate-fade-in border border-gray-700 hover:border-blue-600 transition-colors">
            <p className="text-lg text-gray-200 break-words flex-1">{text}</p>
            <button
                onClick={() => copy(text)}
                className="flex-shrink-0 bg-gray-700 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center gap-2 transition-all duration-200 disabled:opacity-50"
                aria-label="Copy suggestion"
            >
                {isCopied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
            </button>
        </div>
    );
};


const IconSuggester: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [suggestions, setSuggestions] = useState<string[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSuggest = useCallback(async () => {
        if (!text.trim()) {
            setError('Please enter some text to get a suggestion.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setSuggestions(null);

        try {
            const results = await embellishTextWithIcons(text);
            setSuggestions(results);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [text]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-4">AI Text Embellisher ✨</h2>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here... e.g., 'Get ready for our biggest sale of the year!'"
                className="w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg resize-none h-32"
                disabled={isLoading}
            />
            <button
                onClick={handleSuggest}
                disabled={isLoading || !text.trim()}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Embellishing...
                    </>
                ) : (
                    'Embellish Text'
                )}
            </button>
            
            <div className="mt-8 pt-6 border-t border-gray-700 min-h-[250px] flex flex-col justify-start">
                 {isLoading && (
                     <div className="flex justify-center items-center h-full">
                        <p className="text-gray-400">The AI is working its magic... 🪄</p>
                    </div>
                )}

                {error && <p className="mt-4 text-center text-red-400">{error}</p>}
                
                {suggestions && suggestions.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">Suggestions:</h3>
                        {suggestions.map((suggestion, index) => (
                            <SuggestionCard key={index} text={suggestion} />
                        ))}
                    </div>
                )}
                 
                 {!isLoading && !suggestions && !error && (
                    <div className="flex justify-center items-center h-full">
                         <p className="text-gray-500">Your embellished text suggestions will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IconSuggester;