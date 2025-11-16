import type { Pokemon, PokemonSpecies, PokemonData, PokemonListItem, EvolutionStage, Generation } from '../types';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const getAllPokemonNames = async (): Promise<PokemonListItem[]> => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=1500`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }
  const data = await response.json();
  return data.results;
};

export const getGenerations = async (): Promise<Generation[]> => {
    const response = await fetch(`${API_BASE_URL}/generation`);
    if (!response.ok) {
        throw new Error('Failed to fetch generations');
    }
    const data = await response.json();
    
    const generationDetails = await Promise.all(
        data.results.map(async (gen: {url: string}) => {
            const genResponse = await fetch(gen.url);
            return genResponse.json();
        })
    );
    return generationDetails;
};


const getIdFromUrl = (url: string): string => {
    const parts = url.split('/').filter(part => part);
    return parts[parts.length - 1];
};

const collectEvolutions = (chain: any, result: EvolutionStage[]): void => {
    if (!chain) return;
    const id = getIdFromUrl(chain.species.url);
    result.push({
        id,
        name: chain.species.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
    });

    if (chain.evolves_to && chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((evolution: any) => collectEvolutions(evolution, result));
    }
};

const fetchEvolutionChain = async (url: string): Promise<EvolutionStage[]> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch evolution chain');
        }
        const data = await response.json();
        const evolutionStages: EvolutionStage[] = [];
        if (data.chain) {
            collectEvolutions(data.chain, evolutionStages);
        }
        return evolutionStages.filter((stage, index, self) =>
            index === self.findIndex((s) => s.id === stage.id)
        );
    } catch (error) {
        console.error('Error fetching evolution chain:', error);
        return [];
    }
}


export const getPokemonData = async (nameOrId: string): Promise<PokemonData> => {
  const pokemonResponse = await fetch(`${API_BASE_URL}/pokemon/${nameOrId}`);
  if (!pokemonResponse.ok) {
    throw new Error(`Pokémon with name or ID "${nameOrId}" not found`);
  }
  const pokemon: Pokemon = await pokemonResponse.json();

  let description = 'No description available.';
  let evolutionChain: EvolutionStage[] = [];
  let generation = 'Unknown';

  try {
    const speciesResponse = await fetch(`${API_BASE_URL}/pokemon-species/${pokemon.id}`);
    if (speciesResponse.ok) {
      const species: PokemonSpecies = await speciesResponse.json();

      const englishFlavorText = species.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );
      
      if (englishFlavorText) {
          description = englishFlavorText.flavor_text.replace(/[\n\f]/g, ' ');
      }
      
      if (species.generation?.name) {
        generation = species.generation.name
          .replace('generation-', 'Gen ')
          .toUpperCase();
      }

      if (species.evolution_chain?.url) {
        evolutionChain = await fetchEvolutionChain(species.evolution_chain.url);
      }
    } else {
        console.warn(`Could not fetch species data for ${pokemon.name}: Status ${speciesResponse.status}`);
    }
  } catch (error) {
    console.warn(`Could not fetch species data for ${pokemon.name}:`, error);
  }

  return {
    ...pokemon,
    description,
    evolutionChain,
    generation,
  };
};