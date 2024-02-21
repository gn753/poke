const fetchPokemonList = async (count: number, limit: number = 100) => {
  const baseUrl = `https://pokeapi.co/api/v2/pokemon?offset=${count}&limit=${limit}`;
  const response = await fetch(baseUrl);

  const data = await response.json();
  return data;
};
export default fetchPokemonList;
