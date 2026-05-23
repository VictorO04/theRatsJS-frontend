import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styles from './NotFound.module.css';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts = {
  "pt-br": {
    title: "Página não encontrada",
    description: "Talvez você tenha imaginado essa página.",
    buttonHome: "Voltar ao Início",
    home: "Página Principal",
    archive: "Acervo",
    exams: "Simulados",
    contact: "Contato",
    filmCredit: "Still do seu site",
    switchLang: "EN"
  },
  "en": {
    title: "Page not found",
    description: "Perhaps you imagined it.",
    buttonHome: "Go back home",
    home: "Home",
    archive: "Archive",
    exams: "Exams",
    contact: "Contact",
    filmCredit: "Still from your site",
    switchLang: "PT"
  }
};

export default function NotFound() {
  const { lang, toggleLanguage } = useContext(LanguageContext);

  return (
    <div className={styles.container}>
      <img
        src="https://i.ibb.co/nFbLj18/page-Not-Found.jpg"
        alt="Page not found"
        className={styles.filmStill}
      />

      <div className={styles.overlay}>
        <div className={styles.topText}>
          <div className={styles.topRow}>
            <p className={styles.errorMessage}>{texts[lang]?.title}</p>
            <button onClick={toggleLanguage} className={styles.languageButton}>
              {texts[lang]?.switchLang}
            </button>
          </div>
          <p className={styles.hint}>
            {texts[lang]?.description}{' '}
            <Link to="/contato" className={styles.contactLink}>
              {lang === 'pt-br' ? 'contato' : 'contact'}
            </Link>{' '}
            {lang === 'pt-br' ? 'se o problema persistir.' : 'us if the problem persists.'}
          </p>
        </div>

        <div className={styles.filmCredit}>{texts[lang]?.filmCredit}</div>
      </div>

      <div className={styles.navBar}>
        <Link to="/" className={styles.navLink}>{texts[lang]?.home}</Link>
        <span className={styles.dot}>·</span>
        <Link to="/acervo" className={styles.navLink}>{texts[lang]?.archive}</Link>
        <span className={styles.dot}>·</span>
        <Link to="/simulados" className={styles.navLink}>{texts[lang]?.exams}</Link>
        <span className={styles.dot}>·</span>
        <Link to="/contato" className={styles.navLink}>{texts[lang]?.contact}</Link>
      </div>
    </div>
  );
}