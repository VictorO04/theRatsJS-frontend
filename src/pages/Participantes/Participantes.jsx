import { useState, useEffect } from "react";
import ParticipanteCard from "../../components/Participantecard/ParticipanteCard";
import styles from "./Participantes.module.css";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


const API_URL = "/api/participantes";
const API_KEY = "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";


export default function Participantes() {
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
    buscarParticipantes();
  }, []);


  return (
    <>
      <Header />


      <div className={styles.pagina}>


        <section className={styles.hero}>
          <div className={styles.heroFundo} />
          <div className={styles.heroConteudo}>
            <div className={styles.pilula}>
              <span className={styles.ponto} /> SENAI + SESI · 2026
            </div>
            <h1 className={styles.titulo}>
              The Rats — <em className={styles.destaque}>quem somos nós</em>
            </h1>
            <p className={styles.subtitulo}>
              Uma equipe de estudantes de Desenvolvimento de Sistemas que uniu código,
              literatura e inglês para criar uma plataforma bilíngue sobre a obra{" "}
              <em>Os Ratos</em>, de Dyonélio Machado.
            </p>
            <div className={styles.stats}>
              <div><span className={styles.statNumero}>{carregando ? "—" : participantes.length}</span><span className={styles.statRotulo}>Integrantes</span></div>
              <div><span className={styles.statNumero}>2</span><span className={styles.statRotulo}>Idiomas</span></div>
              <div><span className={styles.statNumero}>1</span><span className={styles.statRotulo}>Grande obra</span></div>
            </div>
          </div>
        </section>


        <section className={styles.sobre}>
          <div className={styles.sobreGrid}>
            <div>
              <p className={styles.rotulo}>Sobre o projeto</p>
              <h2 className={styles.tituloSecao}>Tecnologia a serviço da literatura</h2>
              <p className={styles.texto}>
                O TheRatsJS nasceu da integração entre a prática técnica de programação do
                SENAI e o domínio literário em Português e Inglês do SESI. O resultado é
                uma ferramenta colaborativa e bilíngue que prepara o estudante para o
                vestibular e para o mercado de trabalho.
              </p>
              <p className={styles.texto}>
                Nossa plataforma aprofunda a análise de <em>Os Ratos</em> com resumos,
                personagens, simulados, videoaulas e curiosidades — tudo em dois idiomas.
              </p>
            </div>
            <div className={styles.sobreCards}>
              <div className={styles.card}>
                <p className={styles.cardTitulo}>Objetivo</p>
                <p className={styles.cardTexto}>Plataforma web unindo programação, literatura e inglês.</p>
              </div>
              <div className={styles.card}>
                <p className={styles.cardTitulo}>Público-alvo</p>
                <p className={styles.cardTexto}>Estudantes da rede SESI/SENAI em preparação para o vestibular.</p>
              </div>
              <div className={`${styles.card} ${styles.cardRose}`}>
                <p className={styles.cardTitulo}>Obra central</p>
                <p className={styles.cardTexto}><em>Os Ratos</em>, de Dyonélio Machado — análise completa e bilíngue.</p>
              </div>
            </div>
          </div>
        </section>


        <section className={styles.secaoParticipantes}>
          <div className={styles.cabecalho}>
            <div>
              <p className={styles.rotulo}>O time</p>
              <h2 className={styles.tituloSecao}>Conheça os integrantes</h2>
            </div>
            {!carregando && !erro && (
              <span className={styles.contador}>{participantes.length} participante{participantes.length !== 1 ? "s" : ""}</span>
            )}
          </div>


          {carregando && (
            <div className={styles.estadoCarregando}>
              <div className={styles.spinner} />
              Carregando integrantes...
            </div>
          )}


          {erro && (
            <div className={styles.estadoErro}>
              Não foi possível carregar os integrantes.
              <p>{erro}</p>
              <button className={styles.botaoTentar} onClick={buscarParticipantes}>
                Tentar novamente
              </button>
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
