import { useContext } from 'react';
import styles from './Simulados.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts= {
    "pt-br": {
        titulo: "Videos Aulas",
        subtitulo: "Aprenda com nossas video-aulas! Veja a seguir nossa lista de videos e reviews sobre os livros",
        tituloVideo1: "Titulo do Video 1",
        subtituloVideo1: "Subtitulo do Video 1",
        descricaoVideo1: "Descrição do video 1",
        tituloVideo2: "Titulo do Video 2",
        subtituloVideo2: "Subtitulo do video 2",
        descricaoVideo2: "Descrição do video 2",
        tituloVideo3: "Titulo do video 3",
        subtituloVideo3: "Subtitulo do Video 3",
        descricaoVideo3: "Descrição do video 3",
        tituloVideo4: "Titulo do video 4",
        subtituloVideo4: "Subtitulo do video 4",
        descricaoVideo4: "Descrição do video 4"

    }
}

export default function Videos() {
    const { lang } = useContext(LanguageContext);
    const t = texts[lang];

    return (
        <>
            <Header />
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
                <section className={styles.videos}>
                    <div className={styles.video}>
                        <iframe src="https://youtube.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo1}</h2>
                        <p className={styles.subtituloVideo}>{t.subtituloVideo1}</p>
                        <p className={styles.descricao}>{t.descricaoVideo1}</p>
                    </div>
                    <div className={styles.video}>
                        <iframe src="https://youtube.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo2}</h2>
                        <p className={styles.subtituloVideo}>{t.subtituloVideo2}</p>
                        <p className={styles.descricao}>{t.descricaoVideo2}</p>
                    </div>
                    <div className={styles.video}>
                        <iframe src="https://youtube.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo3}</h2>
                        <p className={styles.subtituloVideo}>{t.subtituloVideo3}</p>
                        <p className={styles.descricao}>{t.descricaoVideo3}</p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
