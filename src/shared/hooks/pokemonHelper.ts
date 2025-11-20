import type { EvolutionChainLink, IEvolutionChainFunction, IPokemonEvolutionChain, IPokemonSpecies } from "../../models/pokemon.model";

export function englishFlavorText(pokemonSpecies: IPokemonSpecies | null | undefined) {
  if (pokemonSpecies) {
    for (let entry of pokemonSpecies.flavor_text_entries) {
      if (entry.language.name === "en") {
        let flavor = entry.flavor_text.replace(/\f/g, " ");
        return flavor;
      }
    }
  }
  return "N/A";
}

// Utility to get the Pokémon ID from the API URL
export const getIdFromUrl = (url: string): number =>
  Number(url.split("/").filter(Boolean).pop() || 0);

const titleCase = (s: string) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;

// Build a human-friendly description from evolution_details
function buildSpecial(detail: any): string | null {
  if (!detail) return null;

  const parts: string[] = [];

  // Item-based (e.g., stones)
  if (detail.item?.name) parts.push(`Use ${titleCase(detail.item.name.replace(/-/g, " "))}`);

  // Trade-based
  if (detail.trigger?.name === "trade") {
    if (detail.trade_species?.name) {
      parts.push(`Trade for ${titleCase(detail.trade_species.name)}`);
    } else {
      parts.push("Trade");
    }
  }

  // Held item requirement at time of evolution
  if (detail.held_item?.name) {
    parts.push(`Hold ${titleCase(detail.held_item.name.replace(/-/g, " "))}`);
  }

  // Known move / move type
  if (detail.known_move?.name) parts.push(`Know move ${titleCase(detail.known_move.name.replace(/-/g, " "))}`);
  if (detail.known_move_type?.name) parts.push(`Know a ${titleCase(detail.known_move_type.name)}-type move`);

  // Location
  if (detail.location?.name) parts.push(`At ${titleCase(detail.location.name.replace(/-/g, " "))}`);

  // Time of day
  if (detail.time_of_day) parts.push(`During ${titleCase(detail.time_of_day)}`);

  // Friendship / beauty / affection
  if (detail.min_happiness != null) parts.push(`High friendship (${detail.min_happiness}+)`);
  if (detail.min_beauty != null) parts.push(`High beauty (${detail.min_beauty}+)`);
  if (detail.min_affection != null) parts.push(`High affection (${detail.min_affection}+)`);

  // Weather / physical stats quirks
  if (detail.needs_overworld_rain) parts.push("While raining");
  if (detail.relative_physical_stats != null) {
    const rel = detail.relative_physical_stats;
    parts.push(rel > 0 ? "Atk > Def" : rel < 0 ? "Atk < Def" : "Atk = Def");
  }

  // Orientation
  if (detail.turn_upside_down) parts.push("Hold console upside down");

  // Gender gate
  if (detail.gender != null) parts.push(detail.gender === 1 ? "Female-only" : "Male-only");

  // Trigger fallback if nothing else was added but a trigger exists
  if (parts.length === 0 && detail.trigger?.name) {
    parts.push(titleCase(detail.trigger.name.replace(/-/g, " ")));
  }

  return parts.length ? parts.join(", ") : null;
}

/**
 * Returns a flat evolution list with level (if any) or a "special" condition.
 * Example:
 * [
 *   { name: "pikachu", id: 25, level: null, special: "Use Thunder stone" },
 *   { name: "raichu", id: 26, level: null, special: null }
 * ]
 */
export function getEvolutionList(
  chain: IPokemonEvolutionChain | undefined | null
): IEvolutionChainFunction[] {
  if (!chain) return [];

  const result: { name: string; id: number; level: number | null; special: string | null }[] = [];

  function traverse(node: EvolutionChainLink, level: number | null = null, special: string | null = null) {
    // Add current species
    result.push({
      name: node.species.name,
      id: getIdFromUrl(node.species.url),
      level,
      special,
    });

    // Process children
    for (const evo of node.evolves_to ?? []) {
      const detail = evo.evolution_details?.[0]; // typically length 1
      const nextLevel: number | null = detail?.min_level ?? null;
      const nextSpecial: string | null = nextLevel == null ? buildSpecial(detail) : null;
      traverse(evo, nextLevel, nextSpecial);
    }
  }

  // Base species has no level/special
  traverse(chain.chain, null, null);

  return result;
}