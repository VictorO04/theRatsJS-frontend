import { useContext } from 'react';
import styles from './Simulados.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts= {
    "pt-br": {
        titulo: "Simulados",
        subtitulo: "Veja a nossa lista de Simulados abaixo para dar início ou pesquise por disciplina:",
        cardTitulo1: "Simulado com questões sobre os livros",
        cardQuestoes1: "15  Questões",
        cardNivel1: "Nível Ensino Médio",
        cardTitulo2: "Simulado com questões sobre Matemática",
        cardQuestoes2: "15  Questões",
        cardNivel2: "Nível Ensino Médio",
        cardTitulo3: "Simulado com questões sobre Português",
        cardQuestoes3: "15  Questões",
        cardNivel3: "Nível Ensino Médio",
        cardTitulo4: "Simulado com questões sobre História",
        cardQuestoes4: "15  Questões",
        cardNivel4: "Nível Ensino Médio",
        cardTitulo5: "Simulado com questões sobre Biologia",
        cardQuestoes5: "15  Questões",
        cardNivel5: "Nível Ensino Médio",
        cardTitulo6: "Simulado com questões sobre Fisíca",
        cardQuestoes6: "15  Questões",
        cardNivel6: "Nível Ensino Médio",
        cardTitulo7: "Simulado com questões sobre Química",
        cardQuestoes7: "15  Questões",
        cardNivel7: "Nível Ensino Médio",
        cardTitulo8: "Simulado com questões sobre Geografia",
        cardQuestoes8: "15  Questões",
        cardNivel8: "Nível Ensino Médio",
        cardTitulo9: "Simulado com questões sobre Ecologia",
        cardQuestoes9: "15  Questões",
        cardNivel9: "Nível Ensino Médio",
    },
    "en": {
        titulo: "Practice Exams",
        subtitulo: "See our list of Practice Exams below to get started or search by subject:",
        cardTitulo1: "Practice exam with questions about the books",
        cardQuestoes1: "15  Questions",
        cardNivel1: "High School Level",
        cardTitulo2: "Practice exam with questions about Mathematics",
        cardQuestoes2: "15  Questions",
        cardNivel2: "High School Level",
        cardTitulo3: "Practice exam with questions about Portuguese",
        cardQuestoes3: "15  Questions",
        cardNivel3: "High School Level",
        cardTitulo4: "Practice exam with questions about History",
        cardQuestoes4: "15  Questions",
        cardNivel4: "High School Level",
        cardTitulo5: "Practice exam with questions about Biology",
        cardQuestoes5: "15  Questions",
        cardNivel5: "High School Level",
        cardTitulo6: "Practice exam with questions about Physics",
        cardQuestoes6: "15  Questions",
        cardNivel6: "High School Level",
        cardTitulo7: "Practice exam with questions about Chemistry",
        cardQuestoes7: "15  Questions",
        cardNivel7: "High School Level",
        cardTitulo8: "Practice exam with questions about Geography",
        cardQuestoes8: "15  Questions",
        cardNivel8: "High School Level",
        cardTitulo9: "Practice exam with questions about Ecology",
        cardQuestoes9: "15  Questions",
        cardNivel9: "High School Level",
    }
}

export default function Simulados() {
    const { lang } = useContext(LanguageContext);
    const t = texts[lang];

    return(
        <>
        <Header />
        <Menu />

        <div className={styles.pagina}>

            <section className={styles.hero}>
                <div className={styles.heroFundo} />
                <div className={styles.heroConteudo}>
                    <div className={styles.pilula}>
                        <span className={styles.ponto} /> SENAI + SESI · 2026
                    </div>
                    <h1 className={styles.titulo}>
                        The Rats — <em className={styles.destaque}>{t.titulo}</em>
                    </h1>
                    <p className={styles.subtitulo}>{t.subtitulo}</p>
                </div>
            </section>
            <section className={styles.cards}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo1}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes1}</p>
                    <p className={styles.cardNivel}>{t.cardNivel1}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo2}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes2}</p>
                    <p className={styles.cardNivel}>{t.cardNivel2}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo3}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes3}</p>
                    <p className={styles.cardNivel}>{t.cardNivel3}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo4}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes4}</p>
                    <p className={styles.cardNivel}>{t.cardNivel4}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo5}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes5}</p>
                    <p className={styles.cardNivel}>{t.cardNivel5}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo6}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes6}</p>
                    <p className={styles.cardNivel}>{t.cardNivel6}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo7}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes7}</p>
                    <p className={styles.cardNivel}>{t.cardNivel7}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo8}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes8}</p>
                    <p className={styles.cardNivel}>{t.cardNivel8}</p>
                </div>
                <div className={styles.card}>
                    <h2 className={styles.cardTitulo}>{t.cardTitulo9}</h2>
                    <p className={styles.cardQuestoes}>{t.cardQuestoes9}</p>
                    <p className={styles.cardNivel}>{t.cardNivel9}</p>
                </div>
            </section>
        </div>
        <Footer />
        </>
    )
}
