import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Backdrop } from "@material-ui/core";
import "./CardElement.css";
const useStyles = makeStyles({
  root: {
    maxWidth: 145,

    backgroundColor: "pink",
  },
});

export default function CardElement({ id, image, name, type }) {
  const classes = useStyles();
  const style = type + " thumb-container";

  return (
    <div className={classes.root}>
      <Card>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography
              className="number"
              variant="body2"
              color="textSecondary"
              component="div"
            >
              <small>#0{id}</small>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button> */}
        </CardActions>
      </Card>
    </div>
  );
}
