import Imagem from "next/image";
import Link from "next/link";
import { Tipos } from "@/components/Tipos";
import styles from "./style.module.css";
import { zeroPad } from "@/utils/formaters";


export function SideBarElement({ imagem, numero, nome, tipos }) {
    function renderTipos(tipos){
        return tipos.map((tipo) => (<Tipos key={tipo} tipo={tipo} width={30} height={30} />));
    }
    return (
        <Link href={`/pokedex/${numero}`}>
            <div className={styles.container}>
                <div>
                    <Imagem
                        src={imagem}
                        width={60}
                        height={60}
                        alt={nome}
                    />
                </div>
                <div className={styles.info_container}>
                    <span >{zeroPad(numero)}</span>
                    <span className={styles.info_container_nome}>{nome}</span>
                    <div className={styles.info_container_tipo}>
                        {renderTipos(tipos)}
                    </div>
                </div>
            </div>
        </Link>
    );
}