import React from 'react';
import type { PokemonListItem } from '../types';

interface FeaturedPokemonCardProps {
    pokemon: PokemonListItem;
    onSelect: (pokemonName: string) => void;
}

const getIdFromUrl = (url: string): string => {
    const parts = url.split('/').filter(part => part);
    return parts[parts.length - 1];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const FeaturedPokemonCard: React.FC<FeaturedPokemonCardProps> = ({ pokemon, onSelect }) => {
    const id = getIdFromUrl(pokemon.url);
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
        <div 
            className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer flex flex-col items-center"
            onClick={() => onSelect(pokemon.name)}
        >
            <div className="bg-gray-100 dark:bg-gray-700 w-full aspect-square rounded-lg flex items-center justify-center">
                <img 
                    src={imageUrl} 
                    alt={pokemon.name} 
                    className="w-full h-full object-contain p-2 drop-shadow-lg" 
                    loading="lazy"
                />
            </div>
            <p className="mt-3 font-bold text-center text-sm md:text-base text-gray-800 dark:text-gray-200">
                {capitalize(pokemon.name)}
            </p>
        </div>
    );
};
