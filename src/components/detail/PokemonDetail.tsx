// components/detail/PokemonDetail.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  usePokemonDetails,
  usePokemonEvolutionChain,
  usePokemonSpecies,
} from "../../shared/hooks/tanstackQueries";
import {
  englishFlavorText,
  getEvolutionList,
  getIdFromUrl,
} from "../../shared/hooks/pokemonHelper";
import type { IEvolutionChainFunction } from "../../models/pokemon.model";
import NavPokemon from "./NavPokemon";
import PokemonTypes from "./PokemonTypes";
import PokemonInfo from "./PokemonInfo";
import PokemonStats from "./PokemonStats";
import PokemonEvolutions from "./PokemonEvolutions";
import PokemonTypeEffectiveness from "./PokemonTypeEffectiveness";
import PokemonBreedingTraining, { PokemonBreedingTrainingSkeleton } from "./PokemonBreedingTraining";
import PokemonAdditionalInfo, { PokemonAdditionalInfoSkeleton } from "./PokemonAdditionalInfo";
import { NotFoundScreen } from "../common/NotFound";
import type { ApiError } from "../../services/pokemon.service";
import { Link } from "react-router";
import CountUp from "react-countup";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import backToHomeIcon from "../../assets/back-to-home.svg";
import leftIcon from "../../assets/chevron_left.svg";
import rightIcon from "../../assets/chevron_right.svg";
import "./PokemonDetail.scss";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = React.useState(false);

  const numericId = Number(id ?? 0);

  // Scroll to top whenever the Pokemon ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const { data, isPending, isError, error } = usePokemonDetails(
    numericId
  );
  const {
    data: species,
    isPending: isPendingSpecies,
    isError: isErrorSpecies,
  } = usePokemonSpecies(numericId);

  // Compute evolution chain ID (hooks must be called unconditionally)
  const evolutionChainId = species?.evolution_chain?.url
    ? getIdFromUrl(species.evolution_chain.url)
    : 0;
  const {
    data: evolution,
    isPending: isPendingEvolution,
  } = usePokemonEvolutionChain(evolutionChainId);

  // Navigation handlers
  const handlePrevious = () => {
    if (numericId > 1) {
      navigate(`/pokemon/${numericId - 1}`);
    }
  };

  const handleNext = () => {
    if (numericId < 10303) {
      navigate(`/pokemon/${numericId + 1}`);
    }
  };

  const isFirst = numericId <= 1;
  const isLast = numericId >= 10303;

  // Only show not found if pokemon detail request fails (not species)
  if (isError) {
    const err = error as ApiError;
    const is404 = err.status === 404;
    return (
      <NotFoundScreen
        id={numericId}
        message={is404 ? `That Pokemon with the ID: ${numericId} doesn't map to any known Pokémon.` : "Something went wrong. Please try again."}
      />
    );
  }

  // If we got here and still lack pokemon detail data, treat as not found (defensive)
  // But show skeleton while loading
  if (!data && isPending) {
    // Show skeleton for the entire page while main data loads
    return (
      <main className="container__detail">
        <div className="container__detail-header">
          <Link to="/" className="container__detail-header-back">
            <img src={backToHomeIcon} alt="back" />
          </Link>
          <h1 className="container__detail-header-title">
            <Skeleton width={200} height={32} />
          </h1>
        </div>
        <div className="container__detail-sprite">
          <Skeleton width={300} height={300} circle style={{ margin: '0 auto' }} />
        </div>
        <section className="container__detail-card">
          <div className="container__detail-card-inner">
            <div className="container__detail-types">
              <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
              <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
            </div>
            <section className="container__detail-card-info">
              <div className="container__detail-card-info-first">
                <Skeleton count={4} height={60} style={{ marginBottom: '16px' }} />
              </div>
              <Skeleton height={100} style={{ marginBottom: '16px' }} />
              <Skeleton count={7} height={40} style={{ marginBottom: '8px' }} />
            </section>
          </div>
        </section>
      </main>
    );
  }

  // If we got here and still lack pokemon detail data, treat as not found (defensive)
  if (!data) {
    return <NotFoundScreen id={numericId} message="Not found" />;
  }

  // Check if species data is available (it's optional)
  const hasSpecies = !isErrorSpecies && species;

  const defaultImg: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  const fallbackImg = "/pokemon-not-found.png";

  const mainImg: string = imageError
    ? fallbackImg
    : (data?.sprites?.other?.dream_world?.front_default ?? defaultImg);

  const pokemonTypes = data?.types ? data?.types : [];
  const primaryType = data?.types?.[0]?.type?.name ?? "all";
  const typeClass = `${primaryType}-bg-detail`;

  const evolutionChain: IEvolutionChainFunction[] | [] = evolution ? getEvolutionList(evolution) : [];

  return (
    <main className="container__detail">
      <NavPokemon data={data} className={typeClass} />

      {/* Header above sprite */}
      <div className="container__detail-header">
        <Link to="/" className="container__detail-header-back">
          <img src={backToHomeIcon} alt="back" />
        </Link>
        <h1 className="container__detail-header-title">
          {isPending ? (
            <Skeleton width={200} height={32} />
          ) : (
            <>
              {data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1)}
              <CountUp
                start={0}
                end={data?.id}
                formattingFn={(n) => `#${n.toString().padStart(3, '0')}`}
                className="container__detail-header-title-count"
              />
            </>
          )}
        </h1>
      </div>

      {/* ONE sprite, centered and overlapping */}
      <div className="container__detail-sprite">
        {/* Navigation arrows on either side of the sprite */}
        <button
          className={`container__detail-nav prev ${isFirst ? 'disabled' : ''}`}
          aria-label="Previous"
          onClick={handlePrevious}
          disabled={isFirst}
        >
          <img src={leftIcon} alt="previous" />
        </button>

        {isPending ? (
          <Skeleton width={300} height={300} circle style={{ margin: '0 auto' }} />
        ) : (
          <img
            src={mainImg}
            alt="pokemon"
            onError={() => setImageError(true)}
          />
        )}

        <button
          className={`container__detail-nav next ${isLast ? 'disabled' : ''}`}
          aria-label="Next"
          onClick={handleNext}
          disabled={isLast}
        >
          <img src={rightIcon} alt="next" />
        </button>
      </div>

      {/* Auto-height, centered details card */}
      <section className="container__detail-card">
        <div className="container__detail-card-inner">

          {isPending ? (
            <div className="container__detail-types">
              <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
              <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
            </div>
          ) : (
            <PokemonTypes pokemonTypes={pokemonTypes} />
          )}

          <section className="container__detail-card-info">

            {isPending ? (
              <div className="container__detail-card-info-first">
                <Skeleton count={4} height={60} style={{ marginBottom: '16px' }} />
              </div>
            ) : (
              <PokemonInfo data={data} species={hasSpecies ? species : undefined} />
            )}

            {/* Only show Pokédex Entry if species data is available */}
            {isPendingSpecies ? (
              <div className="container__detail-card-info-second">
                <Skeleton height={20} width={150} style={{ marginBottom: '8px' }} />
                <Skeleton count={3} height={16} />
              </div>
            ) : hasSpecies && (
              <div className="container__detail-card-info-second">
                <h2>Pokédex Entry</h2>
                <p>{englishFlavorText(species)}</p>
              </div>
            )}

            {isPending ? (
              <div className="container__detail-card-info-third">
                <Skeleton height={24} width={120} style={{ marginBottom: '16px' }} />
                <Skeleton count={7} height={40} style={{ marginBottom: '8px' }} />
              </div>
            ) : (
              <PokemonStats data={data} />
            )}

            {/* Evolution Section - Moved above Type Effectiveness */}
            {isPendingEvolution || isPendingSpecies ? (
              <div className="container__detail-card-info-four">
                <Skeleton height={24} width={120} style={{ marginBottom: '16px' }} />
                <div className="container__detail-card-info-four-container">
                  <Skeleton width={80} height={80} circle style={{ margin: '0 8px' }} />
                  <Skeleton width={40} height={20} style={{ margin: '0 8px' }} />
                  <Skeleton width={80} height={80} circle style={{ margin: '0 8px' }} />
                </div>
              </div>
            ) : evolutionChain.length > 0 && (
              <PokemonEvolutions evolutionChain={evolutionChain} />
            )}

            {/* Type Effectiveness Section */}
            {!isPending && pokemonTypes.length > 0 && (
              <PokemonTypeEffectiveness pokemonTypes={pokemonTypes} />
            )}

            {/* Breeding & Training Section */}
            {isPendingSpecies ? (
              <PokemonBreedingTrainingSkeleton />
            ) : hasSpecies && (
              <PokemonBreedingTraining species={species} />
            )}

            {/* Additional Info Section */}
            {isPendingSpecies ? (
              <PokemonAdditionalInfoSkeleton />
            ) : hasSpecies && (
              <PokemonAdditionalInfo species={species} />
            )}

          </section>
        </div>
      </section>
    </main>
  );
}

