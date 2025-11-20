import React from 'react'
import pokeballIcon from "../../assets/pokeball.svg";
import type { IPokemonDetails } from '../../models/pokemon.model';

interface INavPokemonProps {
    data: IPokemonDetails,
    className: string
}

const NavPokemon:React.FC<INavPokemonProps> = ({className}) => {
  return (
     <section className={`container__detail-bg ${className}`}>
        <img src={pokeballIcon} alt="pokeball" className="container__detail-bg-pokeball" />
      </section>
  )
}

export default NavPokemon

