// components/list/Header.tsx
import React from "react";
import logoPokedex from '../../assets/img/logo.png'
import "./PokemonList.scss";

type IHeaderProps = {

};

const Header: React.FC<IHeaderProps> = () => {

    return (
        <header className="container__header">
            <nav>
                <img  src={logoPokedex} alt="Pokédex Logo"/>
            </nav>
        </header>
    );
};

export default Header;

