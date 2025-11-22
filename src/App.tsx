// App.tsx
import "./App.scss";
import Header from "./components/list/Header";
import Filters from "./components/list/Filters";
import PokemonList from "./components/list/PokemonList";
import { useEffect, useMemo, useRef, useState } from "react";
import type { InfiniteData } from "@tanstack/react-query";

import type { IPokemon, PokemonResults } from "./models/pokemon.model";
import {
  useInfiniteAllPokemons,
  useInfiniteTypePokemons,
  usePokemonDetails,
} from "./shared/hooks/tanstackQueries";
import { NotFoundScreen } from "./components/common/NotFound";
import { API_URL } from "./shared/constants/constants";

function App() {
  const [type, setType] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const typeKey = type.trim().toLowerCase();
  const hasType = typeKey.length > 0;

  // Infinite sources
  const allQ = useInfiniteAllPokemons();
  const typeQ = useInfiniteTypePokemons(typeKey);
  const active = hasType ? typeQ : allQ;
  const activeData = hasType ? typeQ.data : allQ.data;

  // Flatten pages into a single IPokemon-like object for PokemonList
  const pages =
    (activeData as InfiniteData<IPokemon> | undefined)?.pages ?? [];
  const flatResults = pages.flatMap((p: any) => p.results);
  const totalResults = pages[0]?.count ?? 0;

  // Check if we're in initial loading state (no data yet)
  const isInitialLoading = active.isPending && flatResults.length === 0;

  // ---------------- Search (kept as you had it) ----------------
  const {
    data: pokemonDetails,
    isPending: detailPending,
    isError: detailError,
    error: detailErr,
  } = usePokemonDetails(search);

  const searching = search.trim().length > 0;
  const notFound = detailError && (detailErr as any)?.status === 404;

  const pokemonSearched: PokemonResults[] = useMemo(() => {
    if (!pokemonDetails) return [];
    return [
      {
        name: pokemonDetails.name,
        url: `${API_URL}/pokemon/${pokemonDetails.id}/`,
      },
    ];
  }, [pokemonDetails]);

  const resultsCount = useMemo(() => {
    if (searching) {
      if (detailPending || notFound) return 0;
      return pokemonDetails ? 1 : 0;
    }
    return flatResults.length;
  }, [searching, detailPending, notFound, pokemonDetails, flatResults]);

  // ---------------- Infinite scroll sentinel (guard + debounce) ----------------
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false); // guard to avoid duplicate fetches

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // If an observer is already attached, disconnect it before creating a new one
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    let debounceTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (
          entry.isIntersecting &&
          !loadingRef.current &&
          active.hasNextPage &&
          !active.isFetchingNextPage
        ) {
          loadingRef.current = true; // lock while we fetch (prevents double fire)
          active.fetchNextPage().finally(() => {
            // small debounce before allowing the next call
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              loadingRef.current = false;
            }, 500);
          });
        }
      },
      { rootMargin: "400px 0px" } // start prefetching a bit before the bottom
    );

    observer.observe(sentinel);
    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
      clearTimeout(debounceTimer);
    };
  }, [active.hasNextPage, active.isFetchingNextPage, active.fetchNextPage]);

  return (
    <>
      <Header />
      <main className="container">
        <Filters
          setType={setType}
          type={type}
          search={search}
          setSearch={setSearch}
          resultsCount={resultsCount}
          totalResults={totalResults}
          isLoading={isInitialLoading}
        />

        {searching ? (
          detailPending ? (
            <p>Loading…</p>
          ) : notFound ? (
            <NotFoundScreen id={search} />
          ) : detailError ? (
            <p>{detailErr?.message ?? "Something went wrong"}</p>
          ) : (
            <PokemonList
              pokemonsList={{
                count: 1,
                next: "",
                previous: "",
                results: pokemonSearched,
              }}
            />
          )
        ) : (
          <>
            <PokemonList
              pokemonsList={{
                count: totalResults,
                next: "",
                previous: "",
                results: flatResults,
              }}
              loadingMore={isInitialLoading}
            />

            <div
              aria-live="polite"
              style={{ textAlign: "center", padding: "1rem 0" }}
            >
              {active.isFetchingNextPage && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid #ccc",
                      borderTopColor: "#3b82f6",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  <small>Loading more Pokémon…</small>
                </div>
              )}
              {!active.hasNextPage && flatResults.length > 0 && (
                <small>You’re all caught up!</small>
              )}
            </div>

            {/* sentinel triggers the next page when near the bottom */}
            {active.hasNextPage && (
              <div ref={sentinelRef} style={{ height: 1 }} />
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
