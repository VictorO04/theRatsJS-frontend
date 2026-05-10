import styles from "./ParticipanteCard.module.css";


function iniciais(nome) {
  return nome.split(" ").slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}


export default function ParticipanteCard({ participante }) {
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
            <p className={styles.idade}>{participante.idade}</p>
          </div>
        </div>
        <hr className={styles.divisor} />
        <span className={styles.curso}>{participante.curso}</span>
        <p className={styles.email}>{participante.email}</p>
      </div>
    </div>
  );
}
