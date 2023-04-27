import Image from 'next/image';
import Link from 'next/link';

import { zeroPad } from '@/utils/formaters';

import styles from './styles.module.css';
export default function Card({ nome, image, numero, types }) {
    function renderTypes(types) {
        return types.map(type => (<div className={styles[`text_${type.pokemon_v2_type.name}`]}>{type.pokemon_v2_type.name}</div>))
    }

    function renderImageIcon(types) {
        const tipo = types[0].pokemon_v2_type.name;
        return (<Image src={`https://kai-tw.github.io/PokeCard/icons/${tipo}.png`} width={100} height={100} alt={nome} />)
    }

    return (
        <Link className={styles.btn} href={`/pokemon/${numero}`}>

            <div className={styles.card}>
                <div className={styles.poke_container}>
                    <Image className={styles.poke_image} src={image} width={200} height={200} alt={nome} />
                    <div className={styles.background_pokeball}></div>
                    <div className={styles.pokeball_image}></div>
                </div>
                <div className={styles.poke_info}>
                    <div className={styles.poke_icon}>
                        {renderImageIcon(types)}
                    </div>
                    <div className={styles.poke_info_container}>
                        <div className={styles.poke_name}>{nome}</div>
                        <div className={styles.poke_id}>Nº {zeroPad(numero, 3)}</div>
                        <div className={styles.poke_type}>
                            {renderTypes(types)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}