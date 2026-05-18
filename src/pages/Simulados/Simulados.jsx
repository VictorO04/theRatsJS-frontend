import { useContext, useState } from 'react';
import styles from './Simulados.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts = {
    'pt-br': {
        titulo: 'Simulados',
        subtitulo:
            'Veja a nossa lista de Simulados abaixo para dar início ou pesquise por disciplina:',
            cardTitulo1: 'Simulado com questões sobre os livros',
            cardQuestoes1: '15  Questões',
            cardNivel1: 'Nível Ensino Médio',
            cardTitulo2: 'Simulado com questões sobre Matemática',
            cardQuestoes2: '15  Questões',
            cardNivel2: 'Nível Ensino Médio',
            cardTitulo3: 'Simulado com questões sobre Português',
            cardQuestoes3: '15  Questões',
            cardNivel3: 'Nível Ensino Médio',
            cardTitulo4: 'Simulado com questões sobre História',
            cardQuestoes4: '15  Questões',
            cardNivel4: 'Nível Ensino Médio',
            cardTitulo5: 'Simulado com questões sobre Biologia',
            cardQuestoes5: '15  Questões',
            cardNivel5: 'Nível Ensino Médio',
            cardTitulo6: 'Simulado com questões sobre Fisíca',
            cardQuestoes6: '15  Questões',
            cardNivel6: 'Nível Ensino Médio',
            cardTitulo7: 'Simulado com questões sobre Química',
            cardQuestoes7: '15  Questões',
            cardNivel7: 'Nível Ensino Médio',
            cardTitulo8: 'Simulado com questões sobre Geografia',
            cardQuestoes8: '15  Questões',
            cardNivel8: 'Nível Ensino Médio',
            cardTitulo9: 'Simulado com questões sobre Ecologia',
            cardQuestoes9: '15  Questões',
            cardNivel9: 'Nível Ensino Médio',
            placeholderBusca: 'Digite uma disciplina ou tema',
            textoResultadoVazio: 'Nenhum simulado encontrado.',
    },
    en: {
        titulo: 'Practice Exams',
        subtitulo: 'See our list of Practice Exams below to get started or search by subject:',
        cardTitulo1: 'Practice exam with questions about the books',
        cardQuestoes1: '15  Questions',
        cardNivel1: 'High School Level',
        cardTitulo2: 'Practice exam with questions about Mathematics',
        cardQuestoes2: '15  Questions',
        cardNivel2: 'High School Level',
        cardTitulo3: 'Practice exam with questions about Portuguese',
        cardQuestoes3: '15  Questions',
        cardNivel3: 'High School Level',
        cardTitulo4: 'Practice exam with questions about History',
        cardQuestoes4: '15  Questions',
        cardNivel4: 'High School Level',
        cardTitulo5: 'Practice exam with questions about Biology',
        cardQuestoes5: '15  Questions',
        cardNivel5: 'High School Level',
        cardTitulo6: 'Practice exam with questions about Physics',
        cardQuestoes6: '15  Questions',
        cardNivel6: 'High School Level',
        cardTitulo7: 'Practice exam with questions about Chemistry',
        cardQuestoes7: '15  Questions',
        cardNivel7: 'High School Level',
        cardTitulo8: 'Practice exam with questions about Geography',
        cardQuestoes8: '15  Questions',
        cardNivel8: 'High School Level',
        cardTitulo9: 'Practice exam with questions about Ecology',
        cardQuestoes9: '15  Questions',
        cardNivel9: 'High School Level',
        placeholderBusca: 'Type a subject or topic',
        textoResultadoVazio: 'No practice exams found.',
    },
};

export default function Simulados() {
    const { lang } = useContext(LanguageContext);
    const t = texts[lang];
    const [searchTerm, setSearchTerm] = useState('');

    const simulados = [
        { title: t.cardTitulo1, questions: t.cardQuestoes1, level: t.cardNivel1 },
        { title: t.cardTitulo2, questions: t.cardQuestoes2, level: t.cardNivel2 },
        { title: t.cardTitulo3, questions: t.cardQuestoes3, level: t.cardNivel3 },
        { title: t.cardTitulo4, questions: t.cardQuestoes4, level: t.cardNivel4 },
        { title: t.cardTitulo5, questions: t.cardQuestoes5, level: t.cardNivel5 },
        { title: t.cardTitulo6, questions: t.cardQuestoes6, level: t.cardNivel6 },
        { title: t.cardTitulo7, questions: t.cardQuestoes7, level: t.cardNivel7 },
        { title: t.cardTitulo8, questions: t.cardQuestoes8, level: t.cardNivel8 },
        { title: t.cardTitulo9, questions: t.cardQuestoes9, level: t.cardNivel9 },
    ];

    const filteredSimulados =
        searchTerm.trim().length > 0
            ? simulados.filter((simulado) =>
                  simulado.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
              )
            : simulados;

    return (
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
                        <div className={styles.searchWrapper}>
                            <label htmlFor="simulados-search" className={styles.searchLabel}>
                                {t.labelBusca}
                            </label>
                            <input
                                id="simulados-search"
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder={t.placeholderBusca}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                </section>
                <section className={styles.cards}>
                    {filteredSimulados.length === 0 ? (
                        <p className={styles.noResults}>{t.textoResultadoVazio}</p>
                    ) : (
                        filteredSimulados.map((simulado, index) => (
                            <div className={styles.card} key={index}>
                                <h2 className={styles.cardTitulo}>{simulado.title}</h2>
                                <p className={styles.cardQuestoes}>{simulado.questions}</p>
                                <p className={styles.cardNivel}>{simulado.level}</p>
                            </div>
                        ))
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
}
