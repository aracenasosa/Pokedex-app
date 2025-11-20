// shared/hooks/pokemon.ts
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPokemons, getPokemonsByType, ApiError, getPokemonDetails, getPokemonSpecies, getPokemonEvolutionChain } from "../../services/pokemon.service";
import type { IPokemon, IPokemonDetails, IPokemonEvolutionChain, IPokemonSpecies, IPokemonTypes, PokemonResults } from "../../models/pokemon.model";

// page sizes
const FIRST_PAGE = 60;
const MORE_PAGE  = 40;

/** -------------------------------
 *  ALL POKEMON (server pagination)
 *  ------------------------------- */
interface AllPageParam { offset: number; limit: number; }

export const useInfiniteAllPokemons = () =>
  useInfiniteQuery<IPokemon, ApiError, IPokemon, [string, string], AllPageParam>({
    queryKey: ["pokemons", "all"],
    initialPageParam: { offset: 0, limit: FIRST_PAGE },
    queryFn: ({ pageParam }: { pageParam: AllPageParam }) =>
      getPokemons(pageParam.limit, pageParam.offset),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) return undefined; // API says there's no more
      const loaded = pages.reduce((n, p) => n + p.results.length, 0);
      return { offset: loaded, limit: MORE_PAGE };
    },
    // keep old infinite data visible while refetching/changing key
    placeholderData: (prev) => prev,
    staleTime: 60_000,
    // if you're on v4, rename gcTime -> cacheTime; either is harmless
    gcTime: 5 * 60_000 as any,
    retry: (count, err) => (err as ApiError).status !== 404 && count < 2,
  });

/** --------------------------------------------
 *  BY TYPE (single fetch + client-side slicing)
 *  -------------------------------------------- */
interface TypePageParam { start: number; size: number; }

export const useInfiniteTypePokemons = (typeKey: string) => {
  // fetch the full type once (gives you damage_relations, sprites, etc.)
  const typeQuery = useQuery<IPokemonTypes, ApiError>({
    queryKey: ["pokemonType", typeKey],
    queryFn: () => getPokemonsByType(typeKey),
    enabled: !!typeKey,
    placeholderData: (prev) => prev,
    staleTime: 60_000,
    gcTime: 5 * 60_000 as any,
  });

  // flatten to PokemonResults[]
  const all: PokemonResults[] =
    typeQuery.data?.pokemon.map(({ pokemon }) => pokemon) ?? [];

  return useInfiniteQuery<IPokemon, ApiError, IPokemon, [string, string, string], TypePageParam>({
    queryKey: ["pokemons", "type", typeKey],
    enabled: typeQuery.status === "success",
    initialPageParam: { start: 0, size: FIRST_PAGE },
    queryFn: async ({ pageParam }: { pageParam: TypePageParam }) => {
      const { start, size } = pageParam;
      const slice = all.slice(start, start + size);

      // return EXACTLY your IPokemon shape (strings for next/previous)
      return {
        count: all.length,
        next: start + size < all.length ? "client-next" : "",
        previous: start > 0 ? "client-prev" : "",
        results: slice,
      };
    },
    getNextPageParam: (_lastPage, pages) => {
      const loaded = pages.reduce((n, p) => n + p.results.length, 0);
      if (loaded >= all.length) return undefined;
      return { start: loaded, size: MORE_PAGE };
    },
    placeholderData: (prev) => prev,
    staleTime: 60_000,
    gcTime: 5 * 60_000 as any,
    retry: (count, err) => (err as ApiError).status !== 404 && count < 2,
  });
};

export const usePokemonDetails = (id: number) => {
  return useQuery<IPokemonDetails, ApiError>({
    queryKey: ["pokemonDetail", String(id).toLowerCase()],
    queryFn: () => getPokemonDetails(id),
    enabled: !!id,          // only run if a name or id is provided
    staleTime: 60_000,           // keep fresh for 1 minute
    gcTime: 5 * 60_000 as any,   // if you’re on v4, rename to cacheTime
    retry: (count, err) => (err as ApiError).status !== 404 && count < 2,
    placeholderData: (prev) => prev, // keep last details briefly while refetching
  });
};

export const usePokemonSpecies = (id: number) => {
  return useQuery<IPokemonSpecies, ApiError>({
    queryKey: ["pokemonSpecies", String(id).toLowerCase()],
    queryFn: () => getPokemonSpecies(id),
    enabled: !!id,          // only run if a name or id is provided
    staleTime: 60_000,           // keep fresh for 1 minute
    gcTime: 5 * 60_000 as any,   // if you’re on v4, rename to cacheTime
    retry: (count, err) => (err as ApiError).status !== 404 && count < 2,
    placeholderData: (prev) => prev, // keep last details briefly while refetching
  });
};

export const usePokemonEvolutionChain = (id: number) => {
  return useQuery<IPokemonEvolutionChain, ApiError>({
    queryKey: ["pokemonEvolutionChain", String(id).toLowerCase()],
    queryFn: () => getPokemonEvolutionChain(id),
    enabled: !!id,          // only run if a name or id is provided
    staleTime: 60_000,           // keep fresh for 1 minute
    gcTime: 5 * 60_000 as any,   // if you’re on v4, rename to cacheTime
    retry: (count, err) => (err as ApiError).status !== 404 && count < 2,
    placeholderData: (prev) => prev, // keep last details briefly while refetching
  });
};
