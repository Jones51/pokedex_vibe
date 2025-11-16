import React from 'react';
import type { PokemonData } from '../types';
import { TypeBadge } from './TypeBadge';
import { StatBar } from './StatBar';
import type { AppTheme } from '../constants';

interface PokemonCardProps {
  pokemon: PokemonData;
  theme: AppTheme;
  onPokemonSelect: (pokemonName: string) => void;
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ');

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, theme, onPokemonSelect }) => {
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
      <div className={`p-4 md:p-6 text-white transition-colors duration-500 ${theme.header}`}>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl md:text-4xl font-bold font-press-start drop-shadow-md">{capitalize(pokemon.name)}</h2>
          <span className="text-2xl font-bold text-yellow-300">#{pokemon.id.toString().padStart(3, '0')}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 p-6">
        <div className="md:col-span-2 flex flex-col items-center justify-center">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 w-full">
             <img src={imageUrl} alt={pokemon.name} className="w-full h-auto object-contain drop-shadow-xl" />
          </div>
          <div className="mt-4 w-full">
            <h3 className="text-xl font-bold mb-2 text-center">Types</h3>
            <div className="flex justify-center gap-2">
              {pokemon.types.map(({ type }) => (
                <TypeBadge key={type.name} typeName={type.name} />
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="text-lg italic mb-6 text-center md:text-left">{pokemon.description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="font-bold text-lg">Height</p>
                <p>{pokemon.height / 10} m</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="font-bold text-lg">Weight</p>
                <p>{pokemon.weight / 10} kg</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <p className="font-bold text-lg">Generation</p>
                <p>{pokemon.generation}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Base Stats</h3>
            {pokemon.stats.map(({ stat, base_stat }) => (
              <StatBar key={stat.name} statName={capitalize(stat.name)} value={base_stat} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-gray-100 dark:bg-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-3">Abilities</h3>
          <ul className="list-disc list-inside space-y-1">
            {pokemon.abilities.map(({ ability, is_hidden }) => (
              <li key={ability.name}>
                {capitalize(ability.name)} {is_hidden && <span className="text-sm text-gray-500 dark:text-gray-400">(Hidden)</span>}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-3">Game Appearances</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.game_indices.slice(0, 10).map(({ version }) => (
              <span key={version.name} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-sm rounded-md">{capitalize(version.name)}</span>
            ))}
            {pokemon.game_indices.length > 10 && <span className="px-2 py-1 text-sm">...and more</span>}
          </div>
        </div>
      </div>
      
      {pokemon.evolutionChain && pokemon.evolutionChain.length > 1 && (
        <div className="p-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-center">Evolution Chain</h3>
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {pokemon.evolutionChain.map((evo, index) => {
                const isCurrentPokemon = pokemon.name === evo.name;
                return (
                  <React.Fragment key={evo.id}>
                    <div 
                      className={`
                        flex flex-col items-center text-center p-2 rounded-lg transition-transform 
                        ${isCurrentPokemon 
                          ? 'bg-yellow-200 dark:bg-yellow-700 shadow-md' 
                          : 'bg-gray-100 dark:bg-gray-700 hover:scale-105 cursor-pointer'
                        }
                      `}
                      onClick={() => !isCurrentPokemon && onPokemonSelect(evo.name)}
                    >
                      <img src={evo.imageUrl} alt={evo.name} className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg" />
                      <p className="mt-2 text-sm font-semibold">{capitalize(evo.name)}</p>
                    </div>
                    {index < pokemon.evolutionChain.length - 1 && (
                        <div className="text-2xl font-bold text-gray-400 dark:text-gray-500 hidden sm:block px-2">&rarr;</div>
                    )}
                  </React.Fragment>
                )
            })}
          </div>
        </div>
      )}
    </div>
  );
};