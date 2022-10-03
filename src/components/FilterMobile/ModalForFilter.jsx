import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import "./Modal.css";
import CheckBox from "../checkbox/CheckBox";
import AccordionComponent from "../accordion/AccordionComponent";
import TuneIcon from '@material-ui/icons/Tune';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => {
  const appbarHeight = 100;
  return {
    root: { top: `${appbarHeight}px !important`, margin: 0 },
  };
});
export default function ModalForFilter() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <TuneIcon className="filter-icon" onClick={() => setOpen(true)}>

      </TuneIcon>
      <Dialog
        className={classes.root}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h5">Filter</Typography>
            <IconButton onClick={() => setOpen(false)}>
            </IconButton>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <AccordionComponent
            id="Type"
            FilterByType={<CheckBox />}
            filterType={"Type"}
          />
          <AccordionComponent id="Gender" filterType={"Gender"} />
          <DialogContentText></DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
