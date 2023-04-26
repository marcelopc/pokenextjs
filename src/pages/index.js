import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/home.module.css'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {

  const maxPkemons = 251;
  const api = 'https://pokeapi.co/api/v2/pokemon/';
  const res = await fetch(`${api}/?limit=${maxPkemons}`);
  const data = await res.json();

  data.results.forEach((pokemon, index) => pokemon.id = index+1);

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
        <li key={pokemon.id}>{pokemon.name}</li>
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
