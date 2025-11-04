
import React, { useState } from 'react';
import { Sparkles, Library } from './components/icons/InterfaceIcons';
import IconSuggester from './components/IconSuggester';
import IconLibrary from './components/IconLibrary';

type View = 'suggester' | 'library';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('suggester');

  const navButtonClasses = (view: View) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
      activeView === view 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
            AI Icon Assistant
          </h1>
          <p className="mt-2 text-gray-400">
            Find the perfect icon for any context, powered by Gemini.
          </p>
        </header>

        <nav className="flex justify-center mb-8 gap-4">
          <button onClick={() => setActiveView('suggester')} className={navButtonClasses('suggester')}>
            <Sparkles className="w-5 h-5" />
            <span>AI Suggester</span>
          </button>
          <button onClick={() => setActiveView('library')} className={navButtonClasses('library')}>
            <Library className="w-5 h-5" />
            <span>Icon Library</span>
          </button>
        </nav>

        <main>
          {activeView === 'suggester' ? <IconSuggester /> : <IconLibrary />}
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Icon Assistant. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
