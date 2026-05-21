import { useContext } from "react";
import styles from "./PaginaPrincipal.module.css";
import Menu from "../../components/Menu/Menu";
import { LanguageContext } from "../../contexts/LanguageContext";

export default function Home() {
  const { lang } = useContext(LanguageContext);

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
              Os Ratos —{" "}
              <span className={styles.destaque}>Dyonélio Machado</span>
            </h1>

            <p className={styles.subtitulo}>
              {lang === "en"
                ? "The novel follows a single day in the life of Naziazeno Barbosa, a public servant living in Porto Alegre who is desperately trying to find 53 mil-réis to pay the milkman. The narrative plunges into the protagonist's existential anguish and physical exhaustion as he wanders the city in search of an impossible loan."
                : "O livro acompanha um único dia na vida de Naziazeno Barbosa, um funcionário público que vive em Porto Alegre e está desesperado para conseguir 53 mil-réis para pagar o leiteiro. A narrativa mergulha na angústia existencial e no cansaço físico do protagonista enquanto ele percorre a cidade em busca de um empréstimo impossível."}
            </p>

            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{lang === "en" ? "Author" : "Autor"}</span>
                <span className={styles.metaValor}>Dyonélio Machado</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{lang === "en" ? "Year" : "Ano"}</span>
                <span className={styles.metaValor}>1935</span>
              </div>
              <div className={styles.metaDivider} />
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>{lang === "en" ? "Genre" : "Gênero"}</span>
                <span className={styles.metaValor}>{lang === "en" ? "Modernist novel" : "Romance modernista"}</span>
              </div>
            </div>
          </div>

          <div className={styles.capaWrapper}>
            <div className={styles.capaGlow} />
            <img
              
              alt="Capa do livro Os Ratos"
              className={styles.capa}
            />
          </div>
        </div>
      </section>
    </div>
  );
}