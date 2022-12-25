/**
 * 全ポケモンデータを取得
 * @param url
 * @returns
 */
export const getAllPokemonAsync = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/**
 * 個別のポケモンデータを取得
 * @param url
 * @returns
 */
export const getPokemon = (url: string) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemonAsync = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};
