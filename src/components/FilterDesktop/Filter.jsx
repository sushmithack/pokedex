import { appContext } from "../../App";
import React, { Children, useContext } from "react";
import AccordionComponent from "../accordion/AccordionComponent";
import Box from '@material-ui/core/Box';
import CheckBox from "../checkbox/CheckBox";
import Typography from "@material-ui/core/Typography";

import "./Filter.css";
function Filter() {
 
  return (
      <Box className="filter-on-largescreen" display="flex" flexDirection="row" alignItems="stretch" justifyContent="space-between">
      <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between">
        <Typography variant="subtitle1"  className="filterHeaderText">Type</Typography>
          <AccordionComponent
            id="Type"
            FilterByType={<CheckBox />}
            filterType={"Type"}
          ></AccordionComponent>
      </Box>
      
      <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between">
      <Typography variant="subtitle1"  className="filterHeaderText">Gender</Typography>
      <AccordionComponent
        id="Gender"
        FilterByType={<CheckBox />}
        filterType={"Gender"}
      ></AccordionComponent>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between">
      <Typography variant="subtitle1"  className="filterHeaderText">Stats</Typography>
      <AccordionComponent
        id="Stats"
        FilterByType={<CheckBox />}
        filterType={"Stats"}
      ></AccordionComponent>
      </Box>
      </Box>
  );
}

export default Filter;
