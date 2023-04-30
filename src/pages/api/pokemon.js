
export default async function getPokemonSideBar(id) {
  const uri = "https://beta.pokeapi.co/graphql/v1beta";
  const offset = id > 5 ? id - 5 : 0;
  const query = {
    query: `{
          pokemon_v2_pokemon(limit: 10, where: {id: {_neq: ${id}}}, offset: ${offset}) {
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