import { appContext } from "../../App";
import React, { Children, useContext } from "react";
import AccordionComponent from "../accordion/AccordionComponent";
import FilterByType from "./FilterByType";
import "./Filter.css";
function Filter() {
  return (
    <div className="filter-on-largescreen">
      <AccordionComponent
        id="Type"
        FilterByType={<FilterByType />}
        filterType={"Type"}
      ></AccordionComponent>
      <AccordionComponent
        id="Gender"
        FilterByType={<FilterByType />}
        filterType={"Gender"}
      ></AccordionComponent>
      <AccordionComponent
        id="Stats"
        FilterByType={<FilterByType />}
        filterType={"Stats"}
      ></AccordionComponent>
    </div>
  );
}

export default Filter;
