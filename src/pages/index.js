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

export async function getStaticProps() {

  const maxPkemons = 151;
  const api = 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(`${api}/?limit=${maxPkemons}`);
  const data = await res.json();

  data.results.forEach((pokemon, index) => {
    const id = index+1;
    pokemon.id = id;
    pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(id, 3)}.png`
  });

  return {
    props:{
      pokemons: data.results
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
        />
      )
    })
  }
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>next</span></h1>
        <Image src="/images/pokeball.png" width="83" height="71" alt="pokeball"/>
      </div>

      <div className={styles.pokemon_container}>
        {renderPokemons(pokemons)}
      </div>
    </>
  )
}
