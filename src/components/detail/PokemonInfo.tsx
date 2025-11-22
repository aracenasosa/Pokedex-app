import React from 'react'
import type { IPokemonDetails, IPokemonSpecies, PokemonAbility } from '../../models/pokemon.model'
import heighIcon from "../../assets/height.svg";
import weightIcon from "../../assets/weight.svg";

interface IPokemonInfoProps {
    data: IPokemonDetails,
    species: IPokemonSpecies | undefined;
}

const PokemonInfo: React.FC<IPokemonInfoProps> = ({ data, species }) => {
    return (
        <div className="container__detail-card-info-first">
            <div className="container__detail-card-info-first-container">
                <div>
                    <img src={weightIcon} alt="Height Icon Img" />
                    <span>
                        {data?.weight ? (data?.weight / 10).toFixed(1) : 0} kg
                    </span>
                </div>
                <p>Weight</p>
            </div>
            <div className="container__detail-card-info-first-container">
                <div>
                    <img src={heighIcon} alt="Height Icon Img" />
                    <span>{data?.height ? data?.height / 10 : 0} m</span>
                </div>
                <p>Height</p>
            </div>
            {/* Only show Moves if species data is available */}
            {species && (
                <div className="container__detail-card-info-first-container">
                    <div className="container__detail-card-info-first-container-move">
                        {data?.abilities.map((ab: PokemonAbility) => (
                            <span key={ab.ability.url}>{ab.ability.name}</span>
                        ))}
                    </div>
                    <p>Moves</p>
                </div>
            )}
        </div>
    )
}

export default PokemonInfo

