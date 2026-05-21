import { useContext } from 'react';
import styles from './Acervo.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const text = {
    'pt-br': {
        titulo: 'Acervo',
        subtitulo:
            'Veja nosso acervo de livro, com títulos que caem constantemente em vestibulares.',
        livro1: 'Os Ratos',
        Autor1: 'Dyonélio Machado.',
        livro2: `Olhos d'água`,
        Autor2: 'Conceição Evaristo',
        livro3: 'A moreninha',
        Autor3: 'Joaquim Manuel de Macedo',
    },
    en: {
        titulo: 'Collection',
        subtitulo:
            'Check out our book collection, featuring titles that frequently appear on college entrance exams.',
    },
};

export default function Acervo() {
    const context = useContext(LanguageContext);
    const lang = context?.lang || 'pt-br';
    const t = text[lang] || text['pt-br'];

    if (!t) {
        console.error('Error crítico: Objeto de textos não encontrados para idioma:', lang);
        return <div style={{ color: 'white' }}>Carregando conteúdo...</div>;
    }

    return (
        <>
            <Menu />

            <div className={styles.pagina}>
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.pilula}>
                            <span className={styles.ponto} /> SENAI + SESI . 2026
                        </div>
                        <h1 className={styles.titulo}>
                            The Rats — <em className={styles.destaque}>{t.titulo}</em>
                        </h1>
                        <p className={styles.subtitulo}>{t.subtitulo}</p>
                    </div>
                </section>
                <section className={styles.livros}>
                    <div className={styles.livro}>
                        <img
                            src="https://m.media-amazon.com/images/I/A1djdtvC2gL.jpg"
                            alt={t.livro1}
                        />
                        <h2 className={styles.livro}>{t.livro1}</h2>
                        <p className={styles.Autor}>{t.Autor1}</p>
                        <button className={styles.botao}>Conferir</button>
                    </div>
                    <div className={styles.livro}>
                        <img
                            src="https://m.media-amazon.com/images/I/51RjYjNVpRL._AC_UF1000,1000_QL80_.jpg"
                            alt={t.livro2}
                        />
                        <h2 className={styles.livro}>{t.livro2}</h2>
                        <p className={styles.Autor}>{t.Autor2}</p>
                        <button className={styles.botao}>Conferir</button>
                    </div>
                    <div className={styles.livro}>
                        <img
                            src="https://m.media-amazon.com/images/I/61rqadtSs3S._AC_UF1000,1000_QL80_.jpg"
                            alt={t.livro3}
                        />
                        <h2 className={styles.livro}>{t.livro3}</h2>
                        <p className={styles.Autor}>{t.Autor3}</p>
                        <button className={styles.botao}>Conferir</button>
                    </div>
                </section>
            </div>
        </>
    );
}
