import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
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

import { POKEMON_TYPES } from "../../shared/constants/constants";

const Filters: React.FC<FilterProps> = ({ type, setType, search, setSearch, resultsCount, totalResults }) => {
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  const debouncedSetSearch = useMemo(
    () => debounce((v: string) => setSearch(v), 500),
    [setSearch]
  );
  useEffect(() => () => debouncedSetSearch.cancel(), [debouncedSetSearch]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    debouncedSetSearch(value.toLowerCase());
  };

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
              defaultValue={localSearch}
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
          {POKEMON_TYPES.map(({ key, label }) => {
            const isActive = type === key;
            const cls = `container__filter-types-btn ${key || "all"} ${isActive ? "is-active" : ""
              }`;
            const isDisabled = localSearch.length > 0;
            return (
              <button
                key={key || "all"}
                type="button"
                className={cls}
                aria-selected={isActive}
                onClick={() => setType(key)}
                disabled={isDisabled}
                title={isDisabled ? "Clear search to filter by type" : ""}
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
              <CountUp start={0} end={localSearch ? resultsCount : totalResults} />
            </span>
            Pokémon
          </p>
        </div>
      </div>
    </section>
  );
};

export default Filters;

