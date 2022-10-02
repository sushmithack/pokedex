import { makeStyles } from "@material-ui/core/styles";
import React, { Children } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { AddCircleOutlineIcon } from "@material-ui/icons";
// import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutlineIcon";
import "./AccordionComponent.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function AccordionComponent({ FilterByType, filterType, id }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Accordion disabled={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`${id}-content`}
        >
          <Typography className={classes.heading}>
            <span>
              {filterType}
              {`(normal+5More)`}
            </span>
          </Typography>
        </AccordionSummary>
        <AccordionDetails> {FilterByType}</AccordionDetails>
      </Accordion>
    </div>
  );
}
