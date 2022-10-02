import PokemonCard from "./components/PokemonCard";
import ModalForFiltering from "./components/Modal/ModalForFilter";
import React, { useRef, useEffect, useState } from "react";
import CardElement from "./components/cardElement/CardElement";
import FilterByType from "./components/Filter/FilterByType";
import Pokemondetails from "./components/Modal/Pokemondetails";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { DialogContent } from "@material-ui/core";
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
  function onTypesSelect(e) {
    let filterArr = [];
    let selectedType = e.target.value;
    if (selectedType === "all types") {
      setFilteredPokemonList(pokemonList);
    } else {
      for (let i = 0; i < pokemonList.length; i++) {
        for (let j = 0; j < pokemonList[i].types.length; j++) {
          if (e.target.value === pokemonList[i].types[j].type.name) {
            filterArr.push(pokemonList[i]);
          }
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
  function getPokemonCard(pokemonStats, index) {
    return (
      <PokemonCard
        pokemonStats={pokemonStats}
        onCardClick={onCardClick}
        key={pokemonStats.name}
        disableClick={false}
        id={pokemonStats.id}
        image={pokemonStats.sprites.other.dream_world.front_default}
        name={pokemonStats.name}
        types={pokemonStats.types}
        type={pokemonStats.types[0].type.name}
      />
    );
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
      }}
    >
      <div className="app-container">
        <div className="app-container-header">
          <div className="app-container-header-line">
            <h1 className="app-container-header-title">Pokédex</h1>
          </div>
          <h4 className="app-container-header-subtitle">
            Search for any pokemon that exists on the planet
          </h4>
        </div>

        <div className="app-container-filtering">
          <input
            placeholder="Name or Number"
            className="app-container-filtering-input"
            type="text"
            onChange={(e) => handleChange(e)}
          />
          <div className="app-container-filtering-filtericon">
            <ModalForFiltering></ModalForFiltering>
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
