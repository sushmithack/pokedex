export function findColourGradient(
  type1 = "unknown",
  type2 = "unknown",
  length
) {
  let colourArr = [];
  let arr = [
    {
      type: "normal",
      color: "DDCBD0",
    },
    {
      type: "rock",
      color: "#C5AEAB",
    },
    {
      type: "water",
      color: "#CBD5ED",
    },
    {
      type: "dragon",
      color: "#CADCDF",
    },
    {
      type: "fighting",
      color: "#FCC1B0",
    },
    {
      type: "bug",
      color: "#C1E0C8",
    },
    {
      type: "grass",
      color: "#C0D4C8",
    },
    { type: "dark", color: "#C6C5E3" },
    { type: "flying", color: "#B2D2E8" },

    { type: "ghost", color: "#D7C2D7" },
    { type: "electric", color: "#E2E2A0" },
    { type: "fairy", color: "#E4C0CF" },

    { type: "poison", color: "#CFB7ED" },
    { type: "steel", color: "#C2D4CE" },
    { type: "psychic", color: "#DDC0CF" },
    { type: "unknown", color: "#C0DFDD" },

    { type: "ground", color: "#F4D1A6" },
    { type: "fire", color: "#EDC2C4" },
    { type: "ice", color: "#C7D7DF" },
    { type: "shadow", color: "#CACACA" },
  ];
  if (length === 1) {
    arr.forEach((ele) => {
      if (ele.type === type1 || ele.type === type2) {
        colourArr = [ele.color, ele.color];
      }
    });
  }
  if (length === 2) {
    arr.forEach((ele) => {
      if (ele.type === type1 || ele.type === type2) colourArr.push(ele.color);
    });
  }

  return colourArr;
}
