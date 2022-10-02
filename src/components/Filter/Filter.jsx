import { appContext } from "../../App";
import React, { Children, useContext } from "react";
import AccordionComponent from "../accordion/AccordionComponent";
import FilterByType from "./FilterByType";
function Filter() {
  const { allPokemonTypes, onTypesSelect, filterOptionTypes } =
    useContext(appContext);

  return (
    <div>
      Filter
      <AccordionComponent>
        <Filter />
      </AccordionComponent>
      <div>Type</div>
    </div>
  );
}

export default Filter;
