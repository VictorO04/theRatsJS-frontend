import { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    const buscar = async () => {
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
    buscar();
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

  const genero = lang === "en" ? livro.genero_en : livro.genero;
  const resumo = lang === "en" ? livro.resumo_en : livro.resumo;

  return (
    <div className={styles.pagina}>
      <Menu />

      <section className={styles.hero}>
        <div className={styles.heroFundo} />
        <div className={styles.heroConteudo}>
          <div className={styles.heroTexto}>
            <div className={styles.badge}>
              <span className={styles.ponto} />
              {lang === "en" ? "Featured work" : "Obra em destaque"}
            </div>

            <h1 className={styles.titulo}>
              {livro.titulo} —{" "}
              <span className={styles.destaque}>{livro.autor}</span>
            </h1>

            <p className={styles.subtitulo}>{resumo}</p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{lang === "en" ? "Author" : "Autor"}</span>
                <span className={styles.metaValor}>{livro.autor}</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{lang === "en" ? "Year" : "Ano"}</span>
                <span className={styles.metaValor}>{livro.anoPublicacao}</span>
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
      </section>
    </div>
  );
}