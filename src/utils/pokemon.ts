export const getAllPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
export const getAllPokemonAsync = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const getPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};
