import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SimuladoExame.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const texts = {
    'pt-br': {
        pergunta: 'Pergunta',
        de: 'de',
        proxima: 'Próxima',
        anterior: 'Anterior',
        finalizar: 'Finalizar',
        explicacao: 'Explicação',
        acertou: 'Correto!',
        errou: 'Incorreto!',
        respostaCorreta: 'A resposta correta é',
        resultado: 'Resultado Final',
        acertos: 'acertos de',
        reiniciar: 'Reiniciar',
        voltar: 'Voltar aos Simulados',
        excelente: 'Excelente!',
        bomTrabalho: 'Bom trabalho!',
        continue: 'Continue praticando!',
    },
    en: {
        pergunta: 'Question',
        de: 'of',
        proxima: 'Next',
        anterior: 'Previous',
        finalizar: 'Finish',
        explicacao: 'Explanation',
        acertou: 'Correct!',
        errou: 'Incorrect!',
        respostaCorreta: 'The correct answer is',
        resultado: 'Final Results',
        acertos: 'correct out of',
        reiniciar: 'Restart',
        voltar: 'Back to Exams',
        excelente: 'Excellent!',
        bomTrabalho: 'Good job!',
        continue: 'Keep practicing!',
    },
};

const LETRAS_OPCOES = ['A', 'B', 'C', 'D', 'E'];

/**
 * @param {string} idioma 
 * @param {string} letra 
 * @returns {string}
 */
function obterChaveDaOpcao(idioma, letra) {
    const mapaChaves = {
        'pt-br': { A: 'opcaoA', B: 'opcaoB', C: 'opcaoC', D: 'opcaoD', E: 'opcaoE' },
        en: { A: 'optionA', B: 'optionB', C: 'optionC', D: 'optionD', E: 'optionE' },
    };
    return mapaChaves[idioma][letra];
}

export default function SimuladoExame() {
    const { lang } = useContext(LanguageContext);
    const location = useLocation();
    const navigate = useNavigate();
    const simulado = location.state?.simulado;
    const traducoes = texts[lang];

    useEffect(() => {
        if (!simulado) {
            navigate('/simulados', { replace: true });
        }
    }, [simulado, navigate]);

    if (!simulado) {
        return null;
    }

    const questoes = simulado.rawQuestions || [];

    const [indiceQuestaoAtual, setIndiceQuestaoAtual] = useState(0);
    const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
    const [respostaConfirmada, setRespostaConfirmada] = useState(false);
    const [historico, setHistorico] = useState([]);
    const [exameTerminado, setExameTerminado] = useState(false);

    const questaoAtual = questoes[indiceQuestaoAtual];
    const respostaCorreta = questaoAtual.respostaCorreta || questaoAtual.correctAnswer;
    const enunciadoQuestao = lang === 'pt-br' ? questaoAtual.pergunta : questaoAtual.question;
    const explicacaoQuestao = lang === 'pt-br' ? questaoAtual.explicacao : questaoAtual.explanation;

    const opcoesDisponiveis = LETRAS_OPCOES.filter(letra => {
        const chave = obterChaveDaOpcao(lang, letra);
        return questaoAtual[chave] && questaoAtual[chave].trim() !== '';
    });

    const selecionarOpcao = (letra) => {
        if (respostaConfirmada) return;
        setOpcaoSelecionada(letra);
    };

    const confirmarResposta = () => {
        if (!opcaoSelecionada || respostaConfirmada) return;
        const chave = obterChaveDaOpcao(lang, opcaoSelecionada);
        const acertou = chave && questaoAtual[chave] === respostaCorreta;
        setRespostaConfirmada(true);
        setHistorico(prev => [...prev, { indice: indiceQuestaoAtual, acertou }]);
    };

    const irParaProximaQuestao = () => {
        if (indiceQuestaoAtual < questoes.length - 1) {
            setIndiceQuestaoAtual(indice => indice + 1);
            setOpcaoSelecionada(null);
            setRespostaConfirmada(false);
        } else {
            setExameTerminado(true);
        }
    };

    const irParaQuestaoAnterior = () => {
        if (indiceQuestaoAtual > 0) {
            setIndiceQuestaoAtual(indice => indice - 1);
            setOpcaoSelecionada(null);
            setRespostaConfirmada(false);
        }
    };

    const reiniciarExame = () => {
        setIndiceQuestaoAtual(0);
        setOpcaoSelecionada(null);
        setRespostaConfirmada(false);
        setHistorico([]);
        setExameTerminado(false);
    };

    const totalAcertos = historico.filter(r => r.acertou).length;
    const percentualAcertos = Math.round((totalAcertos / questoes.length) * 100);
    const mensagemFeedback =
        percentualAcertos >= 80 ? traducoes.excelente : 
        percentualAcertos >= 50 ? traducoes.bomTrabalho : 
        traducoes.continue;

    if (exameTerminado) {
        return (
            <>
                <Menu />
                <div className={styles.pagina}>
                    <section className={styles.hero}>
                        <div className={styles.heroFundo} />
                        <div className={styles.heroConteudo}>
                            <div className={styles.pilula}>
                                <span className={styles.ponto} /> {simulado.titulo}
                            </div>
                            <h1 className={styles.titulo}>{traducoes.resultado}</h1>
                            <p className={styles.subtitulo}>
                                {lang === 'pt-br'
                                    ? 'Veja seu desempenho final e continue praticando.'
                                    : 'See your final performance and keep practicing.'}
                            </p>
                        </div>
                    </section>
                    <div className={styles.conteudo}>
                        <div className={styles.resultCard}>
                            <div className={styles.resultCircleWrap}>
                                <svg className={styles.ring} viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="52" className={styles.ringBg} />
                                    <circle
                                        cx="60" cy="60" r="52"
                                        className={styles.ringFill}
                                        style={{ strokeDashoffset: 327 - (327 * percentualAcertos) / 100 }}
                                    />
                                </svg>
                                <span className={styles.pctLabel}>{percentualAcertos}%</span>
                            </div>
                            <h2 className={styles.resultTitulo}>{traducoes.resultado}</h2>
                            <p className={styles.resultSub}>
                                {totalAcertos} {traducoes.acertos} {questoes.length} — {mensagemFeedback}
                            </p>
                            <div className={styles.resultBotoes}>
                                <button className={styles.btnSecondary} onClick={reiniciarExame}>
                                    {traducoes.reiniciar}
                                </button>
                                <button className={styles.btnPrimary} onClick={() => navigate('/simulados')}>
                                    {traducoes.voltar}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Menu />
            <div className={styles.pagina}>
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.pilula}>
                            <span className={styles.ponto} /> {simulado.titulo}
                        </div>
                        <h1 className={styles.titulo}>{lang === 'pt-br' ? 'Simulado' : 'Practice Exam'}</h1>
                        <p className={styles.subtitulo}>
                            {lang === 'pt-br'
                                ? 'Responda as questões abaixo e acompanhe seu resultado em tempo real.'
                                : 'Answer the questions below and track your score in real time.'}
                        </p>
                    </div>
                </section>
                <div className={styles.conteudo}>
                    <div className={styles.exameCard}>

                        {/* Barra de Progresso */}
                        <div className={styles.progressoWrap}>
                            <span className={styles.progressoLabel}>
                                {traducoes.pergunta} {indiceQuestaoAtual + 1} {traducoes.de} {questoes.length}
                            </span>
                            <div className={styles.progressoBar}>
                                <div
                                    className={styles.progressoFill}
                                    style={{ width: `${((indiceQuestaoAtual + 1) / questoes.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <p className={styles.enunciado}>{enunciadoQuestao}</p>

                        <ul className={styles.opcoes}>
                            {opcoesDisponiveis.map(letra => {
                                const chave = obterChaveDaOpcao(lang, letra);
                                const textoOpcao = questaoAtual[chave];
                                const ehSelecionada = opcaoSelecionada === letra;
                                const ehOpcaoCorreta = textoOpcao === respostaCorreta;

                                let classEstado = '';
                                if (respostaConfirmada) {
                                    if (ehOpcaoCorreta) classEstado = styles.opcaoCorreta;
                                    else if (ehSelecionada) classEstado = styles.opcaoErrada;
                                } else if (ehSelecionada) {
                                    classEstado = styles.opcaoSelecionada;
                                }

                                return (
                                    <li key={letra}>
                                        <button
                                            className={`${styles.opcao} ${classEstado}`}
                                            onClick={() => selecionarOpcao(letra)}
                                            disabled={respostaConfirmada}
                                            aria-label={`Opção ${letra}: ${textoOpcao}`}
                                        >
                                            <span className={styles.opcaoLetra}>{letra}</span>
                                            <span className={styles.opcaoTexto}>{textoOpcao}</span>
                                            {respostaConfirmada && ehOpcaoCorreta && (
                                                <span className={styles.iconCheck}>✓</span>
                                            )}
                                            {respostaConfirmada && ehSelecionada && !ehOpcaoCorreta && (
                                                <span className={styles.iconX}>✗</span>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {respostaConfirmada && (
                            <div className={`${styles.feedback} ${historico[historico.length - 1]?.acertou ? styles.feedbackCerto : styles.feedbackErrado}`}>
                                <p className={styles.feedbackTitulo}>
                                    {historico[historico.length - 1]?.acertou ? traducoes.acertou : traducoes.errou}
                                    {!historico[historico.length - 1]?.acertou && (
                                        <> {traducoes.respostaCorreta}: <strong>{respostaCorreta}</strong></>
                                    )}
                                </p>
                                <p className={styles.feedbackLabel}>{traducoes.explicacao}</p>
                                <p className={styles.feedbackTexto}>{explicacaoQuestao}</p>
                            </div>
                        )}

                        <div className={styles.nav}>
                            <button
                                className={styles.btnSecondary}
                                onClick={irParaQuestaoAnterior}
                                disabled={indiceQuestaoAtual === 0}
                                aria-label="Questão anterior"
                            >
                                {traducoes.anterior}
                            </button>

                            {!respostaConfirmada ? (
                                <button
                                    className={styles.btnPrimary}
                                    onClick={confirmarResposta}
                                    disabled={!opcaoSelecionada}
                                    aria-label="Confirmar resposta"
                                >
                                    Confirmar
                                </button>
                            ) : (
                                <button 
                                    className={styles.btnPrimary} 
                                    onClick={irParaProximaQuestao}
                                    aria-label={indiceQuestaoAtual < questoes.length - 1 ? 'Próxima questão' : 'Finalizar exame'}
                                >
                                    {indiceQuestaoAtual < questoes.length - 1 ? traducoes.proxima : traducoes.finalizar}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
