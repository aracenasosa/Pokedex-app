import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface SkeletonDetailSectionProps {
    titleWidth?: number;
    contentHeight?: number;
    contentCount?: number;
    hasMargin?: boolean;
}

export const SkeletonDetailSection: React.FC<SkeletonDetailSectionProps> = ({
    titleWidth = 120,
    contentHeight = 40,
    contentCount = 7,
    hasMargin = true,
}) => {
    return (
        <div style={{ marginBottom: hasMargin ? '50px' : '0' }}>
            <Skeleton height={24} width={titleWidth} style={{ marginBottom: '16px' }} />
            <Skeleton count={contentCount} height={contentHeight} style={{ marginBottom: '8px' }} />
        </div>
    );
};

// Specific variations for common patterns
export const SkeletonStats: React.FC = () => {
    return <SkeletonDetailSection titleWidth={120} contentHeight={40} contentCount={7} />;
};

export const SkeletonPokedexEntry: React.FC = () => {
    return (
        <div style={{ marginBottom: '20px' }}>
            <Skeleton height={20} width={150} style={{ marginBottom: '8px' }} />
            <Skeleton count={3} height={16} />
        </div>
    );
};

export const SkeletonEvolution: React.FC = () => {
    return (
        <div className="container__detail-card-info-four">
            <Skeleton height={24} width={120} style={{ marginBottom: '16px' }} />
            <div className="container__detail-card-info-four-container">
                <Skeleton width={80} height={80} circle style={{ margin: '0 8px' }} />
                <Skeleton width={40} height={20} style={{ margin: '0 8px' }} />
                <Skeleton width={80} height={80} circle style={{ margin: '0 8px' }} />
            </div>
        </div>
    );
};
