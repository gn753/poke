const fetchPokemonDetails = async (id: number) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
};

export default fetchPokemonDetails;
