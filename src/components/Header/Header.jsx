import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { FiMenu } from 'react-icons/fi';
import { LiaLanguageSolid } from 'react-icons/lia';

function Header() {
    return (
        <header>
            <div className={styles.iconesHeader}>
                <button className={styles.barraLateral}>
                    <FiMenu size={20} />
                </button>
                <img className={styles.logo} src="../../../public/logo-preto.png" alt="" />
            </div>

            <div className={styles.navContainer}>
                <nav>
                    <Link className={styles.textoNav} to="/">
                        Página principal
                    </Link>
                    <Link className={styles.textoNav} to="/contato">
                        Contato
                    </Link>
                    <Link className={styles.textoNav} to="/sobre-nos">
                        Sobre Nós
                    </Link>
                </nav>

                <div className={styles.separador}></div>

                <button className={styles.troca}>
                    <LiaLanguageSolid size={20} />
                    pt-br
                </button>
            </div>
        </header>
    );
}

export default Header;
