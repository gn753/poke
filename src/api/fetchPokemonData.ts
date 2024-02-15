const fetchPokemonDetails = async (id:number) => {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
}

export default fetchPokemonDetails