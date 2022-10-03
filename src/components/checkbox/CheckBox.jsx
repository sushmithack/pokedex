import { useState, useEffect, useContext } from "react";
import { appContext } from "../../App";
import "./CheckBox.css";
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
const typesObject1 = [
  {
    " all types": false,
    bug: false,
    dark: false,
    dragon: false,
    electric: false,
    fairy: false,
    fighting: false,
    fire: false,
    flying: false,
    ghost: false,
    grass: false,
    ground: false,
    ice: false,
    normal: false,
    poison: false,
    psychic: false,
    rock: false,
    steel: false,
    water: false,
  },
];

export default function CheckBox() {
  const { allPokemonTypes, onMultipleTypeSelection } = useContext(appContext);
  const [state, setState] = useState(...typesObject1);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const objArr = Object.keys(state);
  let res = [];

  const handleChange = (e) => {
    let res = [];
    const updatedChecked = {
      ...state,
      [e.target.name]: e.target.checked,
    };
    setState(updatedChecked);
    for (let key in updatedChecked) {
      if (updatedChecked[key] === true) res.push(key);
    }
    setSelectedTypes(res);
    onMultipleTypeSelection(e, res);
  };

  return (
    <form className="checkbox-container">
      {objArr.map((ele, i) => {
        return (
          <label key={ele} label={ele} className="checkbox-item">
            <input
              className="Checkbox-input"
              id="Checkbox-input"
              type="Checkbox"
              checked={state[ele]}
              onChange={handleChange}
              name={ele}
            />
            {ele}
          </label>
        );
      })}
    </form>
  );
}
