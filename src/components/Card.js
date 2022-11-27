import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div>
      <img src={pokemon.sprites.front_default} alt="" />
      <div>{pokemon.name}</div>
      <div>
        {pokemon.types.map((type) => {
          return <div>タイプ：{type.type.name}</div>;
        })}
      </div>
      <div>重さ：{pokemon.weight}</div>
      <div>高さ{pokemon.height}</div>
      <div>わざ：{pokemon.abilities[0].ability.name}</div>
    </div>
  );
};

export default Card;
