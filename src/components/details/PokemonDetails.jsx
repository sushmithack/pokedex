import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import "./Modal.css";
import AccordionComponent from "../accordion/AccordionComponent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
// import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import FilterByType from "../Filter/FilterByType";
const useStyles = makeStyles((theme) => {
  const appbarHeight = 100;
  return {
    root: { top: `${appbarHeight}px !important`, margin: 0 },
  };
});
export default function PokemonDetails() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <img className="filter-icon" src="icons/filterIcon.png"></img>
      </Button>
      <Dialog
        className={classes.root}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Filter</Typography>
            <IconButton onClick={() => setOpen(false)}>
              {/* <HighlightOffIcon /> */}
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
