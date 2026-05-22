import { useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Acervo.module.css';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = '/api/biblioteca';
const API_KEY = 'Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO';

const texts = {
    'pt-br': {
        titulo: 'Acervo',
        subtitulo: 'Explore obras indispensáveis para os vestibulares e aprofunde seus conhecimentos com clássicos da literatura que marcaram gerações. Para saber mais sobre o livro "Os Ratos", acesse a página de Início.',
        acessar: 'Conferir',
        carregando: 'Carregando acervo..',
        resumo: 'Resumo',
        enredo: 'Enredo',
        contexto: 'Contexto histórico',
        autor: 'Sobre o autor',
        conclusao: 'Conclusão',
        personagens: 'Personagens',
    },
    en: {
        titulo: 'Collection',
        subtitulo: 'Explore essential works for college entrance exams and dive into literary classics that have inspired generations. To know more about the book "Os Ratos", access the Home page.',
        acessar: 'View',
        carregando: 'Loading collection...',
        resumo: 'Summary',
        enredo: 'Plot',
        contexto: 'Historical context',
        autor: 'About the author',
        conclusao: 'Conclusion',
        personagens: 'Characters',
    },
};

function Modal({ livro, lang, t, onFechar }) {
    const pt = lang === 'pt-br';
    const personagens = Array.isArray(livro.personagens)
        ? livro.personagens
        : typeof livro.personagens === 'string'
            ? livro.personagens.split(',').map(p => p.trim())
            : [];

    return createPortal(
        <div className={styles.popup} onClick={onFechar}>
            <div className={styles.detalhes} onClick={e => e.stopPropagation()}>
                <div className={styles.detalhesFaixa} />
                <div className={styles.detalhesCorpo}>

                    <div className={styles.detalhesHeader}>
                        <div className={styles.detalhesTopo}>
                            <img className={styles.detalhesCapa} src={livro.capa} alt={livro.titulo} />
                            <div>
                                <p className={styles.detalhesAno}>{livro.anoPublicacao}</p>
                                <h2 className={styles.detalhesTitulo}>{livro.titulo}</h2>
                                <p className={styles.detalhesAutorNome}>{livro.autor}</p>
                                <div className={styles.detalhesTags}>
                                    {(pt ? livro.genero : livro.genero_en)?.split(',').map((g, i) => (
                                        <span key={i} className={`${styles.tag} ${i === 0 ? styles.tagRose : ''}`}>
                                            {g.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className={styles.botaoFechar} onClick={onFechar}>✕</button>
                    </div>

                    <hr className={styles.divisor} />

                    <div className={styles.detalhesSecoes}>
                        <div className={styles.detalhesSecao}>
                            <p className={styles.secaoRotulo}>{t.resumo}</p>
                            <p className={styles.secaoTexto}>{pt ? livro.resumo : livro.resumo_en}</p>
                        </div>

                        <div className={styles.detalhesDupla}>
                            <div className={styles.detalhesCard}>
                                <p className={styles.detalhesCardTitulo}>{t.enredo}</p>
                                <p className={styles.detalhesCardTexto}>{pt ? livro.enredo : livro.enredo_en}</p>
                            </div>
                            <div className={styles.detalhesCard}>
                                <p className={styles.detalhesCardTitulo}>{t.contexto}</p>
                                <p className={styles.detalhesCardTexto}>{pt ? livro.contexto : livro.contexto_en}</p>
                            </div>
                        </div>

                        {personagens.length > 0 && (
                            <div className={styles.detalhesSecao}>
                                <p className={styles.secaoRotulo}>{t.personagens}</p>
                                <div className={styles.pills}>
                                    {personagens.map((p, i) => (
                                        <span key={i} className={styles.pill}>{p}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className={styles.detalhesSecao}>
                            <p className={styles.secaoRotulo}>{t.autor}</p>
                            <p className={styles.secaoTexto}>{pt ? livro.detalhesAutor : livro.detalhesAutor_en}</p>
                        </div>

                        <div className={styles.detalhesSecao}>
                            <p className={styles.secaoRotulo}>{t.conclusao}</p>
                            <p className={styles.secaoTexto}>{pt ? livro.conclusao : livro.conclusao_en}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>,
        document.body
    );
}

export default function Acervo() {
    const { lang } = useContext(LanguageContext);
    const t = texts[lang] || texts['pt-br'];

    const [livros, setLivros] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [selecionado, setSelecionado] = useState(null);
    const [carregandoDetalhe, setCarregandoDetalhe] = useState(false);

    useEffect(() => {
        const buscar = async () => {
            try {
                const res = await fetch(API_URL, { headers: { 'x-api-key': API_KEY } });
                if (!res.ok) throw new Error(`Erro ${res.status}`);
                const dados = await res.json();
                setLivros(Array.isArray(dados) ? dados.filter(l => l.titulo) : []);
            } catch (e) {
                setErro(e.message);
            } finally {
                setCarregando(false);
            }
        };
        buscar();
    }, []);

    const abrirLivro = async (id) => {
        setCarregandoDetalhe(true);
        setSelecionado({});
        try {
            const res = await fetch(`${API_URL}/${id}`, { headers: { 'x-api-key': API_KEY } });
            const dados = await res.json();
            setSelecionado(dados.data ?? dados);
        } catch (e) {
            console.error(e);
        } finally {
            setCarregandoDetalhe(false);
        }
    };

    return (
        <>
            <Menu />

            <div className={styles.pagina}>
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.pilula}>
                            <span className={styles.ponto} /> SENAI + SESI · 2026
                        </div>
                        <h1 className={styles.titulo}>
                            The Rats — <em className={styles.destaque}>{t.titulo}</em>
                        </h1>
                        <p className={styles.subtitulo}>{t.subtitulo}</p>
                    </div>
                </section>

                <section className={styles.grade}>
                    {carregando && <div className={styles.spinner} />}
                    {erro && <p className={styles.erro}>{erro}</p>}
                    {!carregando && !erro && livros.map(livro => (
                        <div key={livro.id} className={styles.card}>
                            <img className={styles.cardCapa} src={livro.capa} alt={livro.titulo} />
                            <h2 className={styles.cardTitulo}>{livro.titulo}</h2>
                            <p className={styles.cardAutor}>{livro.autor}</p>
                            <button className={styles.botao} onClick={() => abrirLivro(livro.id)}>
                                {t.acessar}
                            </button>
                        </div>
                    ))}
                </section>
            </div>

            {selecionado !== null && !carregandoDetalhe && Object.keys(selecionado).length > 0 && (
                <Modal livro={selecionado} lang={lang} t={t} onFechar={() => setSelecionado(null)} />
            )}

            {carregandoDetalhe && createPortal(
                <div className={styles.overlaySpinner}>
                    <div className={styles.spinner} />
                </div>,
                document.body
            )}
        </>
    );
}
