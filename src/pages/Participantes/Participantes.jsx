import { useState, useEffect, useContext } from "react";
import ParticipanteCard from "../../components/Participantecard/ParticipanteCard";
import styles from "./Participantes.module.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Menu from "../../components/Menu/Menu";
import { LanguageContext } from "../../contexts/LanguageContext";

const API_URL = "/api/participantes/";
const API_KEY = "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

const texts = {
  "pt-br": {
    titulo: "Quem nós somos?",
    subtitulo: `Uma equipe de estudantes de Desenvolvimento de Sistemas que uniu código, literatura e inglês para criar uma plataforma bilíngue sobre a obra Os Ratos, de Dyonélio Machado.`,
    integrantes: "Integrantes",
    idioma: "Idiomas",
    grandeObra: "Grande obra",
    rotulo: "Sobre o projeto",
    tituloSecao: "Tecnologia a serviço da literatura",
    texto1: "O TheRatsJS nasceu da integração entre a prática técnica de programação do SENAI e o domínio literário em Português e Inglês do SESI. O resultado éuma ferramenta colaborativa e bilíngue que prepara o estudante para ovestibular e para o mercado de trabalho.",
    texto2: "Nossa plataforma aprofunda a análise de Os Ratos com resumos, personagens, simulados, videoaulas e curiosidades — tudo em dois idiomas.",
    cardTitulo1: "Objetivo",
    cardTexto1: "Plataforma web unindo programação, literatura e inglês.",
    cardTitulo2: "Público-alvo",
    cardTexto2: "Estudantes da rede SESI/SENAI em preparação para o vestibular.",
    cardTitulo3: "Obra central",
    cardTexto3: "Os Ratos, de Dyonélio Machado — análise completa e bilíngue.",
    rotuloParticipantes: "O time",
    tituloSecaoParticipantes: "Conheça os integrantes",
    totalSecaoParticipantes: "participante",
    spinner: "Carregando integrantes...",
    estadoErro: "Não foi possível carregar os integrantes.",
    botaoTentar: "Tentar novamente"
  },
  "en": {
    titulo: "Who are we?",
    subtitulo: `A team of Systems Development students who brought together code, literature, and English to create a bilingual platform about the work The Rats, by Dyonélio Machado.`,
    integrantes: "Members",
    idioma: "Languages",
    grandeObra: "Great work",
    rotulo: "About the project",
    tituloSecao: "Technology in the service of literature",
    texto1: "The RatsJS was born from the integration between the technical programming practice of SENAI and the literary proficiency in Portuguese and English of SESI. The result is a collaborative, bilingual tool that prepares students for entrance exams and the job market.",
    texto2: "Our platform deepens the analysis of The Rats with summaries, characters, practice exams, video lessons, and curiosities — all in two languages.",
    cardTitulo1: "Objective",
    cardTexto1: "Web platform combining programming, literature, and English.",
    cardTitulo2: "Target audience",
    cardTexto2: "Students from the SESI/SENAI network preparing for entrance exams.",
    cardTitulo3: "Central work",
    cardTexto3: "The Rats, by Dyonélio Machado — complete bilingual analysis.",
    rotuloParticipantes: "The team",
    tituloSecaoParticipantes: "Meet the team members",
    totalSecaoParticipantes: "participant",
    spinner: "Loading members...",
    estadoErro: "Unable to load the members.",
    botaoTentar: "Try again"
  }
}


export default function Participantes() {
  const { lang } = useContext(LanguageContext);
  const t = texts[lang];

  const [participantes, setParticipantes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);


  const buscarParticipantes = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch(API_URL, {
        headers: { "x-api-key": API_KEY },
      });

      if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

      const dados = await resposta.json();
      setParticipantes(dados);
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  };


  useEffect(() => {
    async function carregarParticipantes() {
      await buscarParticipantes();

    }
    carregarParticipantes();
  }, []);

  const plural = participantes.length !== 1 ? "s" : "";


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
            <div className={styles.stats}>
              <div><span className={styles.statNumero}>{carregando ? "—" : participantes.length}</span><span className={styles.statRotulo}>{t.integrantes}</span></div>
              <div><span className={styles.statNumero}>2</span><span className={styles.statRotulo}>{t.idioma}</span></div>
              <div><span className={styles.statNumero}>1</span><span className={styles.statRotulo}>{t.grandeObra}</span></div>
            </div>
          </div>
        </section>


        <section className={styles.sobre}>
          <div className={styles.sobreGrid}>
            <div>
              <p className={styles.rotulo}>{t.rotulo}</p>
              <h2 className={styles.tituloSecao}>{t.tituloSecao}</h2>
              <p className={styles.texto}>{t.texto1}</p>
              <p className={styles.texto}>{t.texto2}</p>
            </div>
            <div className={styles.sobreCards}>
              <div className={styles.card}>
                <p className={styles.cardTitulo}>{t.cardTitulo1}</p>
                <p className={styles.cardTexto}>{t.cardTexto1}</p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitulo}>{t.cardTitulo2}</p>
                <p className={styles.cardTexto}>{t.cardTexto2}</p>
              </div>
              <div className={`${styles.card} ${styles.cardRose}`}>
                <p className={styles.cardTitulo}>{t.cardTitulo3}</p>
                <p className={styles.cardTexto}>{t.cardTexto3}</p>
              </div>
            </div>
          </div>
        </section>


        <section className={styles.secaoParticipantes}>
          <div className={styles.cabecalho}>
            <div>
              <p className={styles.rotulo}>{t.rotuloParticipantes}</p>
              <h2 className={styles.tituloSecao}>{t.tituloSecaoParticipantes}</h2>
            </div>
            {!carregando && !erro && (
              <span className={styles.contador}>{participantes.length} {t.totalSecaoParticipantes}{plural}</span>
            )}
          </div>


          {carregando && (
            <div className={styles.estadoCarregando}>
              <div className={styles.spinner} />{t.spinner}</div>
          )}


          {erro && (
            <div className={styles.estadoErro}>
              {t.estadoErro}
              <p>{erro}</p>
              <button className={styles.botaoTentar} onClick={buscarParticipantes}>{t.botaoTentar}</button>
            </div>
          )}


          {!carregando && !erro && (
            <div className={styles.grade}>
              {participantes.map((p) => (
                <ParticipanteCard key={p.id} participante={p} />
              ))}
            </div>
          )}
        </section>


      </div>
      <Footer />
    </>
  );
}
