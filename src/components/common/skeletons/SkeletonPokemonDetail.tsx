import React from 'react';
import Skeleton from 'react-loading-skeleton';

// Pokemon Detail Header (name, image, types)
export const SkeletonPokemonDetailHeader: React.FC = () => {
    return (
        <>
            <Skeleton width={200} height={32} />
            <Skeleton width={300} height={300} circle style={{ margin: '0 auto' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
                <Skeleton width={80} height={32} style={{ borderRadius: '999px', margin: '0 4px' }} />
            </div>
        </>
    );
};

// Pokemon Detail Info Cards (height, weight, abilities, moves)
interface SkeletonPokemonDetailInfoCardsProps {
    cardCount?: number;
}

export const SkeletonPokemonDetailInfoCards: React.FC<SkeletonPokemonDetailInfoCardsProps> = ({ cardCount = 4 }) => {
    return (
        <div className="container__detail-card-info-first">
            <Skeleton count={cardCount} height={60} style={{ marginBottom: '16px' }} />
        </div>
    );
};
