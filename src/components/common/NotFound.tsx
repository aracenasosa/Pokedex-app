// components/common/NotFound.tsx
import React from 'react';

export const NotFoundScreen: React.FC<{ id:number|string, message:string }> = ({ id, message }) => {
  return (
    <div className="notfound">
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
        alt="Poké Ball"
        className="notfound__image"
      />
      <h2>Pokémon not found</h2>
      <p>{message ?? `The Pokémon with id "${id ?? 'unknown'}" doesn't exist.`}</p>
    </div>
  );
};

