
import React, { useState, useMemo } from 'react';
import { ICONS } from '../constants';
import IconCard from './IconCard';

const IconLibrary: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIcons = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        if (!lowercasedTerm) return ICONS;
        return ICONS.filter(icon => 
            icon.name.toLowerCase().includes(lowercasedTerm) ||
            icon.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
        );
    }, [searchTerm]);

    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search for an icon..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-4 pl-12 bg-gray-800 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-lg"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
            </div>
            {filteredIcons.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                    {/* FIX: Spread the icon object to pass all required props to IconCard. */}
                    {filteredIcons.map(icon => (
                        <IconCard key={icon.name} {...icon} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-2xl text-gray-400">No icons found for "{searchTerm}"</p>
                    <p className="text-gray-500 mt-2">Try a different search term.</p>
                </div>
            )}
        </div>
    );
};

export default IconLibrary;
