/**
 * Shared Models
 */
export interface NamedAPIResource {
  name: string;
  url: string;
}

export type PokemonResults = NamedAPIResource;

export interface LocalizedName {
  language: NamedAPIResource;
  name: string;
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

export interface PokedexNumber {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

/**
 * List Models
 */
export type IPokemon = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonResults[];
}

/**
 * Detail Models
 */
export interface IPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: IPokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStats[];
  species: NamedAPIResource;
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
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

/**
 * Species Models
 */
export interface IPokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: NamedAPIResource;
  egg_groups: NamedAPIResource[];
  evolution_chain: { url: string; };
  evolves_from_species: NamedAPIResource | null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
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

export interface PalParkEncounter {
  area: NamedAPIResource;
  base_score: number;
  rate: number;
}

/**
 * Evolution Models
 */
export interface IPokemonEvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource | null;
  chain: EvolutionChainLink;
}

export interface EvolutionChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionChainLink[];
}

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

export interface IEvolutionChainFunction {
  name: string;
  id: number;
  level: number | null;
  special: string | null;
}

/**
 * Type Models
 */
export interface IPokemonTypes {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: NamedAPIResource;
  id: number;
  move_damage_class: NamedAPIResource;
  moves: NamedAPIResource[];
  name: string;
  names: LocalizedName[];
  past_damage_relations: PastDamageRelation[];
  pokemon: TypePokemonEntry[];
  sprites: TypeSprites;
}

export interface IPokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface TypePokemonEntry {
  pokemon: NamedAPIResource;
  slot: number;
}

export interface DamageRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface PastDamageRelation {
  damage_relations: DamageRelations;
  generation: NamedAPIResource;
}

export interface GameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

export interface TypeSprites {
  [generation: string]: {
    [game: string]: {
      name_icon: string;
    };
  };
}
