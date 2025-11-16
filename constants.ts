export interface AppTheme {
  background: string;
  header: string;
  accent: {
    focus: string;
    buttonHover: string;
  };
}

export const DEFAULT_THEME: AppTheme = {
    background: 'bg-gray-100 dark:bg-gray-900',
    header: 'bg-red-600 dark:bg-red-800', // Default header is red like Pokeball
    accent: {
        focus: 'focus:border-red-500 focus:ring-1 focus:ring-red-500',
        buttonHover: 'hover:text-red-500',
    },
};

export const THEME_COLORS: { [key: string]: AppTheme } = {
  normal: {
    background: 'bg-gray-100 dark:bg-gray-800',
    header: 'bg-gray-500 dark:bg-gray-600',
    accent: { focus: 'focus:border-gray-500 focus:ring-1 focus:ring-gray-500', buttonHover: 'hover:text-gray-500' }
  },
  fire: {
    background: 'bg-red-50 dark:bg-red-900/50',
    header: 'bg-red-600 dark:bg-red-700',
    accent: { focus: 'focus:border-red-500 focus:ring-1 focus:ring-red-500', buttonHover: 'hover:text-red-500' }
  },
  water: {
    background: 'bg-blue-50 dark:bg-blue-900/50',
    header: 'bg-blue-500 dark:bg-blue-600',
    accent: { focus: 'focus:border-blue-500 focus:ring-1 focus:ring-blue-500', buttonHover: 'hover:text-blue-500' }
  },
  electric: {
    background: 'bg-yellow-50 dark:bg-yellow-900/50',
    header: 'bg-yellow-400 dark:bg-yellow-500',
    accent: { focus: 'focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400', buttonHover: 'hover:text-yellow-400' }
  },
  grass: {
    background: 'bg-green-50 dark:bg-green-900/50',
    header: 'bg-green-600 dark:bg-green-700',
    accent: { focus: 'focus:border-green-600 focus:ring-1 focus:ring-green-600', buttonHover: 'hover:text-green-600' }
  },
  ice: {
    background: 'bg-cyan-50 dark:bg-cyan-900/50',
    header: 'bg-cyan-400 dark:bg-cyan-500',
    accent: { focus: 'focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400', buttonHover: 'hover:text-cyan-400' }
  },
  fighting: {
    background: 'bg-orange-50 dark:bg-orange-900/50',
    header: 'bg-orange-700 dark:bg-orange-800',
    accent: { focus: 'focus:border-orange-700 focus:ring-1 focus:ring-orange-700', buttonHover: 'hover:text-orange-700' }
  },
  poison: {
    background: 'bg-purple-50 dark:bg-purple-900/50',
    header: 'bg-purple-600 dark:bg-purple-700',
    accent: { focus: 'focus:border-purple-600 focus:ring-1 focus:ring-purple-600', buttonHover: 'hover:text-purple-600' }
  },
  ground: {
    background: 'bg-yellow-50 dark:bg-yellow-900/60',
    header: 'bg-yellow-600 dark:bg-yellow-700',
    accent: { focus: 'focus:border-yellow-600 focus:ring-1 focus:ring-yellow-600', buttonHover: 'hover:text-yellow-600' }
  },
  flying: {
    background: 'bg-indigo-50 dark:bg-indigo-900/50',
    header: 'bg-indigo-400 dark:bg-indigo-500',
    accent: { focus: 'focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400', buttonHover: 'hover:text-indigo-400' }
  },
  psychic: {
    background: 'bg-pink-50 dark:bg-pink-900/50',
    header: 'bg-pink-500 dark:bg-pink-600',
    accent: { focus: 'focus:border-pink-500 focus:ring-1 focus:ring-pink-500', buttonHover: 'hover:text-pink-500' }
  },
  bug: {
    background: 'bg-lime-50 dark:bg-lime-900/50',
    header: 'bg-lime-500 dark:bg-lime-600',
    accent: { focus: 'focus:border-lime-500 focus:ring-1 focus:ring-lime-500', buttonHover: 'hover:text-lime-500' }
  },
  rock: {
    background: 'bg-stone-100 dark:bg-stone-800',
    header: 'bg-yellow-800 dark:bg-yellow-900',
    accent: { focus: 'focus:border-yellow-800 focus:ring-1 focus:ring-yellow-800', buttonHover: 'hover:text-yellow-800' }
  },
  ghost: {
    background: 'bg-indigo-50 dark:bg-indigo-900/60',
    header: 'bg-indigo-800 dark:bg-indigo-900',
    accent: { focus: 'focus:border-indigo-800 focus:ring-1 focus:ring-indigo-800', buttonHover: 'hover:text-indigo-800' }
  },
  dragon: {
    background: 'bg-violet-100 dark:bg-violet-900/50',
    header: 'bg-indigo-600 dark:bg-indigo-700',
    accent: { focus: 'focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600', buttonHover: 'hover:text-indigo-600' }
  },
  dark: {
    background: 'bg-neutral-200 dark:bg-neutral-800',
    header: 'bg-gray-800 dark:bg-gray-900',
    accent: { focus: 'focus:border-gray-800 focus:ring-1 focus:ring-gray-800', buttonHover: 'hover:text-gray-800' }
  },
  steel: {
    background: 'bg-slate-100 dark:bg-slate-800',
    header: 'bg-gray-500 dark:bg-gray-600',
    accent: { focus: 'focus:border-gray-500 focus:ring-1 focus:ring-gray-500', buttonHover: 'hover:text-gray-500' }
  },
  fairy: {
    background: 'bg-rose-50 dark:bg-rose-900/50',
    header: 'bg-pink-400 dark:bg-pink-500',
    accent: { focus: 'focus:border-pink-400 focus:ring-1 focus:ring-pink-400', buttonHover: 'hover:text-pink-400' }
  }
};


export const TYPE_COLORS: { [key: string]: string } = {
  normal: 'bg-gray-400 text-black',
  fire: 'bg-red-500 text-white',
  water: 'bg-blue-500 text-white',
  electric: 'bg-yellow-400 text-black',
  grass: 'bg-green-500 text-white',
  ice: 'bg-cyan-300 text-black',
  fighting: 'bg-orange-700 text-white',
  poison: 'bg-purple-600 text-white',
  ground: 'bg-yellow-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-black',
  rock: 'bg-yellow-700 text-white',
  ghost: 'bg-indigo-800 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-800 text-white',
  steel: 'bg-gray-500 text-white',
  fairy: 'bg-pink-300 text-black',
};

export const STAT_COLORS: { [key: string]: string } = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-green-500',
    speed: 'bg-pink-500',
};