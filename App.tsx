import React, { useState, useEffect, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { PokemonCard } from './components/PokemonCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { HomePage } from './components/HomePage';
import { GenerationPage } from './components/GenerationPage';
import { getPokemonData, getAllPokemonNames, getGenerations } from './services/pokeApiService';
import type { PokemonData, PokemonListItem, Generation } from './types';
import { DEFAULT_THEME, THEME_COLORS } from './constants';
import type { AppTheme } from './constants';

const App: React.FC = () => {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [featuredPokemon, setFeaturedPokemon] = useState<PokemonListItem[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonData | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<AppTheme>(DEFAULT_THEME);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setError(null);
        setLoading(true);
        const [pokemonList, gens] = await Promise.all([
            getAllPokemonNames(),
            getGenerations()
        ]);
        
        setAllPokemon(pokemonList);
        setGenerations(gens);

        // Select 8 random Pokémon to feature
        const shuffled = [...pokemonList].sort(() => 0.5 - Math.random());
        setFeaturedPokemon(shuffled.slice(0, 8));

      } catch (err) {
        setError('Failed to load Pokémon data. Please refresh the page.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedPokemon) {
      const primaryType = selectedPokemon.types[0].type.name;
      setTheme(THEME_COLORS[primaryType] || DEFAULT_THEME);
    } else {
      setTheme(DEFAULT_THEME);
    }
  }, [selectedPokemon]);

  const handleSearch = useCallback(async (pokemonName: string) => {
    if (!pokemonName) return;
    try {
      setError(null);
      setLoading(true);
      setSelectedPokemon(null);
      setSelectedGeneration(null);
      const data = await getPokemonData(pokemonName.toLowerCase());
      setSelectedPokemon(data);
    } catch (err) {
      setError(`Pokémon "${pokemonName}" not found. Please try another name.`);
      setSelectedPokemon(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const handleClear = () => {
      setSelectedPokemon(null);
      setSelectedGeneration(null);
      setError(null);
  }

  const handleSelectGeneration = (generationId: number) => {
    const generation = generations.find(g => g.id === generationId);
    if (generation) {
        setSelectedGeneration(generation);
        setError(null);
    }
  };


  return (
    <div className={`min-h-screen text-gray-800 dark:text-gray-200 transition-colors duration-500 ${theme.background}`}>
      <main className="container mx-auto p-4 md:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="PokéAPI Logo" className="w-48 h-auto mb-2" />
          <h1 
            className="text-4xl md:text-5xl font-bold font-press-start text-yellow-400 drop-shadow-lg cursor-pointer hover:text-yellow-300 transition-colors"
            onClick={handleClear}
          >
            Pokédex Overall
          </h1>
        </div>
        
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar allPokemon={allPokemon} onSearch={handleSearch} onClear={handleClear} disabled={loading && !selectedPokemon} theme={theme}/>
        </div>

        <div className="mt-8">
          {loading && <LoadingSpinner />}
          {error && !loading && (
            <div className="text-center p-6 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 rounded-lg max-w-md mx-auto">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}
          {!loading && !error && selectedPokemon && (
            <PokemonCard pokemon={selectedPokemon} theme={theme} onPokemonSelect={handleSearch} />
          )}
          {!loading && !error && !selectedPokemon && selectedGeneration && (
             <GenerationPage 
                generation={selectedGeneration} 
                onPokemonSelect={handleSearch} 
                onBack={handleClear}
             />
          )}
          {!loading && !error && !selectedPokemon && !selectedGeneration && (
            <HomePage 
                featuredPokemon={featuredPokemon} 
                generations={generations} 
                onPokemonSelect={handleSearch} 
                onGenerationSelect={handleSelectGeneration}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;