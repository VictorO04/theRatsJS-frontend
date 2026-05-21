import { useState, useEffect, useContext } from 'react';
import styles from './VideoAula.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = "/api/videoAulas";
const API_KEY = "Fq0CotClRneRPJAeCakJsrSwGyVCJU58tQrPWYgLCK3ei9HT-Ygajl2KXCLiZTPO";

const texts = {
    'pt-br': {
        titulo: 'Vídeo Aulas',
        subtitulo: 'Aprenda com nossas video-aulas! Veja a seguir nossa lista de vídeos e reviews sobre os livros',
    },
    en: {
        titulo: 'Video Lessons',
        subtitulo: 'Learn with our video lessons! See below our list of videos and book reviews',
    },
};

export default function Videos() {
    const context = useContext(LanguageContext);
    const lang = context?.lang || "pt-br";
    const t = texts[lang] || texts["pt-br"];

    const [videos, setVideos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch(API_URL, {
                    headers: {
                        Authorization: API_KEY,
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao carregar vídeos");
                }

                const data = await response.json();

                setVideos(data);

            } catch (error) {
                console.error(error);
                setErro("Não foi possível carregar os vídeos 😵");
            } finally {
                setCarregando(false);
            }
        }

        fetchVideos();
    }, []);

    function converterYoutube(url) {
        if (!url) return "";

        const videoId = url.split("v=")[1];

        return `https://www.youtube.com/embed/${videoId}`;
    }

    if (carregando) return <div className={styles.spinner} />;

    if (erro) return <p className={styles.erro}>{erro}</p>;

    return (
        <>
            <Menu />

            <div className={styles.pagina}>
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />

                    <div className={styles.heroConteudo}>
                        <div className={styles.pilula}>
                            <span className={styles.ponto} /> SENAI + SESI . 2026
                        </div>

                        <h1 className={styles.titulo}>
                            The Rats — <em className={styles.destaque}>{t.titulo}</em>
                        </h1>

                        <p className={styles.Subtitulo}>
                            {t.subtitulo}
                        </p>
                    </div>
                </section>

                <section className={styles.videos}>
                    {videos.map((video) => (
                        <div className={styles.video} key={video.id}>
                            <iframe
                                src={converterYoutube(video.urlMidia)}
                                title={lang === "pt-br"
                                    ? video.conteudo
                                    : video.content}
                                allowFullScreen
                            ></iframe>

                            <h2 className={styles.tituloVideo}>
                                {lang === "pt-br"
                                    ? video.conteudo
                                    : video.content}
                            </h2>

                            <p className={styles.Materia}>
                                ID: {video.id}
                            </p>

                            <p className={styles.descricao}>
                                {lang === "pt-br"
                                    ? video.descricao
                                    : video.description}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
}