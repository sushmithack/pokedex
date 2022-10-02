import React from "react";
import { findColourGradient } from "../utils/utils";

const PokemonCard = ({
  id,
  image,
  name,
  type,
  disableClick,
  types,
  onCardClick,
  pokemonStats,
}) => {
  let finalColor;

  if (types.length === 2) {
    finalColor = findColourGradient(
      types[0].type.name,
      types[1].type.name,
      types.length
    );
  } else {
    finalColor = findColourGradient(
      types[0].type.name,
      types[0].type.name,
      types.length
    );
  }
  let idValue = id ? `#0${id}` : "";
  const style = " thumb-container";

  return (
    <div
      onClick={(e) => {
        if (!disableClick) onCardClick(e, pokemonStats);
      }}
      className={style}
      style={{
        background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`,
      }}
    >
      <img src={image} alt={name} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        {/* <small>Type: {type}</small> */}
      </div>
      <div className="number">
        <small>{idValue}</small>
      </div>
    </div>
  );
};

export default PokemonCard;
