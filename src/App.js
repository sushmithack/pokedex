import PokemonCard from "./components/PokemonCard";
import ModalForFiltering from "./components/FilterMobile/ModalForFilter";
import React, { useRef, useEffect, useState } from "react";
import Filter from "./components/FilterDesktop/Filter";
import Pokemondetails from "./components/FilterMobile/Pokemondetails";

export const appContext = React.createContext();
//lazy loading, error handling
const config = {
  endpoint: `https://pokeapi.co/api/v2/pokemon`,
  gender: `https://pokeapi.co/api/v2/gender/`,
};
const filterOptionTypes = [
  {
    option: "type",
    isDisabled: false,
  },
  {
    option: "gender",
    isDisabled: false,
  },
  {
    option: "stats",
    isDisabled: true,
  },
];
function App() {
  let timer;

  const allPokemonTypes = [
    "all types",
    "grass",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ];
  const [isDesktop, setDesktop] = useState(window.innerWidth > 1024);

  const updateMedia = () => {
    setDesktop(window.innerWidth > 1200);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [openPokemonDetails, setOpenPokemonDetails] = useState(false);
  const [openedPokemonCardDetails, setOpenedPokemonCardDetails] = useState({});
  const countRef = useRef(0);
  const performAPICall = async () => {
    let response = {};
    let errored = false;
    try {
      response = await (await fetch(`${config.endpoint}`)).json();
    } catch (e) {
      errored = true;
    }
    return response;
  };

  function getEachIndividualPokemon(results) {
    results.forEach(async (pokemon) => {
      const res = await fetch(`${config.endpoint}/${pokemon.name}`);
      const data = await res.json();

      setPokemonList((currentList) => [...currentList, data]);
    });
    pokemonList.sort((a, b) => a.id - b.id);
  }

  async function getPokemonData() {
    const response = await performAPICall();
    getEachIndividualPokemon(response.results);

    setFilteredPokemonList(pokemonList);
  }

  useEffect(() => {
    countRef.current++;
    getPokemonData();
  }, []);

  function search(text) {
    let filteredPokemon = [];

    text = text.toLowerCase();
    filteredPokemon = pokemonList.filter((pokemon) => {
      let name = pokemon.name;
      if (name.startsWith(text) || Number(pokemon.id) === Number(text)) {
        return true;
      } else {
        return false;
      }
    });

    setFilteredPokemonList(filteredPokemon);
  }

  const handleChange = (e) => {
    let val = e.target.value;

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      search(val);
    }, 300);
  };
  function onMultipleTypeSelection(e, selectedTypes) {
    console.log(selectedTypes.length);
    if (selectedTypes.length === 0) {
      setFilteredPokemonList(pokemonList);
    }

    console.log(selectedTypes);
    selectedTypes.forEach((type) => {
      onTypesSelect(e, type);
    });
  }
  function onTypesSelect(e, type) {
    let filterArr = [];

    for (let i = 0; i < pokemonList.length; i++) {
      for (let j = 0; j < pokemonList[i].types.length; j++) {
        if (type === pokemonList[i].types[j].type.name) {
          filterArr.push(pokemonList[i]);
        }
      }
    }

    setFilteredPokemonList(filterArr);
  }
  function onCardClick(e, pokemonStats) {
    console.log(pokemonStats);
    setOpenPokemonDetails(true);
    setOpenedPokemonCardDetails(pokemonStats);
  }

  return (
    <appContext.Provider
      value={{
        allPokemonTypes,
        filterOptionTypes,
        onTypesSelect,
        pokemonList,
        handleChange,
        openedPokemonCardDetails,
        openPokemonDetails,
        setOpenPokemonDetails,
        onMultipleTypeSelection,
      }}
    >
      <div className="app-container">
        <div className="app-container-header">
          <h1 className="app-container-header-title">Pokédex</h1>
          <div className="app-container-header-line"></div>
          <h4 className="app-container-header-subtitle">
            Search for any pokemon that exists on the planet
          </h4>
        </div>
        <div className="app-container-findby">
          <div className="app-container-findby-searching">
            <input
              placeholder="Name or Number"
              className="app-container-findby-searching-input"
              type="text"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="app-container-findby-filter">
            {isDesktop ? (
              <Filter></Filter>
            ) : (
              <ModalForFiltering></ModalForFiltering>
            )}
          </div>
        </div>
        <div className="pokemon-container">
          <div className="all-container">
            <>
              {filteredPokemonList.length !== 0
                ? filteredPokemonList.map((pokemonStats, index) => (
                    <PokemonCard
                      pokemonStats={pokemonStats}
                      onCardClick={onCardClick}
                      key={pokemonStats.name}
                      id={pokemonStats.id}
                      disableClick={false}
                      image={
                        pokemonStats.sprites.other.dream_world.front_default
                      }
                      name={pokemonStats.name}
                      types={pokemonStats.types}
                      type={pokemonStats.types[0].type.name}
                    />
                  ))
                : pokemonList.map((pokemonStats, index) => (
                    <PokemonCard
                      pokemonStats={pokemonStats}
                      onCardClick={onCardClick}
                      disableClick={false}
                      key={pokemonStats.name}
                      id={pokemonStats.id}
                      image={
                        pokemonStats.sprites.other.dream_world.front_default
                      }
                      name={pokemonStats.name}
                      types={pokemonStats.types}
                      type={pokemonStats.types[0].type.name}
                    />
                  ))}
              {openPokemonDetails && openedPokemonCardDetails && (
                <Pokemondetails
                  open={openPokemonDetails}
                  setOpen={setOpenPokemonDetails}
                  pokemonStats={openedPokemonCardDetails}
                />
              )}
            </>
          </div>
        </div>
      </div>
    </appContext.Provider>
  );
}

export default React.memo(App);
