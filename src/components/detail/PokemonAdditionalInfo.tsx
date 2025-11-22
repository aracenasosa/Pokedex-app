import React from 'react';
import type { IPokemonSpecies } from '../../models/pokemon.model';
import Skeleton from 'react-loading-skeleton';

interface PokemonAdditionalInfoProps {
    species: IPokemonSpecies;
}

const PokemonAdditionalInfo: React.FC<PokemonAdditionalInfoProps> = ({ species }) => {
    // Don't render if species data is missing
    if (!species) {
        return null;
    }

    // Get generation number from URL (e.g., "generation-i" -> "I")
    const genNumber = species.generation.name.split('-')[1]?.toUpperCase() || '';

    return (
        <div className="container__detail-card-info-additional">
            <h2>Additional Info</h2>

            <div className="additional-info-grid">
                {/* Generation */}
                <div className="additional-item">
                    <span className="label">Generation</span>
                    <span className="value">{genNumber}</span>
                </div>

                {/* Habitat */}
                {species.habitat && (
                    <div className="additional-item">
                        <span className="label">Habitat</span>
                        <span className="value" style={{ textTransform: 'capitalize' }}>
                            {species.habitat.name.replace('-', ' ')}
                        </span>
                    </div>
                )}

                {/* Shape */}
                {species.shape && (
                    <div className="additional-item">
                        <span className="label">Shape</span>
                        <span className="value" style={{ textTransform: 'capitalize' }}>
                            {species.shape.name}
                        </span>
                    </div>
                )}

                {/* Color */}
                <div className="additional-item">
                    <span className="label">Color</span>
                    <span className="value" style={{ textTransform: 'capitalize' }}>
                        {species.color.name}
                    </span>
                </div>

                {/* Special Classifications */}
                {(species.is_legendary || species.is_mythical || species.is_baby) && (
                    <div className="additional-item special">
                        <span className="label">Classification</span>
                        <div className="badges">
                            {species.is_legendary && <span className="classification-badge legendary">Legendary</span>}
                            {species.is_mythical && <span className="classification-badge mythical">Mythical</span>}
                            {species.is_baby && <span className="classification-badge baby">Baby</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export const PokemonAdditionalInfoSkeleton = () => (
    <div className="container__detail-card-info-additional">
        <Skeleton height={24} width={160} style={{ marginBottom: '16px' }} />
        <div className="additional-info-grid">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="additional-item">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={80} height={16} />
                </div>
            ))}
        </div>
    </div>
);

export default PokemonAdditionalInfo;
