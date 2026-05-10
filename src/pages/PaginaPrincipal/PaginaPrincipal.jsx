import styles from "./PaginaPrincipal.module.css"
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from "../../contexts/LanguageContext";

import { useContext } from "react";

const texts = {
    "pt-br": {
        h1: "Seja bem-vindo ao The RatsJS, o destino definitivo para amantes de literatura."
    },
    "en": {
        h1: "Welcome to The RatsJS, the ultimate destination for literature lovers."
    }
}

function PaginaPrincipal() {
    const { lang } = useContext(LanguageContext);

    return (
        <>
            <Header />
            <Menu />
            <main>
                <h1 className={styles.textoBemVindo}>
                    {texts[lang].h1}
                </h1>
            </main>
            <Footer />
        </>
    );
}


export default PaginaPrincipal;


