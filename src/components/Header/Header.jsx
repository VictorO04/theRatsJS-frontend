import styles from "./Header.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { LiaLanguageSolid } from 'react-icons/lia';

const texts = {
    "pt-br": {
        home: "Página Principal",
        contato: "Contato",
        sobre: "Sobre Nós"
    },

    "en": {
        home: "Home",
        contato: "Contact",
        sobre: "About Us"
    }
}

function Header() {
    const { lang, toggleLanguage } = useContext(LanguageContext);


    return (
        <header className={styles.header}>
            <img
                className={styles.logo}
                src="https://i.ibb.co/5g1JwNBD/Gemini-Generated-Image-skjtrjskjtrjskjt-removebg-preview.png"
                alt="Logo do site"
            />

            <div className={styles.rightSection}>
                <nav className={styles.nav}>
                    <Link className={styles.link} to="/">
                        {texts[lang].home}
                    </Link>

                    <Link className={styles.link} to="/contato">
                        {texts[lang].contato}
                    </Link>

                    <Link className={styles.link} to="/sobre-nos">
                        {texts[lang].sobre}
                    </Link>
                </nav>

                <div className={styles.separator} />

                <button onClick={toggleLanguage} className={styles.languageButton}>
                    <LiaLanguageSolid size={20} />
                    {lang}
                </button>
            </div>

        </header>
    );
}

export default Header;
