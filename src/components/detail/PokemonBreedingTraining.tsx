import React from 'react';
import type { IPokemonSpecies } from '../../models/pokemon.model';
import Skeleton from 'react-loading-skeleton';

interface PokemonBreedingTrainingProps {
    species: IPokemonSpecies;
}

const PokemonBreedingTraining: React.FC<PokemonBreedingTrainingProps> = ({ species }) => {
    // Don't render if species data is missing
    if (!species) {
        return null;
    }

    // Calculate gender ratio
    const genderRatio = species.gender_rate;
    const femalePercent = genderRatio === -1 ? null : (genderRatio / 8) * 100;
    const malePercent = genderRatio === -1 ? null : ((8 - genderRatio) / 8) * 100;

    return (
        <div className="container__detail-card-info-breeding">
            <h2>Breeding & Training</h2>

            <div className="breeding-training-grid">
                {/* Egg Groups */}
                <div className="breeding-item">
                    <span className="label">Egg Groups</span>
                    <span className="value">
                        {species.egg_groups.map(eg => eg.name).join(', ') || 'Undiscovered'}
                    </span>
                </div>

                {/* Gender Ratio */}
                <div className="breeding-item">
                    <span className="label">Gender Ratio</span>
                    <span className="value">
                        {genderRatio === -1 ? (
                            'Genderless'
                        ) : (
                            <>
                                <span style={{ color: '#0088cc' }}>♂ {malePercent?.toFixed(1)}%</span>
                                {' / '}
                                <span style={{ color: '#ff69b4' }}>♀ {femalePercent?.toFixed(1)}%</span>
                            </>
                        )}
                    </span>
                </div>

                {/* Hatch Cycles */}
                <div className="breeding-item">
                    <span className="label">Hatch Cycles</span>
                    <span className="value">{species.hatch_counter}</span>
                </div>

                {/* Capture Rate */}
                <div className="breeding-item">
                    <span className="label">Capture Rate</span>
                    <span className="value">{species.capture_rate}</span>
                </div>

                {/* Base Happiness */}
                <div className="breeding-item">
                    <span className="label">Base Happiness</span>
                    <span className="value">{species.base_happiness}</span>
                </div>

                {/* Growth Rate */}
                <div className="breeding-item">
                    <span className="label">Growth Rate</span>
                    <span className="value" style={{ textTransform: 'capitalize' }}>
                        {species.growth_rate.name.replace('-', ' ')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export const PokemonBreedingTrainingSkeleton = () => (
    <div className="container__detail-card-info-breeding">
        <Skeleton height={24} width={200} style={{ marginBottom: '16px' }} />
        <div className="breeding-training-grid">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="breeding-item">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={120} height={16} />
                </div>
            ))}
        </div>
    </div>
);

export default PokemonBreedingTraining;
