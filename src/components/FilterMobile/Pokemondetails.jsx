import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles,withStyles } from "@material-ui/core/styles";
import "./Modal.css";
import React, { useState,useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';

import Grid from "@material-ui/core/Grid";
import PokemonCard from "../PokemonCard";
import Box from '@material-ui/core/Box';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {appUrls} from '../../constants/config';
import {findColourGradient} from '../../utils/utils';

const useStyles = makeStyles((theme) => {
  const appbarHeight = 0;
  const LINES_TO_SHOW = 8;
  const textColor = "#2e3156";
  return {
    root: { top: `${appbarHeight}px !important`, margin: 0,backgroundColor:"#deeded"},
    name:{ fontWeight:"600",fontSize:"2rem",letterSpacing: '1px', color:`${textColor}`},
    id:{ fontWeight:"400",letterSpacing: '1px',marginTop:"-10px", color:`${textColor}`},
    cancelIcon:{fontSize:"2rem",alignSelf:"flex-start",marginTop:"0.8rem"},
    card:{height:"250px"},
    about:{maxHeight:"200px",overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    "-webkit-line-clamp": LINES_TO_SHOW,
    "-webkit-box-orient": "vertical",
    color:`${textColor}`
  },
    readMore:{textDecoration:"underline",fontWeight:"600", color:`${textColor}`},
    title:{paddingTop:"3rem",paddingBottom:"0px", color:`${textColor}`,backgroundColor:"#deeded"},
    content:{backgroundColor:"#deeded"},
    box:{width:"50%" , color:`${textColor}`},
    smallBox:{
      border:`0.1rem solid ${textColor}`,
      borderRadius:"6px",
      padding:'3px',
      marginRight:'5px'
    },
    sectionHeaders:{
      fontWeight:'600'
    }
  };
  
});

const CustomStyleToolTip = withStyles({
  tooltip: {
    color: "white",
    backgroundColor: "#2e3156",
  }
})(Tooltip);

export default function Pokemondetails(prop) {
  const { open, setOpen, pokemonStats } = prop;

  const [about,setAbout] = useState("Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally When expelling a blast of super and hot fire,Spits fire that is hot enough to melt boulders. Known to cause forest fires unintentionally When expelling a blast of super and hot fire");
  const [eggGrps ,setEggGrps] = useState("");
  const [gender ,setGender] = useState("");
  const [weakness ,setWeakness] = useState([]);
  const classes = useStyles();

  const [openReadMore, setOpenReadMore] = useState(false);

  useEffect(()=>{
      (async ()=>{
        if(pokemonStats.id){
          const res = await fetch(`${appUrls.baseUrl}${appUrls.description.replace("$id",pokemonStats.id)}`);
          const data = await res.json();

          const texts = new Set();
          data["flavor_text_entries"].filter(x => x.language.name === 'en').map(y => texts.add(y.flavor_text.replace("\n", " ").replace("\f", " ")))
          setAbout(Array.from(texts).slice(0,6).join(""))
          setEggGrps(data["egg_groups"].map(x => x.name.substring(0,1).toUpperCase()+x.name.substring(1,x.name.length)).join(", "));
          //setAbout()
        }

      })();
  },[pokemonStats.id])

  useEffect(()=>{
    (async ()=>{
      if(pokemonStats.id){

        const responses = await Promise.all([1,2,3].map(async (x) => {
         const resp = await fetch(`${appUrls.baseUrl}${appUrls.gender.replace("$id",x)}`);
          return resp.json();
        }))
        
        setGender(responses.map(response => response.pokemon_species_details.filter(x => x.pokemon_species.name === pokemonStats.name).length > 0 ? (response.name.substring(0,1).toUpperCase() + response.name.substring(1,response.name.length)) : null)
        .filter(x => x!== null).join(", "));
      }

    })();

   
},[pokemonStats.id])


useEffect(()=>{
  (async ()=>{
    if(pokemonStats.id){
      const res = await fetch(`${appUrls.baseUrl}${appUrls.weakness.replace("$id",pokemonStats.id)}`);
      const data = await res.json();
      setWeakness(data.damage_relations.double_damage_from.map(x => x.name.substring(0,1).toUpperCase()+x.name.substring(1,x.name.length)));
    }

  })();
},[pokemonStats.id])

  const getIdText = (id) => {
    
    if(id/100 >= 1) return id;
    
    if(id/10 >= 1) return `0${id}`

    return `00${id}`

  }

  const handleTooltipClose = () => {
    setOpenReadMore(false);
  }

  const handleTooltipOpen = () => {
    setOpenReadMore(true);
  }

  return (
    <div>
      <Dialog
        fullScreen={true}
        className={classes.root}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle className={classes.title}>
          <Grid container justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
            <Typography variant="h5" className={classes.name}>{pokemonStats.name.toUpperCase()}</Typography>
            <Typography variant="h5" className={classes.id}>{getIdText(pokemonStats.id)}</Typography>
          </Box>
            <HighlightOffIcon className={classes.cancelIcon} onClick={() => setOpen(false)}></HighlightOffIcon>
          </Grid>
        </DialogTitle>
        <DialogContent className={classes.content}>
        <Box display="flex" flexDirection="row" alignItems="stretch">
        <Box className={classes.card}>
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
          </Box>
          <Box display="flex" flexDirection="column" alignItems="stretch" padding={1}>
            <Typography variant="body1" className={classes.about}>{about}</Typography>
            <CustomStyleToolTip
                onClose={handleTooltipClose}
                open={openReadMore}
                title={about}
                disableTouchListener
                placement="bottom-end"
                
              >
                <Typography variant="body1" className={classes.readMore} onClick={handleTooltipOpen}>read more</Typography>
          </CustomStyleToolTip>
          </Box>
        
          </Box>
          
          <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="space-between" padding={1}>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Height</Typography>
              <Typography variant="subtitle1">{pokemonStats.height}'</Typography>
            </Box>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Weight</Typography>
              <Typography variant="subtitle1">{pokemonStats.weight} Kg</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="space-between" padding={1}>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Gender(s)</Typography>
              <Typography variant="subtitle1">{gender}</Typography>
            </Box>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Egg Groups</Typography>
              <Typography variant="subtitle1">{eggGrps}</Typography>
            </Box>
          </Box>

          <Box display="flex" flexDirection="row" alignItems="stretch" justifyContent="space-between" padding={1}>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Abilities</Typography>
              <Typography variant="subtitle1">{pokemonStats.abilities.map(x => x.ability.name.substring(0,1).toUpperCase()+x.ability.name.substring(1,x.ability.name.length)).join(", ")}</Typography>
            </Box>
            <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch">
              <Typography variant="h6" className={classes.sectionHeaders}>Types</Typography>
              <Box display="flex"  flexDirection="row" alignItems="stretch">
                  {
                   pokemonStats.types.map(x => x.type.name.substring(0,1).toUpperCase()+x.type.name.substring(1,x.type.name.length)).map(y => 
                   {
                    const colors = findColourGradient(y.toLowerCase(),null,1);
                   return <span key={y} className={classes.smallBox} style={{backgroundColor:colors[0]}}>{y}</span>
                   }) 
                  }
              </Box>              
            </Box>
          </Box>

          <Box display="flex" className={classes.box} flexDirection="column" alignItems="stretch" padding={1}>
              <Typography variant="h6" className={classes.sectionHeaders}>Weak Against</Typography>
              <Box display="flex"  flexDirection="row" alignItems="stretch">
              {
                   weakness.map(y => 
                   {
                    const colors = findColourGradient(y.toLowerCase(),null,1);
                   return <span key={y} className={classes.smallBox} style={{backgroundColor:colors[0]}}>{y}</span>
                   }) 
                  }
              </Box>              
          </Box>

        </DialogContent>
      </Dialog>
    </div>
  );
}