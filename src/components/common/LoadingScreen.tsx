// components/common/LoadingScreen.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const Loading: React.FC<{ lines?: number }> = ({ lines = 6 }) => {
  return (
    <div className="loading">
      <Skeleton count={lines} height={18} />
    </div>
  );
};

