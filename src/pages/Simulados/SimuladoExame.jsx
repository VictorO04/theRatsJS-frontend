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

const OPCOES = ['A', 'B', 'C', 'D', 'E'];

function getOptionKey(lang, letra) {
    const map = {
        'pt-br': { A: 'opcaoA', B: 'opcaoB', C: 'opcaoC', D: 'opcaoD', E: 'opcaoE' },
        en: { A: 'optionA', B: 'optionB', C: 'optionC', D: 'optionD', E: 'optionE' },
    };
    return map[lang][letra];
}

export default function SimuladoExame() {
    const { lang } = useContext(LanguageContext);
    const location = useLocation();
    const navigate = useNavigate();
    const simulado = location.state?.simulado;
    const t = texts[lang];

    useEffect(() => {
        if (!simulado) {
            navigate('/simulados', { replace: true });
        }
    }, [simulado, navigate]);

    if (!simulado) {
        return null;
    }

    const questions = simulado.rawQuestions || [];

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);  
    const [confirmed, setConfirmed] = useState(false); 
    const [answers, setAnswers] = useState([]);
    const [finished, setFinished] = useState(false);

    const q = questions[current];
    const correct = q.respostaCorreta || q.correctAnswer;
    const pergunta = lang === 'pt-br' ? q.pergunta : q.question;
    const explicacao = lang === 'pt-br' ? q.explicacao : q.explanation;

    const opcoesDisponiveis = OPCOES.filter(l => {
        const key = getOptionKey(lang, l);
        return q[key] && q[key].trim() !== '';
    });

    function handleSelect(letra) {
        if (confirmed) return;
        setSelected(letra);
    }

    function handleConfirm() {
        if (!selected || confirmed) return;
        const isCorrect = getOptionKey(lang, selected) &&
            q[getOptionKey(lang, selected)] === correct;
        setConfirmed(true);
        setAnswers(prev => [...prev, { index: current, correct: isCorrect }]);
    }

    function handleNext() {
        if (current < questions.length - 1) {
            setCurrent(c => c + 1);
            setSelected(null);
            setConfirmed(false);
        } else {
            setFinished(true);
        }
    }

    function handlePrev() {
        if (current > 0) {
            setCurrent(c => c - 1);
            setSelected(null);
            setConfirmed(false);
        }
    }

    function handleReiniciar() {
        setCurrent(0);
        setSelected(null);
        setConfirmed(false);
        setAnswers([]);
        setFinished(false);
    }

    const totalAcertos = answers.filter(a => a.correct).length;
    const pct = Math.round((totalAcertos / questions.length) * 100);
    const feedbackMsg =
        pct >= 80 ? t.excelente : pct >= 50 ? t.bomTrabalho : t.continue;

    if (finished) {
        return (
            <>
                <Menu />
                <div className={styles.pagina}>
                    <section className={styles.hero}>
                        <div className={styles.heroFundo} />
                        <div className={styles.heroConteudo}>
                            <div className={styles.pilula}>
                                <span className={styles.ponto} /> {simulado.title}
                            </div>
                            <h1 className={styles.titulo}>{t.resultado}</h1>
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
                                        style={{ strokeDashoffset: 327 - (327 * pct) / 100 }}
                                    />
                                </svg>
                                <span className={styles.pctLabel}>{pct}%</span>
                            </div>
                            <h2 className={styles.resultTitulo}>{t.resultado}</h2>
                            <p className={styles.resultSub}>
                                {totalAcertos} {t.acertos} {questions.length} — {feedbackMsg}
                            </p>
                            <div className={styles.resultBotoes}>
                                <button className={styles.btnSecondary} onClick={handleReiniciar}>
                                    {t.reiniciar}
                                </button>
                                <button className={styles.btnPrimary} onClick={() => navigate('/simulados')}>
                                    {t.voltar}
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
                            <span className={styles.ponto} /> {simulado.title}
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

                        <div className={styles.progressoWrap}>
                            <span className={styles.progressoLabel}>
                                {t.pergunta} {current + 1} {t.de} {questions.length}
                            </span>
                            <div className={styles.progressoBar}>
                                <div
                                    className={styles.progressoFill}
                                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        <p className={styles.enunciado}>{pergunta}</p>

                        <ul className={styles.opcoes}>
                            {opcoesDisponiveis.map(letra => {
                                const key = getOptionKey(lang, letra);
                                const texto = q[key];
                                const isSelected = selected === letra;
                                const isCorrectOpcao = texto === correct;

                                let estadoClass = '';
                                if (confirmed) {
                                    if (isCorrectOpcao) estadoClass = styles.opcaoCorreta;
                                    else if (isSelected) estadoClass = styles.opcaoErrada;
                                } else if (isSelected) {
                                    estadoClass = styles.opcaoSelecionada;
                                }

                                return (
                                    <li key={letra}>
                                        <button
                                            className={`${styles.opcao} ${estadoClass}`}
                                            onClick={() => handleSelect(letra)}
                                            disabled={confirmed}
                                        >
                                            <span className={styles.opcaoLetra}>{letra}</span>
                                            <span className={styles.opcaoTexto}>{texto}</span>
                                            {confirmed && isCorrectOpcao && (
                                                <span className={styles.iconCheck}>✓</span>
                                            )}
                                            {confirmed && isSelected && !isCorrectOpcao && (
                                                <span className={styles.iconX}>✗</span>
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {confirmed && (
                            <div className={`${styles.feedback} ${answers[answers.length - 1]?.correct ? styles.feedbackCerto : styles.feedbackErrado}`}>
                                <p className={styles.feedbackTitulo}>
                                    {answers[answers.length - 1]?.correct ? t.acertou : t.errou}
                                    {!answers[answers.length - 1]?.correct && (
                                        <> {t.respostaCorreta}: <strong>{correct}</strong></>
                                    )}
                                </p>
                                <p className={styles.feedbackLabel}>{t.explicacao}</p>
                                <p className={styles.feedbackTexto}>{explicacao}</p>
                            </div>
                        )}

                        <div className={styles.nav}>
                            <button
                                className={styles.btnSecondary}
                                onClick={handlePrev}
                                disabled={current === 0}
                            >
                                {t.anterior}
                            </button>

                            {!confirmed ? (
                                <button
                                    className={styles.btnPrimary}
                                    onClick={handleConfirm}
                                    disabled={!selected}
                                >
                                    Confirmar
                                </button>
                            ) : (
                                <button className={styles.btnPrimary} onClick={handleNext}>
                                    {current < questions.length - 1 ? t.proxima : t.finalizar}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
