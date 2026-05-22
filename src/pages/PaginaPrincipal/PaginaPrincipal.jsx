import { useState, useEffect, useContext } from "react";
import { createPortal } from "react-dom";
import styles from "./PaginaPrincipal.module.css";
import Menu from "../../components/Menu/Menu";
import { LanguageContext } from "../../contexts/LanguageContext";

const API_URL = "/api/livros";
const API_KEY = "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

export default function PaginaPrincipal() {
  const { lang } = useContext(LanguageContext);
  const [livro, setLivro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [personagens, setPersonagens] = useState([]);
  const [carregandoPersonagens, setCarregandoPersonagens] = useState(true);
  const [erroPersonagens, setErroPersonagens] = useState(null);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);

  useEffect(() => {
    const buscarLivro = async () => {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(API_URL, {
          headers: { "x-api-key": API_KEY },
        });
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
        const dados = await resposta.json();
        const osRatos = dados.find((l) => l.id === 1);
        setLivro(osRatos ?? dados[0]);
      } catch (e) {
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    };

    const buscarPersonagens = async () => {
      setCarregandoPersonagens(true);
      setErroPersonagens(null);
      try {
        const resposta = await fetch("/api/personagens", {
          headers: { "x-api-key": API_KEY },
        });
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
        const dados = await resposta.json();
        setPersonagens(Array.isArray(dados) ? dados : dados.data ?? []);
      } catch (e) {
        setErroPersonagens(e.message);
      } finally {
        setCarregandoPersonagens(false);
      }
    };

    buscarLivro();
    buscarPersonagens();
  }, []);

  if (carregando) {
    return (
      <div className={styles.pagina}>
        <Menu />
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
        </div>
      </div>
    );
  }

  if (erro || !livro) {
    return (
      <div className={styles.pagina}>
        <Menu />
        <p className={styles.erro}>{erro ?? "Livro não encontrado."}</p>
      </div>
    );
  }

  const titulo = lang === "en" ? "The Rats" : "Os Ratos";
  const genero = lang === "en" ? livro.genero_en : livro.genero;
  const resumo = lang === "en" ? livro.resumo_en : livro.resumo;
  const autor = lang === "en" ? livro.autor_en : livro.autor;
  const verossimilhanca = lang === "en" ? livro.verossimilhanca_en : livro.verossimilhanca;
  const enredo = lang === "en" ? livro.enredo_en : livro.enredo;
  const conclusao = lang === "en" ? livro.conclusao_en : livro.conclusao;
  const caracteristicasLiterarias = lang === "en" ? livro.caracteristicasLiterarias_en : livro.caracteristicasLiterarias;
  const estiloEscrita = lang === "en" ? livro.estiloEscrita_en : livro.estiloEscrita;
  const contexto = lang === "en" ? livro.contexto_en : livro.contexto;
  const anoPublicacao = lang === "en" ? livro.anoPublicacao_en : livro.anoPublicacao;
  const detalhesAutor = lang === "en" ? livro.detalhesAutor_en : livro.detalhesAutor;

  return (
    <div className={styles.pagina}>
      <Menu />

      <section className={styles.hero}>
        <div className={styles.heroFundo} />
        <div className={styles.heroConteudo}>
          <div className={styles.heroTop}>
            <div className={styles.heroTexto}>
              <div className={styles.badge}>
                <span className={styles.ponto} />
                {lang === "en" ? "Featured work" : "Obra em destaque"}
              </div>

              <h1 className={styles.titulo}>
                {titulo} —{" "}
                <span className={styles.destaque}>{autor}</span>
              </h1>

              <p className={styles.subtitulo}>{resumo}</p>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{lang === "en" ? "Author" : "Autor"}</span>
                  <span className={styles.metaValor}>{autor}</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{lang === "en" ? "Year" : "Ano"}</span>
                  <span className={styles.metaValor}>{anoPublicacao}</span>
                </div>
                <div className={styles.metaDivider} />
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{lang === "en" ? "Genre" : "Gênero"}</span>
                  <span className={styles.metaValor}>{genero}</span>
                </div>
              </div>
            </div>

            <div className={styles.capaWrapper}>
              <div className={styles.capaGlow} />
              <img
                src={livro.capa}
                alt={`Capa do livro ${livro.titulo}`}
                className={styles.capa}
              />
            </div>
          </div>

          <div className={styles.heroDetails}>
            <div className={styles.featureCard}>
              <h2 className={styles.featureTitle}>{lang === "en" ? "Plot" : "Enredo"}</h2>
              <p>{enredo}</p>
            </div>

            <div className={styles.smallInfoRow}>
              <div className={styles.smallInfo}>
                <span className={styles.smallLabel}>{lang === "en" ? "Writing style" : "Estilo de escrita"}</span>
                <p>{estiloEscrita}</p>
              </div>
              <div className={styles.smallInfo}>
                <span className={styles.smallLabel}>{lang === "en" ? "Reality" : "Verossimilhança"}</span>
                <p>{verossimilhanca}</p>
              </div>
              <div className={styles.smallInfo}>
                <span className={styles.smallLabel}>{lang === "en" ? "Literary traits" : "Características literárias"}</span>
                <p>{caracteristicasLiterarias}</p>
              </div>
            </div>

            <div className={styles.gridSecondary}>
              <div className={styles.blocoWide}>
                <h2 className={styles.blocoTitulo}>{lang === "en" ? "Context" : "Contexto"}</h2>
                <p>{contexto}</p>
              </div>
              <div className={styles.sideColumn}>
                <div className={styles.bloco}>
                  <h2 className={styles.blocoTitulo}>{lang === "en" ? "Author notes" : "Sobre o autor"}</h2>
                  <p>{detalhesAutor}</p>
                </div>
                <div className={styles.blocoAlt}>
                  <h2 className={styles.blocoTitulo}>{lang === "en" ? "Conclusion" : "Conclusão"}</h2>
                  <p>{conclusao}</p>
                </div>
              </div>
            </div>
          </div>

          <section className={styles.personagensSection}>
            <div className={styles.personagensHeader}>
              <h2>{lang === "en" ? "Characters" : "Personagens"}</h2>
              {carregandoPersonagens && (
                <span className={styles.personagensLoading}>
                  {lang === "en" ? "Loading characters..." : "Carregando personagens..."}
                </span>
              )}
            </div>

            {erroPersonagens ? (
              <p className={styles.erro}>{erroPersonagens}</p>
            ) : (
              <div className={styles.personagensGrid}>
                {personagens.map((personagem) => (
                  <button
                    key={personagem.id}
                    className={styles.personagemCard}
                    type="button"
                    onClick={() => setPersonagemSelecionado(personagem)}
                  >
                    <span className={styles.personagemNome}>
                      {personagem.nome || personagem.name || "Personagem"}
                    </span>
                    {(personagem.papel || personagem.role) && (
                      <span className={styles.personagemFuncao}>
                        {personagem.papel || personagem.role}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </section>

          {personagemSelecionado &&
            createPortal(
              <div className={styles.personagemOverlay} onClick={() => setPersonagemSelecionado(null)}>
                <div className={styles.personagemModal} onClick={(e) => e.stopPropagation()}>
                  <button
                    className={styles.personagemClose}
                    type="button"
                    onClick={() => setPersonagemSelecionado(null)}
                  >
                    ✕
                  </button>
                  <h2 className={styles.personagemModalTitle}>
                    {personagemSelecionado.nome || personagemSelecionado.name || (lang === "en" ? "Character details" : "Detalhes do personagem")}
                  </h2>
                  <div className={styles.personagemModalBody}>
                    {Object.entries(personagemSelecionado)
                      .filter(([key]) => !["id", "nome", "name", "papel", "role"].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className={styles.personagemField}>
                          <span className={styles.personagemFieldLabel}>
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (letter) => letter.toUpperCase())}
                          </span>
                          <p className={styles.personagemFieldValue}>
                            {Array.isArray(value)
                              ? value.join(", ")
                              : typeof value === "object" && value !== null
                              ? JSON.stringify(value, null, 2)
                              : String(value)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>
      </section>
    </div>
  );
}