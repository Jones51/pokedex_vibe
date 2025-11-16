import React from 'react';
import type { PokemonListItem, Generation } from '../types';
import { FeaturedPokemonCard } from './FeaturedPokemonCard';

interface HomePageProps {
    featuredPokemon: PokemonListItem[];
    generations: Generation[];
    onPokemonSelect: (pokemonName: string) => void;
    onGenerationSelect: (generationId: number) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

export const HomePage: React.FC<HomePageProps> = ({ featuredPokemon, generations, onPokemonSelect, onGenerationSelect }) => {
    return (
        <div className="space-y-12 animate-fade-in">
            
            <section>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Featured Pokémon</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {featuredPokemon.map(pokemon => (
                        <FeaturedPokemonCard key={pokemon.name} pokemon={pokemon} onSelect={onPokemonSelect} />
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Pokémon Generations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {generations.sort((a, b) => a.id - b.id).map(gen => (
                        <div 
                            key={gen.id} 
                            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center cursor-pointer hover:shadow-xl hover:scale-105 transition-all"
                            onClick={() => onGenerationSelect(gen.id)}
                        >
                            <h3 className="text-xl font-bold text-red-600 dark:text-red-400 font-press-start text-sm">
                                {gen.name.replace('generation-', 'Gen ').toUpperCase()}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                Main Region: <span className="font-semibold">{capitalize(gen.main_region.name)}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};