import type { IPokemonEvolutionChain, IPokemon, IPokemonDetails, IPokemonSpecies, IPokemonTypes } from "../models/pokemon.model";
import { API_URL } from "../shared/constants/constants";
import { delay } from "../shared/helpers/helpers";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function getJSON<T>(url: string, addDelay: boolean = false, delayTime: number = 3000): Promise<T> {
  // Add 3 second delay for detail page requests (testing skeletons)
  if (addDelay) {
    await delay(delayTime);
  }

  const res = await fetch(url);
  if (!res.ok) {
    const msg = res.status === 404 ? "Not found" : "Request failed";
    throw new ApiError(res.status, msg);
  }
  return res.json() as Promise<T>;
}

export const getPokemons = (limit = 24, offset = 0) =>
  getJSON<IPokemon>(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`, false, 3000);

export const getPokemonsByType = (type: string) =>
  getJSON<IPokemonTypes>(`${API_URL}/type/${type.trim().toLowerCase()}`, false, 3000);

export const getPokemonDetails = (pokemon: string | number) =>
  getJSON<IPokemonDetails>(`${API_URL}/pokemon/${String(pokemon).trim().toLowerCase()}`, false, 3000);

export const getPokemonSpecies = (pokemon: string | number) =>
  getJSON<IPokemonSpecies>(`${API_URL}/pokemon-species/${String(pokemon).trim().toLowerCase()}`, false, 3000);

export const getPokemonEvolutionChain = (pokemon: string | number) =>
  getJSON<IPokemonEvolutionChain>(`${API_URL}/evolution-chain/${String(pokemon).trim().toLowerCase()}`, false, 3000);

