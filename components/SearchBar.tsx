import React, { useState, useEffect, useRef } from 'react';
import type { PokemonListItem } from '../types';
import type { AppTheme } from '../constants';

interface SearchBarProps {
  allPokemon: PokemonListItem[];
  onSearch: (pokemonName: string) => void;
  onClear: () => void;
  disabled: boolean;
  theme: AppTheme;
}

export const SearchBar: React.FC<SearchBarProps> = ({ allPokemon, onSearch, onClear, disabled, theme }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<PokemonListItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainer.current && !searchContainer.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 1) {
      const filteredSuggestions = allPokemon
        .filter((pokemon) => pokemon.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 7);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
     if(value.length === 0){
        onClear();
    }
  };

  const handleSuggestionClick = (pokemonName: string) => {
    setInputValue(pokemonName);
    setShowSuggestions(false);
    onSearch(pokemonName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue) {
      onSearch(inputValue);
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={searchContainer} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => inputValue.length > 1 && setShowSuggestions(true)}
            placeholder="Search for a Pokémon..."
            disabled={disabled}
            className={`w-full px-5 py-3 text-lg text-gray-800 bg-white border-2 border-gray-300 rounded-full focus:outline-none transition duration-300 disabled:bg-gray-200 disabled:opacity-75 ${theme.accent.focus}`}
          />
          <button type="submit" disabled={disabled} className={`absolute inset-y-0 right-0 flex items-center px-5 text-gray-500 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed ${theme.accent.buttonHover}`}>
             {disabled ? (
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
             ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             )}
          </button>
        </div>
      </form>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((pokemon) => (
            <li
              key={pokemon.name}
              onClick={() => handleSuggestionClick(pokemon.name)}
              className="px-4 py-2 cursor-pointer hover:bg-red-100 text-gray-800"
            >
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};