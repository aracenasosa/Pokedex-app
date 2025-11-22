import React from 'react'
import { Sprite } from '../common/Sprite';
import type { IEvolutionChainFunction } from '../../models/pokemon.model';

interface IPokemonEvolutionProps {
    evolutionChain: IEvolutionChainFunction[] | undefined | null
}

const PokemonEvolutions: React.FC<IPokemonEvolutionProps> = ({ evolutionChain }) => {
    return (
        <>
            {evolutionChain && evolutionChain.length > 0 && (
                <div className="container__detail-card-info-four">
                    <h2>Evolutions</h2>

                    <div className="container__detail-card-info-four-container">
                        {evolutionChain.map((curr, i) => {
                            const next = evolutionChain[i + 1]; // the evolution of `curr`
                            const label =
                                next
                                    ? next.level
                                        ? `Lv. ${next.level}`
                                        : next.special || null
                                    : null;

                            return (
                                <div
                                    key={curr.id}
                                    className="container__detail-card-info-four-container-item"
                                >
                                    <Sprite
                                        id={curr.id}
                                        name={curr.name}
                                        alt={`evolution-${curr.id}`}
                                        className="container__detail-card-info-four-container-item-evolution-img"
                                    />

                                    {/* connector with label only if there is a next evolution */}
                                    {next && (
                                        <div className="container__detail-card-info-four-container-connector">
                                            {label && (
                                                <span className="container__detail-card-info-four-container-badge">
                                                    {label}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default PokemonEvolutions

