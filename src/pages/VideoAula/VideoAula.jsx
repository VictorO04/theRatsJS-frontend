import { useState, useEffect, useContext } from 'react';
import styles from './VideoAula.module.css';
import Menu from '../../components/Menu/Menu';
import { LanguageContext } from '../../contexts/LanguageContext';

const API_URL = '/api/videoAulas';

export default function VideoAula() {
    const { lang } = useContext(LanguageContext);
    const [videos, setVideos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const buscarVideos = async () => {
        setCarregando(true);
        setErro(null);
        try {
            const resposta = await fetch(API_URL);
            if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
            const dados = await resposta.json();
            setVideos(dados);
        } catch (e) {
            setErro(e.message);
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        const carregar = async () => {
            await buscarVideos();
        };
        carregar();
    }, []);

   function converterYoutube(url) {
       if (!url) return '';
       if (url.includes('watch?v=')) {
           const videoId = url.split('watch?v=')[1].split('&')[0];
           return `https://www.youtube.com/embed/${videoId}`;
       }
       if (url.includes('/shorts/')) {
           const videoId = url.split('/shorts/')[1].split('?')[0];
           return `https://www.youtube.com/embed/${videoId}`;
       }

       return '';
   }

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

    return (
        <>
            <div className={styles.pagina}>
                <Menu />
                <section className={styles.hero}>
                    <div className={styles.heroFundo} />
                    <div className={styles.heroConteudo}>
                        <div className={styles.videoAulas}>
                            <span className={styles.ponto} />
                            {lang === 'en' ? 'Video Lessons' : 'Vídeo Aulas'}
                        </div>
                        <h1 className={styles.titulo}>
                            {lang === 'en' ? (
                                <>
                                    The Rats —{' '}
                                    <span className={styles.destaque}>video lessons</span>
                                </>
                            ) : (
                                <>
                                    Os Ratos — <span className={styles.destaque}>vídeo aulas</span>
                                </>
                            )}
                        </h1>
                        <p className={styles.subtitulo}>
                            {lang === 'en'
                                ? 'Learn with our video lessons! See below our list of videos and book reviews.'
                                : 'Aprenda com nossas vídeo-aulas! Veja a seguir nossa lista de vídeos e reviews sobre os livros.'}
                        </p>
                    </div>
                </section>

                <div className={styles.conteudo}>
                    {videos.length === 0 ? (
                        <p className={styles.semResultados}>
                            {lang === 'en' ? 'No videos found.' : 'Nenhum vídeo encontrado.'}
                        </p>
                    ) : (
                        <div className={styles.grid}>
                            {videos.map((video) => (
                                <div className={styles.card} key={video.id}>
                                    <iframe
                                        src={converterYoutube(video.urlMidia)}
                                        title={lang === 'en' ? video.content : video.conteudo}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen={true}
                                        frameBorder="0"
                                    />
                                    <div className={styles.cardCorpo}>
                                        <span className={styles.cardTipo}>
                                            {lang === 'en' ? video.content : video.conteudo}
                                        </span>
                                        <p className={styles.cardTexto}>
                                            {lang === 'en' ? video.description : video.descricao}
                                        </p>
                                        <span className={styles.cardId}>#{video.id}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
