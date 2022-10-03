import React, { useContext } from "react";
import { appContext } from "../../App";
export default function FilterByG() {
  const { onFilterByGender } = useContext(appContext);
  const onChangeValue = (e) => {
    console.log(e);
    // onFilterByGender(event.target.value, event.id);
  };
  return (
    <div>
      <div onChange={(e) => onChangeValue(e)}>
        <input type="radio" value="male" id={1} name="gender" /> Male
        <input type="radio" value="female" id={2} name="gender" /> Female
        <input type="radio" value="genderless" id={3} name="gender" /> Other
      </div>
    </div>
  );
}
