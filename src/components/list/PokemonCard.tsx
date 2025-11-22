import React from "react";
import CountUp from "react-countup";
import type { IPokemonType, PokemonResults } from "../../models/pokemon.model";
import { usePokemonDetails } from "../../shared/hooks/tanstackQueries";
import Skeleton from 'react-loading-skeleton'
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { getPokemonDetails } from "../../services/pokemon.service";
import "./PokemonList.scss";

type PokemonProps = {
  pokemon: PokemonResults;
};

const PokemonCard: React.FC<PokemonProps> = ({ pokemon }) => {
  const part = pokemon.url.split("/");
  const id = parseInt(part[part.length - 2], 10); // make sure it's a number
  const [imageError, setImageError] = React.useState(false);

  const imgPokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const { data: pokemonDetails, isPending, isError, error } = usePokemonDetails(id);

  const qc = useQueryClient();
  const prefetch = () =>
    qc.prefetchQuery({
      queryKey: ["pokemonDetail", String(id)],
      queryFn: () => getPokemonDetails(id),
      staleTime: 5 * 60 * 1000, // cache 5 min
  });

  const fallbackImg = "/pokemon-not-found.png";

  return (
    <Link to={`/pokemon/${id}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={prefetch}
      onFocus={prefetch}
      // optional: pass a tiny preview for instant paint (not persistent):
      state={{ preview: { id, name: pokemon.name } }}
    >
      <div className="container__main-list-card">
        {isPending ? (
          <Skeleton 
            width={150} 
            height={60} 
            className="container__main-list-card-overlay"
            style={{ 
              position: 'absolute',
              top: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: -10,
              opacity: 0.3
            }}
          />
        ) : (
          <CountUp
            start={0}
            end={id}
            formattingFn={(n) => `#${n.toString().padStart(3, '0')}`}
            className="container__main-list-card-overlay"
          />
        )}
        <div className="container__main-list-card-img">
          {isPending ? (
            <Skeleton width={120} height={120} circle />
          ) : (
            <img src={imageError ? fallbackImg : imgPokemon} alt={pokemon.name}  onError={() => setImageError(true)}/>
          )}
        </div>
        <div className="container__main-list-card-footer">
          <div className="container__main-list-card-footer-main">
            <CountUp
              start={0}
              end={id}
              formattingFn={(n) => `#${n.toString().padStart(3, '0')}`}
            />
            <p title={pokemon.name}>{pokemon.name}</p>
          </div>
          {isPending ? (
            <p>
              <Skeleton count={2} height={15} width={120} />
            </p>
          ) : isError ? (
            <p>{error?.message}</p>
          ) : (
            <div className="container__main-list-card-footer-secondary">
              <div className="container__main-list-card-footer-secondary-types">
                {pokemonDetails?.types.length > 0 ? pokemonDetails?.types.map(({ type }: IPokemonType) =>
                  (<p key={type.name} className={`container__main-list-card-footer-secondary-types-${type.name}`}>{type.name}</p>))
                  :
                  <p>Not types</p>}
              </div>
              <div>
                <p>{pokemonDetails?.height ? (pokemonDetails?.height / 10) : 0}M</p>
                <p>{pokemonDetails?.weight ? (pokemonDetails?.weight / 10).toFixed(1) : 0}KG</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;

