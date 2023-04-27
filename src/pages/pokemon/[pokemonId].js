import Image from 'next/image';
import styles from '@/styles/pokemon.module.css';


const zeroPad = (num, count) => {
    var numZeropad = num + '';
    while (numZeropad.length < count) {
        numZeropad = "0" + numZeropad;
    }
    return numZeropad;
}

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

    return { props: { pokemon: data } };
};


export default function Pokemons({ pokemon }) {
    return (
        <div className={styles.pokemon_container}>
            <h1 className={styles.title}>{pokemon.name}</h1>
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
        </div>
    )

}