import React from 'react'
import type { IPokemonType } from '../../models/pokemon.model';

interface IPokemonTypesProps {
    pokemonTypes: IPokemonType[]
}

const PokemonTypes: React.FC<IPokemonTypesProps> = ({ pokemonTypes }) => {
    return (
        <div
            className="container__detail-types"
            role="tablist"
            aria-label="Type filters"
        >
            {pokemonTypes.map(({ type }) => {
                const cls = `container__detail-types-btn ${type?.name || "all"}`;
                return (
                    <button key={type?.name || "all"} type="button" className={cls}>
                        {type?.name}
                    </button>
                );
            })}
        </div>
    )
}

export default PokemonTypes

