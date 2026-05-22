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

// ── Mapeamento de Matérias em Português ──
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

// ── Tradução de Nomes de Matérias ──
const TRADUCAO_MATERIAS = {
  'Química': { en: 'Chemistry' },
  'Matemática': { en: 'Mathematics' },
  'Literatura': { en: 'Literature' },
  'Geografia': { en: 'Geography' },
  'História': { en: 'History' },
  'Redação': { en: 'Writing' },
  'Física': { en: 'Physics' },
  'Biologia': { en: 'Biology' },
  'Inglês': { en: 'English' },
  'Português': { en: 'Portuguese' },
};

const DEFAULT_CONFIG = {
  icone: <FaBook />,
  cor: '#5B6BAF',
  bordaCor: 'rgba(91,107,175,0.35)',
  bgCor: 'rgba(91,107,175,0.08)',
};

/**
 * Obtém a configuração de cor e ícone para uma matéria
 * @param {string} materia - Nome da matéria em português
 * @returns {object} Configuração com ícone, cores e bordas
 */
function getConfig(materia) {
  return MATERIA_CONFIG[materia] || DEFAULT_CONFIG;
}

/**
 * Traduz o nome da matéria conforme o idioma selecionado
 * @param {string} materia - Nome da matéria em português
 * @param {string} idioma - Código do idioma ('pt-br' ou 'en')
 * @returns {string} Nome da matéria traduzido
 */
function traduzirMateria(materia, idioma) {
  if (idioma === 'pt-br') return materia;
  return TRADUCAO_MATERIAS[materia]?.en || materia;
}

export default function Simulados() {
  // ── Contexto e Navegação ──
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const traducoes = texts[lang];

  // ── Estados ──
  const [termoBusca, setTermoBusca] = useState('');
  const [simuladoSelecionado, setSimuladoSelecionado] = useState(null);
  const [todasAsQuestoes, setTodasAsQuestoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarSimulados = async () => {
      try {
        const resposta = await fetch('/api/simulados', {
          headers: { 'x-api-key': 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO' },
        });
        const dados = await resposta.json();
        setTodasAsQuestoes(dados);
      } catch (erro) {
        console.error('Erro ao buscar simulados:', erro);
      } finally {
        setCarregando(false);
      }
    };
    carregarSimulados();
  }, []);

  const simuladosAgrupados = todasAsQuestoes.reduce((acumulador, item) => {
    const disciplina = item.materia;
    if (!acumulador[disciplina]) {
      acumulador[disciplina] = { titulo: disciplina, quantidade: 0, questoes: [] };
    }
    acumulador[disciplina].quantidade += 1;
    acumulador[disciplina].questoes.push(item);
    return acumulador;
  }, {});

  const listaSimulados = Object.values(simuladosAgrupados).map(grupo => ({
    tituloOriginal: grupo.titulo,
    titulo: traduzirMateria(grupo.titulo, lang),
    quantidadeQuestoes: `${grupo.quantidade} ${traducoes.perguntas}`,
    nivel: traducoes.nivel,
    questoesRaw: grupo.questoes,
  }));

  const simuladosFiltrados = listaSimulados.filter(simulado =>
    simulado.titulo.toLowerCase().includes(termoBusca.trim().toLowerCase())
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
              The Rats — <em className={styles.destaque}>{traducoes.titulo}</em>
            </h1>
            <p className={styles.subtitulo}>{traducoes.subtitulo}</p>
            <div className={styles.searchWrapper}>
              <input
                type="search"
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                placeholder={traducoes.placeholderBusca}
                className={styles.searchInput}
                aria-label="Buscar disciplina ou tema"
              />
            </div>
          </div>
        </section>

        <section className={`${styles.cardsSection} ${simuladoSelecionado ? styles.withDetails : styles.noDetails}`}>
          <div className={styles.cards}>
            {carregando ? (
              <p className={styles.noResults}>{traducoes.carregando}</p>
            ) : simuladosFiltrados.length === 0 ? (
              <p className={styles.noResults}>{traducoes.textoResultadoVazio}</p>
            ) : (
              simuladosFiltrados.map((simulado, indice) => {
                const configuracao = getConfig(simulado.tituloOriginal);
                const ehSelecionado = simuladoSelecionado?.titulo === simulado.titulo;
                return (
                  <div
                    key={indice}
                    className={`${styles.card} ${ehSelecionado ? styles.cardSelected : ''}`}
                    style={{
                      borderColor: ehSelecionado ? configuracao.bordaCor : undefined,
                      background: ehSelecionado ? configuracao.bgCor : undefined,
                    }}
                    onClick={() => setSimuladoSelecionado(simulado)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => e.key === 'Enter' && setSimuladoSelecionado(simulado)}
                  >
                    <div
                      className={styles.cardIcone}
                      style={{ color: configuracao.cor, background: configuracao.bgCor, border: `1px solid ${configuracao.bordaCor}` }}
                    >
                      {configuracao.icone}
                    </div>
                    <h2 className={styles.cardTitulo}>{simulado.titulo}</h2>
                    <p className={styles.cardQuestoes}>{simulado.quantidadeQuestoes}</p>
                    <p className={styles.cardNivel}>{simulado.nivel}</p>
                  </div>
                );
              })
            )}
          </div>

          {simuladoSelecionado && (
            <aside className={styles.detailsPanel}>
              <div className={styles.detailsCard}>
                <div className={styles.detailsHeader}>
                  <div>
                    <p className={styles.detailsLabel}>{traducoes.detalhesTitulo}</p>
                    <h2 className={styles.detailsTitle}>{simuladoSelecionado.titulo}</h2>
                    <p className={styles.detailsInfo}>
                      {simuladoSelecionado.quantidadeQuestoes} · {simuladoSelecionado.nivel}
                    </p>
                  </div>
                  <button
                    className={styles.startButton}
                    onClick={() => navigate('/simulados/exame', { state: { simulado: simuladoSelecionado } })}
                    disabled={!simuladoSelecionado}
                    aria-label={`Iniciar simulado de ${simuladoSelecionado.titulo}`}
                  >
                    {traducoes.iniciar}
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
