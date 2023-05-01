import Image from 'next/image';
import styles from '@/styles/pokemon.module.css';
import { StatsBars } from '@/components/StatsBar';
import { zeroPad } from '@/utils/formaters';
import { SideBarElement } from '@/components/SideBarElement';
import {getPokemonSideBar, getPokemon} from '../api/pokemon';
import Link from 'next/link';

export const getStaticPaths = async () => {

    const maxPkemons = 151;
    const api = 'https://pokeapi.co/api/v2/pokemon/';
    const res = await fetch(`${api}/?limit=${maxPkemons}`);
    const data = await res.json();

    const paths = data.results.map((pokemon, index) => {
        const id = index + 1;
        return { params: { pokemonId: id.toString() } };
    });

    return {
        paths,
        fallback: false
    }
};

export const getStaticProps = async (context) => {
    const id = context.params.pokemonId;

    const {data} = await getPokemon(id);
    const [pokemon] = data.pokemon_v2_pokemon;
    const [evolution] = data.pokemon_v2_pokemonevolution;
    const [sumario] = data.pokemon_v2_pokemonspeciesflavortext;
    const paylaod = {...pokemon};
    paylaod.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(id, 3)}.png`;
    paylaod.evolution = evolution;
    paylaod.sumario = sumario;

    const { data: sidebarData } = await getPokemonSideBar(id)

    return { props: { pokemon: paylaod, sidebarData } };
};


export default function Pokemons({ pokemon, sidebarData }) {

    function renderStat(stats) {
        const max = stats.reduce((acc, stat) => acc += stat.base_stat, 0);

        const status = stats.map((stat, index) => (<StatsBars
            key={index}
            stats={stat.pokemon_v2_stat.name}
            min={stat.base_stat}
            max={max}
        />));

        return (
            <>
                <div>
                    <h1>Base stats</h1>
                    <h3>({max})</h3>
                </div>
                {status}
            </>
        );
    }

    function captalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function sidebar(payload) {
        return payload.map(pokemon => {
            const tipos = pokemon.pokemon_v2_pokemontypes.map(tipo => tipo.pokemon_v2_type.name );
            return (

                <SideBarElement
                    key={pokemon.id}
                    imagem={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(pokemon.id, 3)}.png`}
                    numero={pokemon.id}
                    nome={pokemon.name}
                    tipos={tipos}
                />
            )
        });

    }
    function renderPrevNext(pokemonId, list){
        const next = list.pokemon_v2_pokemon.find(item => item.id === pokemonId + 1);
        const prev = list.pokemon_v2_pokemon.find(item => item.id === pokemonId - 1);
        
        return(<>
            <Link href={`/pokedex/${prev.id}`}>{prev.name}</Link>
            <Link href={`/pokedex/${next.id}`}>{next.name}</Link>
        </>);
    }
    return (
        <div className={styles.pokemon_container}>
            <div className={styles.sidebar}>
                {sidebar(sidebarData.pokemon_v2_pokemon)}
            </div>
            <div className={styles.data_content}>
                <div className={styles.navigation}>
                    {renderPrevNext(pokemon.id, sidebarData)}
                </div>
                <div className={styles.pokemon_details_container}>
                    <div>
                        <Image src={pokemon.image} width={300} height={300} alt={pokemon.name} />
                        <div>
                            <h1 className={styles.title}>{zeroPad(pokemon.id, 3)} {captalize(pokemon.name)}</h1>
                            <p>
                                Tipo: {pokemon.pokemon_v2_pokemontypes.map((item, index) => (<span key={index} className={`${styles.type} ${styles['type_' + item.pokemon_v2_type.name]}`}>{captalize(item.pokemon_v2_type.name)}</span>))}
                            </p>
                            <p>Altura: <span>{pokemon.height * 10} cm</span></p>
                            <p>Peso: <span>{pokemon.weight / 10} kg</span></p>
                            <p>Evolui: Level {pokemon.evolution.min_level}<span></span></p>
                            <p>Sumario: {pokemon.sumario.flavor_text}<span></span></p>
                        </div>
                    </div>
                    <div className={styles.stats_container}>
                        {renderStat(pokemon.pokemon_v2_pokemonstats)}
                    </div>
                </div>
            </div>
        </div>
    )

}