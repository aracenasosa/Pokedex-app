import { useMemo, useState } from "react";
import { Link } from "react-router";

interface ISpritePros { id: number; name: string, alt: string; className?: string }

const spriteSources = (id: number) => [
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${id}.png`,
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
];

export function Sprite({ id, name, alt, className }: ISpritePros) {
  const urls = useMemo(() => spriteSources(id), [id]);
  const [idx, setIdx] = useState(0);

  return (
    <Link to={`/pokemon/${id}`} className={className}>
      {idx < urls.length ? (
        <img
          src={urls[idx]}
          alt={alt}
          onError={() =>
            setIdx((prev) => (prev < urls.length - 1 ? prev + 1 : prev))
          }
        />
      ) : (
        <div className="sprite__placeholder">No image</div>
      )}
      <p>{name}</p>
    </Link>
  );
}

