import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export const PokemonCard = ({ pokemon }) => {
  return (
    <Card className="shadow">
      <Card.Img
        className="m-auto w-50"
        variant="top"
        src={pokemon.sprites.front_default}
      />
      <Card.Body>
        <Card.Title>
          {pokemon.base_experience}:{pokemon.name}
        </Card.Title>
        <Card.Text></Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        {pokemon.types.map((type, i) => {
          return (
            <ListGroup.Item key={i}>
              タイプ{i + 1}：{type.type.name}
            </ListGroup.Item>
          );
        })}
        <ListGroup.Item>重さ：{pokemon.weight}</ListGroup.Item>
        <ListGroup.Item>高さ{pokemon.height}</ListGroup.Item>
        <ListGroup.Item>
          わざ：{pokemon.abilities[0].ability.name}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>{/* <Card.Link href="#">Card Link</Card.Link> */}</Card.Body>
    </Card>
  );
};
