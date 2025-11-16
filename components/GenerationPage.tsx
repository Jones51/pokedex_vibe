import React from 'react';
import type { Generation } from '../types';
import { FeaturedPokemonCard } from './FeaturedPokemonCard';

interface GenerationPageProps {
    generation: Generation;
    onPokemonSelect: (pokemonName: string) => void;
    onBack: () => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

const getIdFromUrl = (url: string): number => {
    const parts = url.split('/').filter(part => part);
    return parseInt(parts[parts.length - 1], 10);
};

export const GenerationPage: React.FC<GenerationPageProps> = ({ generation, onPokemonSelect, onBack }) => {
    // Sort Pokémon by their Pokédex ID
    const sortedPokemon = [...generation.pokemon_species].sort((a, b) => {
        return getIdFromUrl(a.url) - getIdFromUrl(b.url);
    });

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-8">
                <button 
                    onClick={onBack}
                    className="mb-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                >
                    &larr; Back to Home
                </button>
                <h1 className="text-4xl font-bold font-press-start text-yellow-400 drop-shadow-lg">
                    {generation.name.replace('generation-', 'Generation ').toUpperCase()}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">
                    Region: {capitalize(generation.main_region.name)}
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {sortedPokemon.map(pokemon => (
                    <FeaturedPokemonCard key={pokemon.name} pokemon={pokemon} onSelect={onPokemonSelect} />
                ))}
            </div>
        </div>
    );
};