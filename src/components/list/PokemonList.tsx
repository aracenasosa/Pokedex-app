// components/list/PokemonList.tsx
import React from "react";
import type { IPokemon } from "../../models/pokemon.model";
import PokemonCard from "./PokemonCard";
import Skeleton from "react-loading-skeleton";
import "./PokemonList.scss";

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
          <div key={`ph-${i}`} className="container__main-list-card">
            <div className="container__main-list-card-img">
              <Skeleton height={96} />
            </div>
            <div className="container__main-list-card-footer">
              <div className="container__main-list-card-footer-main">
                <Skeleton width={48} />
                <Skeleton width={90} />
              </div>
              <div className="container__main-list-card-footer-secondary">
                <div className="container__main-list-card-footer-secondary-types">
                  <Skeleton width={60} height={18} />
                  <Skeleton width={60} height={18} />
                </div>
                <div>
                  <Skeleton width={50} />
                  <Skeleton width={50} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default PokemonList;

