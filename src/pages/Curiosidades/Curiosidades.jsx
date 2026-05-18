import { useState, useEffect, useContext } from 'react';
import styles from './Curiosidades.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = '/api/curiosidades';
const API_KEY = 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO';

export default function Curiosidades() {
    const { lang } = useContext(LanguageContext);
    const [curiosidades, setCuriosidades] = useState([]);
    const [atual, setAtual] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const buscarCuriosidades = async () => {
        setCarregando(true);
        setErro(null);

        try {
            const resposta = await fetch(API_URL, {
                headers: { 'x-api-key': API_KEY },
            });

            if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

            const dados = await resposta.json();
            setCuriosidades(dados);
        } catch (e) {
            setErro(e.message);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const carregar = async () => {
            await buscarCuriosidades();
        };
        carregar();
    }, []);

    if (carregando) return <div className={styles.spinner} />;
    if (erro) return <p className={styles.erro}>{erro}</p>;

    const curiosidade = curiosidades[atual];

    return (
        <>
            <div className={styles.pagina}>
                <Header />
                <Menu />
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.curiosidades}>
                            <span />
                            {lang === 'en' ? 'Curiosidades' : 'Curiosities'}
                        </div>
                        <h1 className={styles.titulo}>
                            {lang === 'en' ? (
                                <>
                                    The Rats -<span className={styles.destaque}> curiosities</span>
                                </>
                            ) : (
                                <>
                                    Os Ratos -<span className={styles.destaque}>curiosidades</span>
                                </>
                            )}
                        </h1>
                        <p className={styles.subtitulo}>
                            {lang === 'en'
                                ? 'Discover some general facts about school subjects and the book The Rats!'
                                : 'Conheça algumas curiosidades gerais sobre matérias da escola e sobre o livro Os Ratos!'}
                        </p>
                    </div>
                </section>

                <div className={styles.conteudo}>
                    <div className={styles.progressoTopo}>
                        <span className={styles.progressoTexto}>
                            {atual + 1} / {curiosidades.length}
                        </span>
                        <div className={styles.barraBg}>
                            <div
                                className={styles.barraFill}
                                style={{ width: `${((atual + 1) / curiosidades.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className={styles.flashcard}>
                        <div className={styles.flashFaixa} />
                        <div className={styles.flashConteudo}>
                            <span className={styles.flashTipo}>
                                {lang === 'en' ? curiosidade.content : curiosidade.conteudo}
                            </span>
                            <p className={styles.flashTexto}>
                                {lang === 'en' ? curiosidade.curiosity : curiosidade.curiosidade}
                            </p>
                            <span className={styles.flashId}>#{atual + 1}</span>
                        </div>
                    </div>

                    <div className={styles.navegacao}>
                        <button
                            className={styles.botaoNavegar}
                            onClick={() => setAtual(atual - 1)}
                            disabled={atual === 0}>
                            {lang === 'en' ? 'Previous' : 'Anterior'}
                        </button>
                        <button
                            className={styles.botaoNavAvancar}
                            onClick={() => setAtual(atual + 1)}
                            disabled={atual === curiosidades.length - 1}>
                            {lang === 'en' ? 'Next' : 'Próxima'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
