import React, { useContext } from "react";
import { appContext } from "../../App";
export default function FilterByType() {
  const { allPokemonTypes, onTypesSelect } = useContext(appContext);
  return (
    <select
      multiple={true}
      name="types"
      value={allPokemonTypes}
      onChange={onTypesSelect}
    >
      {allPokemonTypes.map((type, i) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}
