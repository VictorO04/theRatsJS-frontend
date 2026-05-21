import { useContext, useState, useEffect } from 'react';
import styles from './Simulados.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts = {
    'pt-br': {
        titulo: 'Simulados',
        subtitulo: 'Veja a nossa lista de Simulados abaixo para dar início ou pesquise por disciplina:',
        detalhesTitulo: 'Detalhes do Simulado',
        iniciar: 'Iniciar',
        perguntas: 'perguntas',
        nivel: 'Nível Ensino Médio',
        placeholderBusca: 'Digite uma disciplina ou tema',
        textoResultadoVazio: 'Nenhum simulado encontrado.',
        carregando: 'Carregando simulados...',
    },
    en: {
        titulo: 'Practice Exams',
        subtitulo: 'See our list of Practice Exams below to get started or search by subject:',
        detalhesTitulo: 'Exam details',
        iniciar: 'Start',
        perguntas: 'questions',
        nivel: 'High School Level',
        placeholderBusca: 'Type a subject or topic',
        textoResultadoVazio: 'No practice exams found.',
        carregando: 'Loading exams...',
    },
};

export default function Simulados() {
    const { lang } = useContext(LanguageContext);
    const t = texts[lang];
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSimulado, setSelectedSimulado] = useState(null);
    const [allQuestions, setAllQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSimulados = async () => {
            try {
                const response = await fetch("/api/simulados", {
                    headers: {
                        "Authorization": "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO"
                    }
                });
                const data = await response.json();
                setAllQuestions(data);
            } catch (error) {
                console.error("Erro ao buscar simulados:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSimulados();
    }, []);

    const groupedSimulados = allQuestions.reduce((acc, item) => {
        const subject = item.materia;
        if (!acc[subject]) {
            acc[subject] = {
                title: subject,
                count: 0,
                questions: []
            };
        }
        acc[subject].count += 1;
        acc[subject].questions.push(item);
        return acc;
    }, {});

    const simuladosList = Object.values(groupedSimulados).map(s => ({
        title: s.title,
        questionsCount: `${s.count} ${t.perguntas}`,
        level: t.nivel,
        rawQuestions: s.questions
    }));

    const filteredSimulados = simuladosList.filter((simulado) =>
        simulado.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );

    return (
        <>
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

                <section className={`${styles.cardsSection} ${selectedSimulado ? styles.withDetails : styles.noDetails}`}>
                    <div className={styles.cards}>
                        {loading ? (
                            <p className={styles.noResults}>{t.carregando}</p>
                        ) : filteredSimulados.length === 0 ? (
                            <p className={styles.noResults}>{t.textoResultadoVazio}</p>
                        ) : (
                            filteredSimulados.map((simulado, index) => (
                                <div
                                    className={`${styles.card} ${selectedSimulado?.title === simulado.title ? styles.cardSelected : ''}`}
                                    key={index}
                                    onClick={() => setSelectedSimulado(simulado)}
                                >
                                    <h2 className={styles.cardTitulo}>{simulado.title}</h2>
                                    <p className={styles.cardQuestoes}>{simulado.questionsCount}</p>
                                    <p className={styles.cardNivel}>{simulado.level}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {selectedSimulado && (
                        <aside className={styles.detailsPanel}>
                            <div className={styles.detailsCard}>
                                <div className={styles.detailsHeader}>
                                    <div>
                                        <p className={styles.detailsLabel}>{t.detalhesTitulo}</p>
                                        <h2 className={styles.detailsTitle}>{selectedSimulado.title}</h2>
                                        <p className={styles.detailsInfo}>
                                            {selectedSimulado.questionsCount} · {selectedSimulado.level}
                                        </p>
                                    </div>
                                    <button 
                                        className={styles.startButton}
                                        onClick={() => console.log("Iniciando com:", selectedSimulado.rawQuestions)}
                                    >
                                        {t.iniciar}
                                    </button>
                                </div>
                            </div>
                        </aside>
                    )}
                </section>
            </div>
        </>
    );
}