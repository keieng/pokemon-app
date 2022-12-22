export interface IPokemon {
  pokemon: {
    name: string;
    sprites: {
      front_default: string;
    };
    base_experience: string;
    types: Array<{ type: { name: string } }>;
    weight: string;
    height: string;
    abilities: Array<{ ability: { name: string } }>;
  };
}
