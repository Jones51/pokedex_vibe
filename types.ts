export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
    };
  }[];
}

export interface EvolutionStage {
  id: string;
  name: string;
  imageUrl: string;
}

export interface PokemonSpecies {
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
  evolution_chain: {
    url: string;
  };
  generation: {
    name: string;
    url: string;
  };
}

export interface PokemonData extends Pokemon {
  description: string;
  evolutionChain: EvolutionStage[];
  generation: string;
}

export interface GenerationListItem {
    name: string;
    url: string;
}

export interface Generation {
    id: number;
    name: string;
    main_region: {
        name: string;
    };
    pokemon_species: PokemonListItem[];
}