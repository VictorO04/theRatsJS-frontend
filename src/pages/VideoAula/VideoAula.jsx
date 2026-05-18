import { useContext } from 'react';
import styles from './VideoAula.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts = {
    'pt-br': {
        titulo: 'Videos Aulas',
        Subtitulo: 'Aprenda com nossas video-aulas! Veja a seguir nossa lista de videos e reviews sobre os livros',
        tituloVideo1: 'Titulo do Video 1',
        Materia1: 'Matéria',
        descricaoVideo1: 'Descrição do video 1',
        tituloVideo2: 'Titulo do Video 2',
        Materia2: 'Matéria',
        descricaoVideo2: 'Descrição do video 2',
        tituloVideo3: 'Titulo do video 3',
        Materia3: 'Matéria',
        descricaoVideo3: 'Descrição do video 3',
        tituloVideo4: 'Titulo do video 4',
        Materia4: 'Matéria',
        descricaoVideo4: 'Descrição do video 4',
    },
    en: {
        titulo: 'Video lesson',
        Subtitulo: 'Learn with our video lessons! See below our list of videos and book reviews',
        tituloVideo1: 'Video 1 Title',
        Materia1: 'Study material',
        descricaoVideo1: 'Video 1 Description',
        tituloVideo2: 'Video 2 Title',
        Materia2: 'Study material',
        descricaoVideo2: 'Video 2 Description',
        tituloVideo3: 'Video 3 Title',
        Materia3: 'Study material',
        descricaoVideo3: 'Video 3 Description',
        tituloVideo4: 'Video 4 Title',
        Materia4: 'Study material',
        descricaoVideo4: 'Video 4 Description',
    },
};

export default function Videos() {
    const context = useContext(LanguageContext);
    const lang = context?.lang || "pt-br"
    const t = texts[lang] || texts["pt-br"]

    if (!t) {
        console.error('Erro crítico: Objeto de textos não encontrado para o idioma:', lang);
        return <div style={{ color: 'white' }}>Carregando conteúdo...</div>;
    }

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
                        <p className={styles.Subtitulo}>{t.Subtitulo}</p>
                    </div>
                </section>
                <section className={styles.videos}>
                    <div className={styles.video}>
                        <iframe src="https://video1.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo1}</h2>
                        <p className={styles.Materia}>{t.Materia1}</p>
                        <p className={styles.descricao}>{t.descricaoVideo1}</p>
                    </div>
                    <div className={styles.video}>
                        <iframe src="https://video1.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo2}</h2>
                        <p className={styles.Materia}>{t.Materia2}</p>
                        <p className={styles.descricao}>{t.descricaoVideo2}</p>
                    </div>
                    <div className={styles.video}>
                        <iframe src="https://video1.com"></iframe>
                        <h2 className={styles.tituloVideo}>{t.tituloVideo3}</h2>
                        <p className={styles.Materia}>{t.Materia3}</p>
                        <p className={styles.descricao}>{t.descricaoVideo3}</p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
