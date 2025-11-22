import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonPokemonCard: React.FC = () => {
    return (
        <div className="container__main-list-card">
            <div className="container__main-list-card-header">
                <Skeleton height={96} />
            </div>

            <div className="container__main-list-card-main">
                <div className="container__main-list-card-main-info">
                    <Skeleton width={48} />
                    <Skeleton width={90} />
                </div>

                <div className="container__main-list-card-main-types">
                    <Skeleton width={60} height={18} />
                    <Skeleton width={60} height={18} />
                </div>

                <div className="container__main-list-card-main-stats">
                    <Skeleton width={50} />
                    <Skeleton width={50} />
                </div>
            </div>
        </div>
    );
};
