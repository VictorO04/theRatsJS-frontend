import styles from "./Header.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { useTheme } from '../../contexts/ThemeContext';

import { LiaLanguageSolid } from 'react-icons/lia';

const LOGO_DARK = "https://i.ibb.co/5g1JwNBD/Gemini-Generated-Image-skjtrjskjtrjskjt-removebg-preview.png";
const LOGO_LIGHT = "https://i.ibb.co/1f24Mb4Z/Gemini-Generated-Image-y93ys2y93ys2y93y-removebg-preview.png";

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
    const { theme } = useTheme();


    return (
        <header className={styles.header}>
            <img
                src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
                alt="Ícone da marca"
                className={styles.logo}
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
