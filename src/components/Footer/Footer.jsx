import styles from "./Footer.module.css";
import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaDiscord
} from "react-icons/fa";
import { LanguageContext } from '../../contexts/LanguageContext';
import { useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext';  

const LOGO_DARK = "https://i.ibb.co/5g1JwNBD/Gemini-Generated-Image-skjtrjskjtrjskjt-removebg-preview.png";
const LOGO_LIGHT = "https://i.ibb.co/1f24Mb4Z/Gemini-Generated-Image-y93ys2y93ys2y93y-removebg-preview.png";


const text = {
    'pt-br': {
        descMarca: 'Curte a gente na rede social e fique por dentro das novidades!',
        txtDocentes: 'Docentes',
        txtContato: 'Entre em contato',
        direitos: '© 2025 The rats JS · Feito com  ♥  pela equipe de desenvolvimento',
        tagL: "Literatura"
    },
    en: {
        descMarca: 'Like us on social media and stay up to date with the latest news!',
        txtDocentes: 'teachers',
        txtContato: 'get in touch',
        direitos: '© 2025 The rats JS · Made with ♥ by the development team',
        tagL: "Literature"
    },
};

export default function Footer() {
    const { theme } = useTheme();
    const { lang } = useContext(LanguageContext);
    const t = text[lang];

    return (
        <footer className={styles.footerRaiz}>
            <div className={styles.footerInterno}>


                <div className={styles.footerGrid}>


                    {/* Coluna da marca */}
                    <div className={styles.footerMarca}>
                        <div className={styles.logoMarca}>
                            <img
                                src={theme === "dark" ? LOGO_DARK : LOGO_LIGHT}
                                alt="Ícone da marca"
                                className={styles.iconeLogoMarca}
                            />
                            <span className={styles.nomeMarca}>The Rats JS</span>
                        </div>
                        <p className={styles.descricaoMarca}>{t.descMarca}</p>
                        <div className={styles.fileiraSocial}>
                            <a href="https://github.com/arthurmorais0227" target="_blank" rel="noopener noreferrer">
                                <div className={styles.botaoSocial}>
                                    <FaGithub />
                                </div>
                            </a>


                            <div className={styles.botaoSocial}>
                                <FaInstagram />
                            </div>


                            <div className={styles.botaoSocial}>
                                <FaLinkedin />
                            </div>


                            <div className={styles.botaoSocial}>
                                <FaDiscord />
                            </div>
                        </div>
                    </div>


                    {/* Coluna 1 */}
                    <div>
                        <p className={styles.tituloColuna}>Github DEVs</p>
                        <ul className={styles.listaLinks}>
                            <li><a href="https://github.com/arthurmorais0227" target="_blank" rel="noopener noreferrer">Arthur Morais</a></li>
                            <li><a href="https://github.com/lisboathecoder" target="_blank" rel="noopener noreferrer">Gustavo Lisboa</a></li>
                            <li><a href="https://github.com/Jvsilvagomes" target="_blank" rel="noopener noreferrer">João Silva</a></li>
                            <li><a href="https://github.com/PedroUE" target="_blank" rel="noopener noreferrer">Pedro Urbano</a></li>
                            <li><a href="https://github.com/Rafael-1108" target="_blank" rel="noopener noreferrer">Rafael Santos</a></li>
                            <li><a href="https://github.com/VictorO04" target="_blank" rel="noopener noreferrer">Victor Oliveira</a></li>
                        </ul>
                    </div>


                    {/* Coluna 2 */}
                    <div>
                        <p className={styles.tituloColuna}>{t.txtDocentes}</p>
                        <ul className={styles.listaLinks}>
                            <li><span>Eduardo Correia</span></li>
                            <li><span>Thiago Ferreira</span></li>
                            <li><span>Marcelo Carboni</span></li>
                            <li><span>Felipe Mamprim</span></li>
                            <li><span>Ivonete Parentes</span></li>
                            <li><span>Daniela Gueldini</span></li>
                        </ul>
                    </div>


                    {/* Coluna 3 */}
                    <div>
                        <p className={styles.tituloColuna}>{t.txtContato}</p>
                        <ul className={styles.listaLinks}>
                            <li><span>contato@theratsjs.com</span></li>
                            <li><span>(11) 1234-5678</span></li>
                            <li><span>Rua Exemplo, 123 - São Paulo/SP</span></li>
                        </ul>
                    </div>


                </div>


                <div className={styles.espacador} />
                <hr className={styles.divisor} />


                {/* Barra inferior */}
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
