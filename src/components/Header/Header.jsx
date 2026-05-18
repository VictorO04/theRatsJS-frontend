import styles from "./Header.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { LiaLanguageSolid } from 'react-icons/lia';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

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
<<<<<<< HEAD
=======
    const { theme, toggle } = useTheme();
>>>>>>> 3dc62aeab0ca045f5b392f4eefd8e152f6267a0a


    return (
        <header className={styles.header}>
            <img
<<<<<<< HEAD
=======
                src={theme === 'dark' ? LOGO_DARK : LOGO_LIGHT}
                alt="Ícone da marca"
>>>>>>> 3dc62aeab0ca045f5b392f4eefd8e152f6267a0a
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

                <button className={styles.botaoTema} onClick={toggle}>
                    {theme === 'dark' ? <MdLightMode size={17} /> : <MdDarkMode size={17} />}
                </button>

                <button onClick={toggleLanguage} className={styles.languageButton}>
                    <LiaLanguageSolid size={20} />
                    {lang}
                </button>
            </div>
        </header>
    );
}

export default Header;
