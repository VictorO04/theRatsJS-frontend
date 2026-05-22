import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';
import Menu from '../../components/Menu/Menu';

export default function NotFound() {
  return (
    <>
      <Menu />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.background} />
          
          <div className={styles.inner}>
            <div className={styles.codigoErro}>404</div>
            
            <h1 className={styles.titulo}>Página não encontrada</h1>
            
            <p className={styles.descricao}>
              Parece que você se perdeu em um corredor escuro. A página que você está procurando não existe.
            </p>
            
            <div className={styles.imageContainer}>
              <img src="https://i.ibb.co/pjR01Z6g/groupe.webp" alt="The Rats" className={styles.imagem} />
            </div>
            
            <Link to="/" className={styles.botao}>
              Voltar ao Início
            </Link>
            
            <div className={styles.links}>
              <Link to="/acervo" className={styles.link}>Ir para Acervo</Link>
              <span className={styles.divisor}>·</span>
              <Link to="/simulados" className={styles.link}>Ir para Simulados</Link>
              <span className={styles.divisor}>·</span>
              <Link to="/contato" className={styles.link}>Contato</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
