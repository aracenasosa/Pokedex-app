import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
    message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner-content">
                <div className="loading-spinner" aria-label="Loading"></div>
                <p className="loading-spinner-text">{message}</p>
            </div>
        </div>
    );
};
