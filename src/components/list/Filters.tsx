import { debounce } from "lodash";
import { useEffect, useMemo } from "react";
import CountUp from "react-countup";
import "./PokemonList.scss";

interface FilterProps {
  type: string;
  setType: (type: string) => void;
  search: string;
  setSearch: (search: string) => void;
  resultsCount: number;
  totalResults: number;
}

const TYPES = [
  { key: "", label: "All" },
  { key: "normal", label: "Normal" },
  { key: "fire", label: "Fire" },
  { key: "water", label: "Water" },
  { key: "electric", label: "Electric" },
  { key: "grass", label: "Grass" },
  { key: "ice", label: "Ice" },
  { key: "fighting", label: "Fighting" },
  { key: "poison", label: "Poison" },
  { key: "ground", label: "Ground" },
  { key: "flying", label: "Flying" },
  { key: "psychic", label: "Psychic" },
  { key: "bug", label: "Bug" },
  { key: "rock", label: "Rock" },
  { key: "ghost", label: "Ghost" },
  { key: "dragon", label: "Dragon" },
  { key: "dark", label: "Dark" },
  { key: "steel", label: "Steel" },
  { key: "fairy", label: "Fairy" },
];

// ...imports and TYPES unchanged

const Filters: React.FC<FilterProps> = ({ type, setType, search, setSearch, resultsCount, totalResults }) => {
  const debouncedSetSearch = useMemo(
    () => debounce((v: string) => setSearch(v), 500),
    [setSearch]
  );
  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetSearch(e.target.value.toLowerCase());

  return (
    <section className="container__filter">
      <div className="container__filter-bar">
        <div className="container__filter-bar-top">
          <div className="container__filter-search">
            <label htmlFor="pokedex-search" className="sr-only">
              Search
            </label>
            <input
              id="pokedex-search"
              className="container__filter-searchInput"
              type="search"
              placeholder="Search by name or Pokédex #"
              defaultValue={search}
              onChange={onChange}
              aria-label="Search Pokémon by name or number"
              autoComplete="off"
            />
          </div>
        </div>

        <div
          className="container__filter-types"
          role="tablist"
          aria-label="Type filters"
        >
          {TYPES.map(({ key, label }) => {
            const isActive = type === key;
            const cls = `container__filter-types-btn ${key || "all"} ${
              isActive ? "is-active" : ""
            }`;
            return (
              <button
                key={key || "all"}
                type="button"
                className={cls}
                aria-selected={isActive}
                onClick={() => setType(key)}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="container__filter-results">
          <p>
            Showing
            <span>
              <CountUp start={0} end={resultsCount} />
            </span>{" "}
            of
            <span>
              <CountUp start={0} end={totalResults} />
            </span>
            Pokémon{resultsCount !== 1 && "s"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Filters;

