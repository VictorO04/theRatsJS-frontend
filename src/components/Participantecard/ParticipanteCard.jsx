import styles from "./ParticipanteCard.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useContext } from "react";

function iniciais(nome) {
  return nome.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}


export default function ParticipanteCard({ participante }) {
  const { lang } = useContext(LanguageContext);

  const temFoto = participante.foto && !participante.foto.includes("[vamos");


  return (
    <div className={styles.cartao}>
      <div className={styles.faixa} />
      <div className={styles.corpo}>
        <div className={styles.topo}>
          {temFoto ? (
            <img className={styles.foto} src={participante.foto} alt={participante.nome} />
          ) : (
            <div className={styles.avatar}>{iniciais(participante.nome)}</div>
          )}
          <div>
            <p className={styles.nome}>{participante.nome}</p>
            <p className={styles.idade}>{lang === "pt-br" ? participante.idade : participante.age}</p>
          </div>
        </div>
        <hr className={styles.divisor} />
        <span className={styles.curso}>{lang === "pt-br" ? participante.curso : participante.curse}</span>
        <p className={styles.email}>{participante.email}</p>
      </div>
    </div>
  );
}
