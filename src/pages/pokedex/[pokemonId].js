import Image from 'next/image';
import styles from '@/styles/pokemon.module.css';
import { StatsBars } from '@/components/StatsBar';
import { zeroPad } from '@/utils/formaters';
import { SideBarElement } from '@/components/SideBarElement';
import getPokemonSideBar from '../api/pokemon';

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

    const api = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(`${api}`);
    const data = await res.json();
    data.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroPad(id, 3)}.png`;

// query para buscar o pokemon com os dados corretos
    // {
    //     pokemon_v2_pokemon(where: {id: {_eq: 1}}) {
    //       name
    //       id
    //       height
    //       weight
    //       pokemon_v2_pokemontypes {
    //         pokemon_v2_type {
    //           name
    //         }
    //       }
    //       pokemon_v2_pokemonstats {
    //         base_stat
    //         pokemon_v2_stat {
    //           name
    //         }
    //       }
    //     }
    //     pokemon_v2_pokemonevolution(where: {id: {_eq: 1}}) {
    //       min_level
    //     }
    //     pokemon_v2_pokemonspeciesflavortext(where: {id: {_eq: 1}}) {
    //       flavor_text
    //     }
    //   }
      




    const { data: sidebarData } = await getPokemonSideBar(id)

    return { props: { pokemon: data, sidebarData } };
};


export default function Pokemons({ pokemon, sidebarData }) {

    function renderStat(stats) {
        const max = stats.reduce((acc, stat) => acc += stat.base_stat, 0);

        const status = stats.map((stat, index) => (<StatsBars
            key={index}
            stats={stat.stat.name}
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

    return (
        <div className={styles.pokemon_container}>
            <div className={styles.sidebar}>
                {sidebar(sidebarData.pokemon_v2_pokemon)}
            </div>
            <div className={styles.data_content}>
                <div className={styles.navigation}>
                    <div>previous</div>
                    <div>next</div>
                </div>
                <div className={styles.pokemon_details_container}>
                    <div>
                        <Image src={pokemon.image} width={300} height={300} alt={pokemon.name} />
                        <div>
                            <h1 className={styles.title}>{zeroPad(pokemon.id, 3)} {captalize(pokemon.name)}</h1>
                            <p>
                                Tipo: {pokemon.types.map((item, index) => (<span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{captalize(item.type.name)}</span>))}
                            </p>
                            <p>Altura: <span>{pokemon.height * 10} cm</span></p>
                            <p>Peso: <span>{pokemon.weight / 10} kg</span></p>
                            <p>Evolui: <span></span></p>
                            <p>Sumario: <span></span></p>
                        </div>
                    </div>
                    <div className={styles.stats_container}>
                        {renderStat(pokemon.stats)}
                    </div>
                </div>
            </div>


            {/* <h1 className={styles.title}>{pokemon.name}</h1>
            <Image src={pokemon.image} width={300} height={300} alt={pokemon.name} />
            <div className={styles.number_container}>
                <h3>Numero:</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div>
                <h3>Tipo:</h3>
                <div className={styles.types_container}>
                    {pokemon.types.map((item, index) => (<span key={index} className={`${styles.type} ${styles['type_' + item.type.name]}`}>{item.type.name}</span>))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{pokemon.weight / 10} kg</p>
                </div>

            </div>
            <div className={styles.stats_container}>
                {renderStat(pokemon.stats)}
            </div> */}
        </div>
    )

}