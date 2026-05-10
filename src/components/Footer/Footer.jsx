import styles from "./Footer.module.css";
import {
    FaGithub,
    FaInstagram,
    FaLinkedin,
    FaDiscord
} from "react-icons/fa";


export default function Rodape() {
    return (
        <footer className={styles.rodapeRaiz}>
            <div className={styles.rodapeInterno}>


                <div className={styles.rodapeGrid}>


                    {/* Coluna da marca */}
                    <div className={styles.rodapeMarca}>
                        <div className={styles.logoMarca}>
                            <img
                                src="https://i.ibb.co/5g1JwNBD/Gemini-Generated-Image-skjtrjskjtrjskjt-removebg-preview.png"
                                alt="Ícone da marca"
                                className={styles.iconeLogoMarca}
                            />
                            <span className={styles.nomeMarca}>The Rats JS</span>
                        </div>
                        <p className={styles.descricaoMarca}>
                            Curte a gente na rede social e fique por dentro das novidades!
                        </p>
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
                        <p className={styles.tituloColuna}>Docentes</p>
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
                        <p className={styles.tituloColuna}>Entre em contato</p>
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
                    <p className={styles.direitos}>
                        © 2025 The rats JS · Feito com  ♥  por pela equipe de desenvolvimento
                    </p>
                    <div className={styles.fileiraTags}>
                        <span className={`${styles.tag} ${styles.tagAzul}`}>backend</span>
                        <span className={`${styles.tag} ${styles.tagRose}`}>literatura</span>
                        <span className={styles.tag}>frontend</span>
                    </div>
                </div>


            </div>
        </footer>
    );
}
