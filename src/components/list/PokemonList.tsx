import React from "react";
import type { IPokemon } from "../../models/pokemon.model";
import PokemonCard from "./PokemonCard";
import "./PokemonList.scss";
import { SkeletonPokemonCard } from "../common/skeletons";

type PokemonListProps = {
  pokemonsList: IPokemon;
  loadingMore?: boolean;
  placeholderCount?: number;
};

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonsList,
  loadingMore = false,
  placeholderCount = 10,
}) => {
  return (
    <section className="container__main-list">
      {pokemonsList.results.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}

      {/* Bottom placeholders: keep the grid shape stable while fetching */}
      {loadingMore &&
        Array.from({ length: placeholderCount }).map((_, i) => (
          <SkeletonPokemonCard key={`ph-${i}`} />
        ))}
    </section>
  );
};

export default PokemonList;
