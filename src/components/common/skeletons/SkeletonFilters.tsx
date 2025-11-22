import React from 'react';
import Skeleton from 'react-loading-skeleton';

// Filter-specific skeleton components
export const SkeletonFilterSearch: React.FC = () => {
    return <Skeleton height={46} containerClassName="skeleton-search" />;
};

export const SkeletonFilterDropdown: React.FC = () => {
    return <Skeleton height={46} containerClassName="skeleton-dropdown" />;
};

export const SkeletonFilterCheckbox: React.FC = () => {
    return <Skeleton width={20} height={20} />;
};

export const SkeletonFilterLabel: React.FC<{ width?: number }> = ({ width = 200 }) => {
    return <Skeleton width={width} height={20} />;
};
