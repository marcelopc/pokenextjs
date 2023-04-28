import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from 'next/router';
import styles from './navbar.module.css';

const RedirectTo = ({children, href}) => {
    const router = useRouter()
    const style =  router.asPath === href ? styles.active : styles.inactive;

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href)
      }

    return (<Link href={href} onClick={handleClick} className={style}>{children}</Link>)
}

export default function Navbar(){


    return(<nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link href="/">
                <Image src="/images/logo.svg" width="240" height="80" alt="pokeball"/>
            </Link>
        </div>
        <ul className={styles.link_items}>
            <li>
                <RedirectTo href="/">Home</RedirectTo>
            </li>
            <li>
                <RedirectTo href="/pokedex">Pokedex</RedirectTo>
            </li>
            <li>
                <RedirectTo href="/about">Sobre</RedirectTo>
            </li>
        </ul>
    </nav>)
}