import { appContext } from "../../App";
import React ,{useContext} from "react";
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import "./Filter.css";
function Filter() {
 
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginTop:'5rem'
    },
  },
};


  const {allPokemonTypes,selectedPokemonTypes,setSelectedPokemonTypes,setSelectedGender,selectedGender,allGenderTypes} = useContext(appContext);

  const handleChange = (e) => {
    setSelectedPokemonTypes((prevState)=> {
        const se = new Set(e.target.value);
         return Array.from(se);
    })

    console.log(selectedPokemonTypes)
  }

  const handleChangeOfGender = (e) => {
   setSelectedGender(e.target.value);
  }

  return (
      <Box className="filter-on-largescreen" display="flex" flexDirection="row" alignItems="stretch" justifyContent="flex-start">
        <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between">
          <Typography variant="subtitle1"  className="filterHeaderText">Type</Typography>

        <FormControl sx={{ m: 1, width: 500 }} style={{width:'200px'}}>
        
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedPokemonTypes}
            onChange={handleChange}
            input={<OutlinedInput label="Type" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {allPokemonTypes.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedPokemonTypes.indexOf(name) !== -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>
        
        <Box display="flex" flexDirection="column" alignItems="stretch" justifyContent="space-between" style={{marginLeft:'2rem'}}>
        <Typography variant="subtitle1"  className="filterHeaderText">Gender</Typography>
    

      <FormControl sx={{ m: 1, width: 500 }} style={{width:'200px'}}>
     
          <Select
            variant="outlined"
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={selectedGender}
            onChange={handleChangeOfGender}
          >
            <MenuItem value={0} >
                None
              </MenuItem>
            {allGenderTypes.map((gender) => (
              <MenuItem value={gender.code} >
                {gender.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        </Box>

        
      </Box>
  );
}

export default Filter;
