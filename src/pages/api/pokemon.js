
export async function getPokemonSideBar(id) {
  const uri = "https://beta.pokeapi.co/graphql/v1beta";
  const offset = id > 5 ? id - 5 : 0;
  const query = {
    query: `{
          pokemon_v2_pokemon(limit: 6, where: {id: {_neq: ${id}}}, offset: ${offset}) {
            name
            id
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                name
              }
            }
          }
        }`
  };
  const headers = {
    'Content-Type': 'application/json'
  }
  const response = await fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(query)
  });
  return response.json();
}

export async function getPokemon(id){
  const uri = "https://beta.pokeapi.co/graphql/v1beta";
  const query = {
    query: `{
      pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
        name
        id
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        pokemon_v2_pokemonstats {
          base_stat
          pokemon_v2_stat {
            name
          }
        }
      }
      pokemon_v2_pokemonevolution(where: {id: {_eq: ${id}}}) {
        min_level
      }
      pokemon_v2_pokemonspeciesflavortext(where: {pokemon_v2_pokemonspecy: {id: {_eq: ${id}}}})  {
        flavor_text
      }
    }`
  };


  const headers = {
    'Content-Type': 'application/json'
  }
  const response = await fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(query)
  });
  return response.json();
}

export default {
  getPokemonSideBar,
  getPokemon
}