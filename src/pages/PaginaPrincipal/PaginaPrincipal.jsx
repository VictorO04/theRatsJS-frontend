import { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import styles from './PaginaPrincipal.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = '/api/livros';

export default function PaginaPrincipal() {
    const { lang } = useContext(LanguageContext);
    const [livro, setLivro] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [personagens, setPersonagens] = useState([]);
    const [carregandoPersonagens, setCarregandoPersonagens] = useState(true);
    const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
    const [secaoAtiva, setSecaoAtiva] = useState('enredo');
    const [mostrarCompleto, setMostrarCompleto] = useState(false);

    useEffect(() => {
        const buscarLivro = async () => {
            setCarregando(true);
            setErro(null);
            try {
                const resposta = await fetch(API_URL);
                if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
                const dados = await resposta.json();
                setLivro(dados.find((l) => l.id === 1) ?? dados[0]);
            } catch (e) {
                setErro(e.message);
            } finally {
                setCarregando(false);
            }
        };

        const buscarPersonagens = async () => {
            setCarregandoPersonagens(true);
            try {
                const resposta = await fetch('/api/personagens');
                if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
                const dados = await resposta.json();
                setPersonagens(Array.isArray(dados) ? dados : (dados.data ?? []));
            } catch (e) {
                console.error(e);
            } finally {
                setCarregandoPersonagens(false);
            }
        };

        buscarLivro();
        buscarPersonagens();
    }, []);

    if (carregando) {
        return (
            <div className={styles.pagina}>
                <Menu />
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner} />
                </div>
            </div>
        );
    }

    if (erro || !livro) {
        return (
            <div className={styles.pagina}>
                <Menu />
                <p className={styles.erro}>{erro ?? 'Livro não encontrado.'}</p>
            </div>
        );
    }

    const pt = lang === 'pt-br';

    const secoes = [
        { id: 'enredo', label: pt ? 'Enredo' : 'Plot' },
        { id: 'contexto', label: pt ? 'Contexto' : 'Context' },
        { id: 'estiloEscrita', label: pt ? 'Estilo de escrita' : 'Writing style' },
        { id: 'verossimilhanca', label: pt ? 'Verossimilhança' : 'Verisimilitude' },
        { id: 'caracteristicas', label: pt ? 'Características' : 'Literary traits' },
        { id: 'autor', label: pt ? 'Sobre o autor' : 'About the author' },
        { id: 'conclusao', label: pt ? 'Conclusão' : 'Conclusion' },
        { id: 'personagens', label: pt ? 'Personagens' : 'Characters' },
    ];

    const conteudoSecao = {
        enredo: pt ? livro.enredo : livro.enredo_en,
        contexto: pt ? livro.contexto : livro.contexto_en,
        estiloEscrita: pt ? livro.estiloEscrita : livro.estiloEscrita_en,
        verossimilhanca: pt ? livro.verossimilhanca : livro.verossimilhanca_en,
        caracteristicas: pt ? livro.caracteristicasLiterarias : livro.caracteristicasLiterarias_en,
        autor: pt ? livro.detalhesAutor : livro.detalhesAutor_en,
        conclusao: pt ? livro.conclusao : livro.conclusao_en,
    };

    return (
        <div className={styles.pagina}>
            <Menu />

            <section className={styles.hero}>
                <div className={styles.heroFundo} />
                <div className={styles.heroConteudo}>
                    {/* TOPO */}
                    <div className={styles.heroTop}>
                        <div className={styles.heroTexto}>
                            <div className={styles.badge}>
                                <span className={styles.ponto} />
                                {pt ? 'Obra em destaque' : 'Featured work'}
                            </div>
                            <h1 className={styles.titulo}>
                                {pt ? 'Os Ratos' : 'The Rats'} —{' '}
                                <span className={styles.destaque}>{livro.autor}</span>
                            </h1>
                            <p className={styles.subtitulo}>
                                {pt ? livro.resumo : livro.resumo_en}
                            </p>
                            <div className={styles.metaRow}>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>
                                        {pt ? 'Autor' : 'Author'}
                                    </span>
                                    <span className={styles.metaValor}>{livro.autor}</span>
                                </div>
                                <div className={styles.metaDivider} />
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>{pt ? 'Ano' : 'Year'}</span>
                                    <span className={styles.metaValor}>{livro.anoPublicacao}</span>
                                </div>
                                <div className={styles.metaDivider} />
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>
                                        {pt ? 'Gênero' : 'Genre'}
                                    </span>
                                    <span className={styles.metaValor}>
                                        {pt ? livro.genero : livro.genero_en}
                                    </span>
                                </div>
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>
                                        {pt ? 'Nota' : 'Rating'}
                                    </span>
                                    <span className={styles.metaValor} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                        {[1, 2, 3, 4].map((i) => (
                                            <span key={i} style={{ color: 'var(--text)', fontSize: '1.1rem' }}>★</span>
                                        ))}
                                        {/* meia estrela */}
                                        <span style={{ position: 'relative', display: 'inline-block', fontSize: '1.1rem', color: 'transparent' }}>
                                            ★
                                            <span style={{
                                                position: 'absolute',
                                                left: 0,
                                                top: 0,
                                                width: '50%',
                                                overflow: 'hidden',
                                                color: 'var(--text)',
                                            }}>★</span>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.capaWrapper}>
                            <div className={styles.capaGlow} />
                            <img src={livro.capa} alt={livro.titulo} className={styles.capa} />
                        </div>
                    </div>

                    {/* TABS */}
                    <div className={styles.tabsWrapper}>
                        <div className={styles.tabs}>
                            {secoes.map((s) => (
                                <button
                                    key={s.id}
                                    className={`${styles.tab} ${secaoAtiva === s.id ? styles.tabAtiva : ''}`}
                                    onClick={() => {
                                        setSecaoAtiva(s.id);
                                        setMostrarCompleto(false);
                                    }}>
                                    {s.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CONTEÚDO DA SEÇÃO */}
                    <div className={styles.secaoConteudo}>
                        {secaoAtiva === 'personagens' ? (
                            <div className={styles.personagensGrid}>
                                {carregandoPersonagens ? (
                                    <div className={styles.spinner} />
                                ) : (
                                    personagens.map((p) => (
                                        <button
                                            key={p.id}
                                            className={styles.personagemCard}
                                            onClick={() => setPersonagemSelecionado(p)}>
                                            <div className={styles.personagemAvatar}>
                                                {p.nome
                                                    .split(' ')
                                                    .slice(0, 2)
                                                    .map((n) => n[0])
                                                    .join('')
                                                    .toUpperCase()}
                                            </div>
                                            <span className={styles.personagemNome}>{p.nome}</span>
                                        </button>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className={styles.secaoTextoWrapper}>
                                <p className={styles.secaoRotulo}>
                                    {secoes.find((s) => s.id === secaoAtiva)?.label}
                                </p>
                                {(() => {
                                    const textoOriginal = conteudoSecao[secaoAtiva] ?? '';
                                    const limite = 1000;
                                    const precisaTruncar = textoOriginal.length > limite;
                                    const textoExibido =
                                        mostrarCompleto || !precisaTruncar
                                            ? textoOriginal
                                            : textoOriginal.slice(0, limite) + '...';

                                    return (
                                        <>
                                            <p className={styles.secaoTexto}>{textoExibido}</p>
                                            {precisaTruncar && (
                                                <button
                                                    type="button"
                                                    className={styles.verMaisBtn}
                                                    onClick={() =>
                                                        setMostrarCompleto((prev) => !prev)
                                                    }>
                                                    {mostrarCompleto
                                                        ? pt
                                                            ? 'Mostrar menos'
                                                            : 'Show less'
                                                        : pt
                                                            ? 'Ver mais'
                                                            : 'Show more'}
                                                </button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {personagemSelecionado &&
                createPortal(
                    <div
                        className={styles.personagemOverlay}
                        onClick={() => setPersonagemSelecionado(null)}>
                        <div
                            className={styles.personagemModal}
                            onClick={(e) => e.stopPropagation()}>
                            <div className={styles.modalFaixa} />
                            <div className={styles.modalCorpo}>
                                <div className={styles.modalHeader}>
                                    <div className={styles.personagemAvatarGrande}>
                                        {personagemSelecionado.nome
                                            .split(' ')
                                            .slice(0, 2)
                                            .map((n) => n[0])
                                            .join('')
                                            .toUpperCase()}
                                    </div>
                                    <div>
                                        <h2 className={styles.personagemModalTitle}>
                                            {personagemSelecionado.nome}
                                        </h2>
                                        <p className={styles.personagemCaracteristicas}>
                                            {pt
                                                ? personagemSelecionado.caracteristicas_pt
                                                : personagemSelecionado.caracteristicas_en}
                                        </p>
                                    </div>
                                    <button
                                        className={styles.personagemClose}
                                        onClick={() => setPersonagemSelecionado(null)}>
                                        ✕
                                    </button>
                                </div>
                                <hr className={styles.modalDivisor} />
                                <p className={styles.modalSecaoRotulo}>
                                    {pt ? 'Representação' : 'Representation'}
                                </p>
                                <p className={styles.modalTexto}>
                                    {pt
                                        ? personagemSelecionado.representacao_pt
                                        : personagemSelecionado.representacao_en}
                                </p>
                            </div>
                        </div>
                    </div>,
                    document.body,
                )}
        </div>
    );
}
