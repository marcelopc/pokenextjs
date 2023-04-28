import Image from 'next/image';

import { Inter } from 'next/font/google';
import styles from '@/styles/home.module.css'
import Card from '@/components/Card';

const inter = Inter({ subsets: ['latin'] })

function zeroPad(num,count)
{
  var numZeropad = num + '';
  while(numZeropad.length < count) {
    numZeropad = "0" + numZeropad;
  }
  return numZeropad;
}

const pokemonGraphql = (limit) => {
  const uri = "https://beta.pokeapi.co/graphql/v1beta";
  const query = {
    query: `{
      pokemon_v2_pokemon(order_by: {id: asc}, limit: ${limit}) {
        name
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
        id
      }
    }`
  };
  const headers = {
    'Content-Type': 'application/json'
  }

  return fetch(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(query)
  });
}

export async function getStaticProps() {

  const maxPkemons = 151;
  const res = await pokemonGraphql(maxPkemons);
  const {data} = await res.json();

  const pokemons = data.pokemon_v2_pokemon.map((pokemon) => {
    const id = pokemon.id;
    pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(id, 3)}.png`;
    pokemon.types = pokemon.pokemon_v2_pokemontypes;
    delete pokemon.pokemon_v2_pokemontypes;
    return pokemon;
  });

  return {
    props:{
      pokemons: pokemons
    }
  }
}

export default function Home({pokemons}) {

  function renderPokemons(pokemons) {
    return pokemons.map((pokemon) => {
      return (
        <Card
          key={pokemon.id} 
          nome={pokemon.name}
          image={pokemon.image}
          numero={pokemon.id}
          types={pokemon.types}
        />
      )
    })
  }
  return (
    <>
      <div className={styles.title_container}>
        <Image src="/images/logo.svg" width="500" height="200" alt="pokeball"/>
      </div>

      <div className={styles.pokemon_container}>
        {renderPokemons(pokemons)}
      </div>
    </>
  )
}
