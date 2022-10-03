import React, { useState, useContext } from "react";
import "./FilterByGender.css";
import { appContext } from "../../App";
function FilterByGender() {
  const genders = [
    {
      male: false,
      female: false,
      genderless: false,
    },
  ];
  const [state, setState] = useState(...genders);
  const objArr = Object.keys(state);
  const { onFilterByGender } = useContext(appContext);
  const handleChange = (e, index) => {
    let res = [];

    const updatedChecked = {
      ...state,
      [e.target.name]: e.target.checked,
    };
    setState(updatedChecked);
    for (let key in updatedChecked) {
      if (updatedChecked[key] === true) res.push(key);
    }
    onFilterByGender(e, res);
  };

  return (
    <form className="checkbox-container">
      {objArr.map((ele, i) => {
        return (
          <label key={ele} label={ele} className="checkbox-item">
            <input
              className="Checkbox-input"
              id="Checkbox-input"
              type="Checkbox"
              checked={state[ele]}
              onChange={(e) => handleChange(e, i)}
              name={ele}
            />
            {ele}
          </label>
        );
      })}
    </form>
  );
}

export default FilterByGender;
