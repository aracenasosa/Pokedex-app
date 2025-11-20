export type IPokemon = {
    count: number,
    next: string | null; 
  previous: string | null; 
    results: PokemonResults[],
}

export type PokemonResults = {
    name: string,
    url: string;
}

export interface LocalizedName {
  language: PokemonResults;
  name: string;
}

export interface GameIndex {
  game_index: number;
  generation: PokemonResults;
}

// Damage relations (current and past share this shape)
export interface DamageRelations {
  double_damage_from: PokemonResults[];
  double_damage_to: PokemonResults[];
  half_damage_from: PokemonResults[];
  half_damage_to: PokemonResults[];
  no_damage_from: PokemonResults[];
  no_damage_to: PokemonResults[];
}

export interface PastDamageRelation {
  damage_relations: DamageRelations;
  generation: PokemonResults;
}

export interface TypePokemonEntry {
  pokemon: PokemonResults;
  slot: number;
}

// Sprites object is a nested dictionary by generation/game, each with a name_icon URL.
// Keys vary by API (e.g., "generation-iii" → "colosseum"/"emerald"/...), so keep it flexible.
export interface TypeSprites {
  [generation: string]: {
    [game: string]: {
      name_icon: string;
    };
  };
}

// Root: call it pokemonTypes (as requested)
export interface IPokemonTypes {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: PokemonResults;
  id: number;
  move_damage_class: PokemonResults; // e.g., { name: "special", url: ... }
  moves: PokemonResults[];           // list of move resources
  name: string;                     // e.g., "fire"
  names: LocalizedName[];           // localized names
  past_damage_relations: PastDamageRelation[];
  pokemon: TypePokemonEntry[];      // Pokémon having this type
  sprites: TypeSprites;             // nested sprite name_icon URLs
}

export interface IPokemonType {
  slot: number;
  type: {
    name: string;
    url: string;  
  };
}

export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: Versions;
}

export interface OtherSprites {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: {
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
  "official-artwork": {
    front_default: string | null;
    front_shiny: string | null;
  };
  showdown: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
  };
}

export interface Versions {
  "generation-i": GenerationI;
  "generation-ii": GenerationII;
  "generation-iii": GenerationIII;
  "generation-iv": GenerationIV;
  "generation-v": GenerationV;
  "generation-vi": GenerationVI;
  "generation-vii": GenerationVII;
  "generation-viii": GenerationVIII;
}

// --- Generation I ---
export interface GenerationI {
  "red-blue": ClassicSprites;
  yellow: ClassicSprites;
}
export interface ClassicSprites {
  back_default: string | null;
  back_gray?: string | null;
  back_transparent?: string | null;
  front_default: string | null;
  front_gray?: string | null;
  front_transparent?: string | null;
}

// --- Generation II ---
export interface GenerationII {
  crystal: TransparentSprites;
  gold: TransparentSprites;
  silver: TransparentSprites;
}
export interface TransparentSprites {
  back_default: string | null;
  back_shiny?: string | null;
  back_transparent?: string | null;
  back_shiny_transparent?: string | null;
  front_default: string | null;
  front_shiny?: string | null;
  front_transparent?: string | null;
  front_shiny_transparent?: string | null;
}

// --- Generation III ---
export interface GenerationIII {
  emerald: BasicSprites;
  "firered-leafgreen": BasicSprites;
  "ruby-sapphire": BasicSprites;
}
export interface BasicSprites {
  back_default?: string | null;
  back_shiny?: string | null;
  front_default: string | null;
  front_shiny: string | null;
}

// --- Generation IV ---
export interface GenerationIV {
  "diamond-pearl": GenderedSprites;
  "heartgold-soulsilver": GenderedSprites;
  platinum: GenderedSprites;
}
export interface GenderedSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// --- Generation V ---
export interface GenerationV {
  "black-white": {
    animated: GenderedSprites;
  } & GenderedSprites;
}

// --- Generation VI ---
export interface GenerationVI {
  "omegaruby-alphasapphire": ShinySprites;
  "x-y": ShinySprites;
}
export interface ShinySprites {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

// --- Generation VII ---
export interface GenerationVII {
  icons: IconSprites;
  "ultra-sun-ultra-moon": ShinySprites;
}
export interface IconSprites {
  front_default: string | null;
  front_female: string | null;
}

// --- Generation VIII ---
export interface GenerationVIII {
  icons: IconSprites;
}

export type StatName = "hp" | "attack" | "defense" | "special-attack" | "special-defense" | "speed";

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: { name: StatName; url: string };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: PokemonSprites;

  types: IPokemonType[];

  abilities: PokemonAbility[];

  stats: PokemonStats[];

  species: {
    name: string;
    url: string;
  };
}

export type PageParam = {limit: number, offset: number};

// Shared small resource
export interface NamedAPIResource {
  name: string;
  url: string;
}

/** /pokemon-species/:id */
export interface IPokemonSpecies {
  base_happiness: number;
  capture_rate: number;

  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];

  evolution_chain: {
    url: string;
  };

  evolves_from_species: NamedAPIResource | null;

  flavor_text_entries: FlavorTextEntry[];

  form_descriptions: any[]; // always [] in many species; tighten if you use it
  forms_switchable: boolean;

  gender_rate: number;
  genera: GenusEntry[];

  generation: NamedAPIResource;
  growth_rate: NamedAPIResource;

  habitat: NamedAPIResource | null;

  has_gender_differences: boolean;
  hatch_counter: number;

  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;

  name: string;
  names: LocalizedName[];

  order: number;

  pal_park_encounters: PalParkEncounter[];

  pokedex_numbers: PokedexNumber[];

  shape: NamedAPIResource | null;

  varieties: PokemonVariety[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface GenusEntry {
  genus: string;
  language: NamedAPIResource;
}

export interface LocalizedName {
  language: NamedAPIResource;
  name: string;
}

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface IPokemonEvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: EvolutionChainLink;
}

/** Each node in the evolution chain */
export interface EvolutionChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

/** Conditions to evolve */
export interface EvolutionDetail {
  base_form_id: number | null;
  gender: number | null;
  held_item: NamedAPIResource | null;
  item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  region_id: number | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  trigger: NamedAPIResource;
  turn_upside_down: boolean;
}

export interface IEvolutionChainFunction { name: string; id: number; level: number | null; special: string | null }




