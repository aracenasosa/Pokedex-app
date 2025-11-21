// components/common/NotFound.tsx
import React from 'react';

type NotFoundProps = {
  id: number | string;
  message?: string;
};

export const NotFoundScreen: React.FC<NotFoundProps> = ({ id, message }) => {
  const fallbackMessage = `The Pokémon with id "${id ?? 'unknown'}" doesn't exist.`;
  return (
    <div className="notfound">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Poké Ball"
        className="notfound__image"
      />
      <h2>Pokémon not found</h2>
      <p>{message ?? fallbackMessage}</p>
    </div>
  );
};

