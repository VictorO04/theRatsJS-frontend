import styles from "./Footer.module.css";
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { SiPostman } from 'react-icons/si';
import { LanguageContext } from "../../contexts/LanguageContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const LOGO_DARK = "https://i.ibb.co/5g1JwNBD/Gemini-Generated-Image-skjtrjskjtrjskjt-removebg-preview.png";
const LOGO_LIGHT = "https://i.ibb.co/1f24Mb4Z/Gemini-Generated-Image-y93ys2y93ys2y93y-removebg-preview.png";

const text = {
  "pt-br": {
    descMarca: "Curte a gente na rede social e fique por dentro das novidades!",
    txtDevs: "Github DEVs",
    txtDocentes: "Docentes",
    txtContato: "Contato",
    txtSobre: "Sobre",
    linkContato: "Entre em contato",
    linkSobre: "Sobre nós",
    linkParticipantes: "Participantes",
    direitos: "© 2025 The Rats JS · Feito com ♥ pela equipe de desenvolvimento",
    tagL: "Literatura",
  },
  en: {
    descMarca: "Like us on social media and stay up to date with the latest news!",
    txtDevs: "Github DEVs",
    txtDocentes: "Teachers",
    txtContato: "Contact",
    txtSobre: "About",
    linkContato: "Get in touch",
    linkSobre: "About us",
    linkParticipantes: "Participants",
    direitos: "© 2025 The Rats JS · Made with ♥ by the development team",
    tagL: "Literature",
  },
};

export default function Footer() {
  const { theme } = useTheme();
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const t = text[lang] ?? text["pt-br"];

  return (
      <footer className={styles.footerRaiz}>
          <div className={styles.footerInterno}>
              <div className={styles.footerGrid}>
                  <div className={styles.footerMarca}>
                      <div className={styles.logoMarca}>
                          <img
                              src={theme === 'dark' ? LOGO_DARK : LOGO_LIGHT}
                              alt="Ícone da marca"
                              className={styles.iconeLogoMarca}
                          />
                      </div>
                      <p className={styles.descricaoMarca}>{t.descMarca}</p>
                      <div className={styles.fileiraSocial}>
                          <a
                              href="https://github.com/arthurmorais0227"
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.botaoSocial}>
                              <FaGithub />
                          </a>
                          <a
                              href="https://documenter.getpostman.com/view/48022417/2sBXqQHJQo"
                              target='_blank'
                              className={styles.botaoSocial}>
                              <SiPostman />
                          </a>
                          <a href="#" className={styles.botaoSocial}>
                              <FaLinkedin />
                          </a>
                          <a href="#" className={styles.botaoSocial}>
                              <FaDiscord />
                          </a>
                      </div>
                  </div>

                  <div>
                      <p className={styles.tituloColuna}>{t.txtDevs}</p>
                      <ul className={styles.listaLinks}>
                          <li>
                              <a
                                  href="https://github.com/arthurmorais0227"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  Arthur Morais
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://github.com/lisboathecoder"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  Gustavo Lisboa
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://github.com/Jvsilvagomes"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  João Silva
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://github.com/PedroUE"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  Pedro Urbano
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://github.com/Rafael-1108"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  Rafael Santos
                              </a>
                          </li>
                          <li>
                              <a
                                  href="https://github.com/VictorO04"
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  Victor Oliveira
                              </a>
                          </li>
                      </ul>
                  </div>

                  <div>
                      <p className={styles.tituloColuna}>{t.txtDocentes}</p>
                      <ul className={styles.listaLinks}>
                          <li>
                              <span>Eduardo Correia</span>
                          </li>
                          <li>
                              <span>Thiago Ferreira</span>
                          </li>
                          <li>
                              <span>Marcelo Carboni</span>
                          </li>
                          <li>
                              <span>Felipe Mamprim</span>
                          </li>
                          <li>
                              <span>Ivonete Parentes</span>
                          </li>
                          <li>
                              <span>Daniela Gueldini</span>
                          </li>
                      </ul>
                  </div>

                  <div>
                      <p className={styles.tituloColuna}>{t.txtContato}</p>
                      <ul className={styles.listaLinks}>
                          <li>
                              <span>contato@theratsjs.com</span>
                          </li>
                          <li>
                              <span>(11) 1234-5678</span>
                          </li>
                          <li>
                              <span>Valinhos, São Paulo — Brasil</span>
                          </li>
                      </ul>
                      <div className={styles.botoesNav}>
                          <button className={styles.botaoNav} onClick={() => navigate('/contato')}>
                              {t.linkContato} →
                          </button>
                          <button
                              className={styles.botaoNav}
                              onClick={() => navigate('/sobre-nos')}>
                              {t.linkSobre} →
                          </button>
                      </div>
                  </div>
              </div>

              <div className={styles.espacador} />
              <hr className={styles.divisor} />

              <div className={styles.barraInferior}>
                  <p className={styles.direitos}>{t.direitos}</p>
                  <div className={styles.fileiraTags}>
                      <span className={`${styles.tag} ${styles.tagAzul}`}>backend</span>
                      <span className={`${styles.tag} ${styles.tagRose}`}>{t.tagL}</span>
                      <span className={styles.tag}>frontend</span>
                  </div>
              </div>
          </div>
      </footer>
  );
}
