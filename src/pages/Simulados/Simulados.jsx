import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Simulados.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';
import {
  FaFlask, FaCalculator, FaBook, FaGlobe,
  FaLandmark, FaPenFancy, FaAtom, FaDna, FaLanguage,
} from 'react-icons/fa';

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

const MATERIA_CONFIG = {
  'Química':    { icone: <FaFlask />,      cor: '#e67e22', bordaCor: 'rgba(230,126,34,0.35)',  bgCor: 'rgba(230,126,34,0.08)'  },
  'Matemática': { icone: <FaCalculator />, cor: '#3498db', bordaCor: 'rgba(52,152,219,0.35)',  bgCor: 'rgba(52,152,219,0.08)'  },
  'Literatura': { icone: <FaBook />,       cor: '#9b59b6', bordaCor: 'rgba(155,89,182,0.35)',  bgCor: 'rgba(155,89,182,0.08)'  },
  'Geografia':  { icone: <FaGlobe />,      cor: '#27ae60', bordaCor: 'rgba(39,174,96,0.35)',   bgCor: 'rgba(39,174,96,0.08)'   },
  'História':   { icone: <FaLandmark />,   cor: '#c0392b', bordaCor: 'rgba(192,57,43,0.35)',   bgCor: 'rgba(192,57,43,0.08)'   },
  'Redação':    { icone: <FaPenFancy />,   cor: '#D46475', bordaCor: 'rgba(212,100,117,0.35)', bgCor: 'rgba(212,100,117,0.08)' },
  'Física':     { icone: <FaAtom />,       cor: '#5B6BAF', bordaCor: 'rgba(91,107,175,0.35)',  bgCor: 'rgba(91,107,175,0.08)'  },
  'Biologia':   { icone: <FaDna />,        cor: '#16a085', bordaCor: 'rgba(22,160,133,0.35)',  bgCor: 'rgba(22,160,133,0.08)'  },
  'Inglês':     { icone: <FaLanguage />,   cor: '#2980b9', bordaCor: 'rgba(41,128,185,0.35)',  bgCor: 'rgba(41,128,185,0.08)'  },
  'Português':  { icone: <FaBook />,       cor: '#8e44ad', bordaCor: 'rgba(142,68,173,0.35)',  bgCor: 'rgba(142,68,173,0.08)'  },
};

const DEFAULT_CONFIG = {
  icone: <FaBook />,
  cor: '#5B6BAF',
  bordaCor: 'rgba(91,107,175,0.35)',
  bgCor: 'rgba(91,107,175,0.08)',
};

function getConfig(materia) {
  return MATERIA_CONFIG[materia] || DEFAULT_CONFIG;
}

export default function Simulados() {
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const t = texts[lang];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSimulado, setSelectedSimulado] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimulados = async () => {
      try {
        const response = await fetch('/api/simulados', {
          headers: { 'x-api-key': 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO' },
        });
        const data = await response.json();
        setAllQuestions(data);
      } catch (error) {
        console.error('Erro ao buscar simulados:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSimulados();
  }, []);

  const groupedSimulados = allQuestions.reduce((acc, item) => {
    const subject = item.materia;
    if (!acc[subject]) acc[subject] = { title: subject, count: 0, questions: [] };
    acc[subject].count += 1;
    acc[subject].questions.push(item);
    return acc;
  }, {});

  const simuladosList = Object.values(groupedSimulados).map((s) => ({
    title: s.title,
    questionsCount: `${s.count} ${t.perguntas}`,
    level: t.nivel,
    rawQuestions: s.questions,
  }));

  const filteredSimulados = simuladosList.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
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
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
              filteredSimulados.map((simulado, index) => {
                const cfg = getConfig(simulado.title);
                const isSelected = selectedSimulado?.title === simulado.title;
                return (
                  <div
                    key={index}
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
                    style={{
                      borderColor: isSelected ? cfg.bordaCor : undefined,
                      background: isSelected ? cfg.bgCor : undefined,
                    }}
                    onClick={() => setSelectedSimulado(simulado)}
                  >
                    <div
                      className={styles.cardIcone}
                      style={{ color: cfg.cor, background: cfg.bgCor, border: `1px solid ${cfg.bordaCor}` }}
                    >
                      {cfg.icone}
                    </div>
                    <h2 className={styles.cardTitulo}>{simulado.title}</h2>
                    <p className={styles.cardQuestoes}>{simulado.questionsCount}</p>
                    <p className={styles.cardNivel}>{simulado.level}</p>
                  </div>
                );
              })
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
                    onClick={() => navigate('/simulados/exame', { state: { simulado: selectedSimulado } })}
                    disabled={!selectedSimulado}
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
