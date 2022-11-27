export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
export const getAllPokemonAsync = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
