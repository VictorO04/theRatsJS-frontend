import styles from "./PaginaPrincipal.module.css";
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from "../../contexts/LanguageContext";

import { useContext, useEffect, useState } from "react";

const texts = {
    "pt-br": {
        h1: "Seja bem-vindo ao The RatsJS, o destino definitivo para amantes de literatura.",
        h2: "Escolha sua próxima leitura",
        destaque: "DESTAQUE",
        conhecerLivro: "Conhecer o livro",
        verDetalhes: "Ver detalhes",
        livrosDisponiveis: "+ 1.000 Livros disponíveis"
    },
    "en": {
        h1: "Welcome to The RatsJS, the ultimate destination for literature lovers.",
        h2: "Choose your next reading",
        destaque: "FEATURED",
        conhecerLivro: "Check the book",
        verDetalhes: "See details",
        livrosDisponiveis: "+ 1,000 books available"
    }
};

function PaginaPrincipal() {
    const { lang } = useContext(LanguageContext);
    const [destaque, setDestaque] = useState(null);
    const [livros, setLivros] = useState([]);

    useEffect(() => {
        // Puxando o livro de destaque do banco
        const fetchLivroDestaque = async () => {
            const res = await fetch('/api/livros/destaque'); // endpoint do seu backend
            const data = await res.json();
            setDestaque(data);
        };

        // Puxando os outros livros de uma API externa
        const fetchLivrosAPI = async () => {
            const res = await fetch('https://api.exemplo.com/livros');
            const data = await res.json();
            setLivros(data);
        };

        fetchLivroDestaque();
        fetchLivrosAPI();
    }, []);

    return (
        <>
            <Header />
            <Menu />
            <main className={styles.main}>
                {/* Texto de boas-vindas */}
                <h1 className={styles.textoBemVindo}>{texts[lang].h1}</h1>

                {/* Destaque */}
                {destaque && (
                    <section className={styles.destaque}>
                        <div className={styles.destaqueInfo}>
                            <span className={styles.destaqueLabel}>{texts[lang].destaque}</span>
                            <h2 className={styles.tituloDestaque}>{destaque.titulo}</h2>
                            <p className={styles.sinopseDestaque}>{destaque.sinopse}</p>
                            <button className={styles.botaoDestaque}>
                                {texts[lang].conhecerLivro}
                            </button>
                        </div>
                        <div className={styles.destaqueImagem}>
                            <img src={destaque.imagem} alt={destaque.titulo} />
                        </div>
                        <div className={styles.livrosDisponiveis}>
                            {texts[lang].livrosDisponiveis} 📚
                        </div>
                    </section>
                )}

                {/* Lista de livros */}
                <section className={styles.listaLivros}>
                    <h2>{texts[lang].h2}</h2>
                    <div className={styles.cardsLivros}>
                        {livros.map(livro => (
                            <div key={livro.id} className={styles.cardLivro}>
                                <img src={livro.imagem} alt={livro.titulo} />
                                <h3>{livro.titulo}</h3>
                                <button className={styles.botaoVerDetalhes}>
                                    {texts[lang].verDetalhes}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default PaginaPrincipal;