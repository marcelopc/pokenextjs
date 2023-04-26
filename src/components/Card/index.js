import Image from 'next/image';
import Link from 'next/link';

import styles from './styles.module.css';

export default function Card({ nome, image, numero }) {
    return (
        <div className={styles.card}>
            <Image src={image} width={300 } height={300 }/>
            <p className={styles.id}>#{numero}</p>
            <h3 className={styles.title}>{nome}</h3>
            <Link className={styles.btn} href={`/pokemon/${numero}`}>Ver mais</Link>
        </div>
    );
}