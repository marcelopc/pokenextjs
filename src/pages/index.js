import Image from 'next/image'
import Link from 'next/link';
import styles from '@/styles/home.module.css'

export default function Home() {

  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <h1>A Enciclopédia definitiva de Pokémons</h1>
        <h3>Descubra tudo sobre seus Pokémons favoritos e se torne um verdadeiro Mestre Pokémon!</h3>
        <h3>Comece a explorar agora!</h3>
        <Link href="/pokedex" className={styles.button}>Começar</Link>
      </div>
      <div className={styles.image_container}>
        <Image
          src="/images/dragonite.png"
          alt="Dragonite"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
