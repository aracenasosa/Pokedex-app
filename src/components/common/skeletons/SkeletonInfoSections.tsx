import React from 'react';
import Skeleton from 'react-loading-skeleton';

// Generic grid skeleton for breeding/additional info sections
interface SkeletonInfoGridProps {
    itemCount?: number;
    titleWidth?: number;
    className?: string;
}

export const SkeletonInfoGrid: React.FC<SkeletonInfoGridProps> = ({
    itemCount = 6,
    titleWidth = 200,
    className = 'breeding-training-grid',
}) => {
    return (
        <div>
            <Skeleton height={24} width={titleWidth} style={{ marginBottom: '16px' }} />
            <div className={className}>
                {Array.from({ length: itemCount }).map((_, i) => (
                    <div key={i} className={className === 'breeding-training-grid' ? 'breeding-item' : 'additional-item'}>
                        <Skeleton width={100} height={16} />
                        <Skeleton width={120} height={16} />
                    </div>
                ))}
            </div>
        </div>
    );
};

// Specific skeleton for Breeding & Training section
export const SkeletonBreedingInfo: React.FC = () => {
    return (
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
};
// Specific skeleton for Additional Info section
export const SkeletonAdditionalDetails: React.FC = () => {
    return (
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
};
