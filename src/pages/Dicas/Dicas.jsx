import { useState, useEffect, useContext } from 'react';
import styles from './Dicas.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = '/api/dicas';

export default function Dicas() {
    const { lang } = useContext(LanguageContext);
    const [dicas, setDicas] = useState([]);
    const [atual, setAtual] = useState(0);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const buscarDicas = async () => {
        setCarregando(true);
        setErro(null);

        try {
            const resposta = await fetch(API_URL);

            if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);

            const dados = await resposta.json();
            setDicas(dados);
        } catch (e) {
            setErro(e.message);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const carregar = async () => {
            await buscarDicas();
        };

        carregar();
    }, []);

    if (carregando) {
        return (
            <>
                <Menu />
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner} />
                </div>
            </>
        );
    }
    if (erro) return <p className={styles.erro}>{erro}</p>;

    const dica = dicas[atual];

    return (
        <>
            <div className={styles.pagina}>
                <Menu />
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.dicasEstudo}>
                            <span className={styles.ponto} />
                            {lang === 'en' ? 'Study tips' : 'Dicas de estudo'}
                        </div>
                        <h1 className={styles.titulo}>
                            {lang === 'en' ? (
                                <>
                                    Tips for the{' '}
                                    <span className={styles.destaque}>entrance exam</span>
                                </>
                            ) : (
                                <>
                                    Dicas para o <span className={styles.destaque}>vestibular</span>
                                </>
                            )}
                        </h1>
                        <p className={styles.subtitulo}>
                            {lang === 'en'
                                ? 'Practical tips to boost your performance.'
                                : 'Dicas práticas para potencializar seu desempenho.'}
                        </p>
                    </div>
                </section>

                <div className={styles.conteudo}>
                    <div className={styles.progressoTopo}>
                        <span className={styles.progressoTexto}>
                            {atual + 1} / {dicas.length}
                        </span>
                        <div className={styles.barraBg}>
                            <div
                                className={styles.barraFill}
                                style={{ width: `${((atual + 1) / dicas.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <div className={styles.flashcard}>
                        <div className={styles.flashFaixa} />
                        <div className={styles.flashConteudo}>
                            <span className={styles.flashTipo}>
                                {lang === 'en' ? dica.content : dica.conteudo}
                            </span>
                            <p className={styles.flashTexto}>
                                {lang === 'en' ? dica.tips : dica.dicas}
                            </p>
                            <span className={styles.flashId}>#{atual + 1}</span>
                        </div>
                    </div>

                    <div className={styles.navegacao}>
                        <button
                            className={styles.botaoNavegar}
                            onClick={() => setAtual(atual - 1)}
                            disabled={atual === 0}>
                            ← {lang === 'en' ? 'Previous' : 'Anterior'}
                        </button>
                        <button
                            className={styles.botaoNavAvancar}
                            onClick={() => setAtual(atual + 1)}
                            disabled={atual === dicas.length - 1}>
                            {lang === 'en' ? 'Next' : 'Próxima'} →
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
