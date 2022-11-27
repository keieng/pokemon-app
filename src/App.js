import { useEffect } from "react";
import "./App.css";
import { getAllPokemon, getAllPokemonAsync } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      // let res2 = await getAllPokemonAsync(initialURL);
      console.log(res);
    };
    fetchPokemonData();
  }, []);

  return <div className="App">ポケモン</div>;
}

export default App;
