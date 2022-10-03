import { appContext } from "../../App";
import React, { Children, useContext } from "react";
import AccordionComponent from "../accordion/AccordionComponent";
// import FilterByType from "./FilterByType";
import CheckBox from "../checkbox/CheckBox";
import "./Filter.css";
function Filter() {
  return (
    <div className="filter-on-largescreen">
      <AccordionComponent
        id="Type"
        FilterByType={<CheckBox />}
        filterType={"Type"}
      ></AccordionComponent>
      <AccordionComponent
        id="Gender"
        FilterByType={<CheckBox />}
        filterType={"Gender"}
      ></AccordionComponent>
      <AccordionComponent
        id="Stats"
        FilterByType={<CheckBox />}
        filterType={"Stats"}
      ></AccordionComponent>
    </div>
  );
}

export default Filter;
