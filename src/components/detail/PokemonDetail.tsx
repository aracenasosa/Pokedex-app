// components/detail/PokemonDetail.tsx
import { useParams } from "react-router";
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
import { NotFoundScreen } from "../common/NotFound";
import type { ApiError } from "../../services/pokemon.service";
import { Link } from "react-router";
import CountUp from "react-countup";
import backToHomeIcon from "../../assets/back-to-home.svg";
import leftIcon from "../../assets/chevron_left.svg";
import rightIcon from "../../assets/chevron_right.svg";
import "./PokemonDetail.scss";

export default function PokemonDetail() {
  const { id } = useParams();

  const numericId = Number(id ?? 0);

  const { data, isPending, isError, error } = usePokemonDetails(
    numericId
  );
  const {
    data: species,
    isPending: isPendingSpecies,
    isError: isErrorSpecies,
    error: errorSpecies,
  } = usePokemonSpecies(numericId);
  const {
    data: evolution,
  } = usePokemonEvolutionChain(getIdFromUrl(species?.evolution_chain?.url ?? "0"));

  if (isError || isErrorSpecies) {
    const err = (error as ApiError) ?? (errorSpecies as ApiError);
    const is404 = err.status === 404;
    return (
      <NotFoundScreen
        id={numericId}
        message={is404 ? `That Pokemon with the ID: ${numericId} doesn't map to any known Pokémon.` : "Something went wrong. Please try again."}
      />
    );
  }

  // Loading state (any pending)
  if (isPending || isPendingSpecies) {
    return <p>Loading…</p>; // (replace with your skeleton if you have one)
  }

  // If we got here and still lack data, treat as not found (defensive)
  if (!data || !species) {
    return <NotFoundScreen id={numericId} message="Not found" />;
  }

  const defaultImg: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const mainImg: string =
    data?.sprites?.other?.dream_world?.front_default ?? defaultImg;

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
          {data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1)}
          <CountUp
            start={0}
            end={data?.id}
            formattingFn={(n) => `#${n.toString().padStart(3, '0')}`}
            className="container__detail-header-title-count"
          />
        </h1>
      </div>

      {/* Navigation arrows on far left and right edges */}
      <button className={`container__detail-nav prev ${data?.id === 1 && 'disabled'}`} aria-label="Previous">
        <Link to={`/pokemon/${(data?.id ?? 1) - 1}`}>
          <img src={leftIcon} alt="previous" />
        </Link>
      </button>

      <button className={`container__detail-nav next ${data?.id === 10303 && 'disabled'}`} aria-label="Next">
        <Link to={`/pokemon/${(data?.id ?? 1) + 1}`}>
          <img src={rightIcon} alt="next" />
        </Link>
      </button>

      {/* ONE sprite, centered and overlapping */}
      <div className="container__detail-sprite">
        <img src={mainImg} alt="pokemon" />
      </div>

      {/* Auto-height, centered details card */}
      <section className="container__detail-card">
        <div className="container__detail-card-inner">

          <PokemonTypes pokemonTypes={pokemonTypes} />

          <section className="container__detail-card-info">

            <PokemonInfo data={data} species={species} />

            <div className="container__detail-card-info-second">
              <h2>Pokédex Entry</h2>
              <p>{englishFlavorText(species)}</p>
            </div>

            <PokemonStats data={data} />

            <PokemonEvolutions evolutionChain={evolutionChain} />

          </section>
        </div>
      </section>
    </main>
  );
}

