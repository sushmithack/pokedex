import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./AccordionComponent.css";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    paddingTop:'5px',
    paddingBottom:'5px',
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
            <span style={{padding:'90px !important',fontSize:'0.8rem'}}>{id}</span>
          
          </Typography>
        </AccordionSummary>
        <AccordionDetails> {FilterByType}</AccordionDetails>
      </Accordion>
    </div>
  );
}
