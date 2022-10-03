import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import "./Modal.css";
import AccordionComponent from "../accordion/AccordionComponent";
import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { appContext } from "../../App";
import PokemonCard from "../PokemonCard";
const useStyles = makeStyles((theme) => {
  const appbarHeight = 100;
  return {
    root: { top: `${appbarHeight}px !important`, margin: 0 },
  };
});
export default function Pokemondetails(prop) {
  const { open, setOpen, pokemonStats } = prop;
  const classes = useStyles();
  console.log(pokemonStats);
  return (
    <div>
      <Dialog
        className={classes.root}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5"></Typography>
            <IconButton onClick={() => setOpen(false)}>x</IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <PokemonCard
            pokemonStats={pokemonStats}
            onCardClick={() => {}}
            disableClick={true}
            key={pokemonStats?.name}
            id={""}
            image={pokemonStats?.sprites?.other?.dream_world?.front_default}
            name={""}
            types={pokemonStats?.types}
            type={pokemonStats?.types[0]?.type?.name}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
