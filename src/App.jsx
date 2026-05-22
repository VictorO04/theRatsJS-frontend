import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';
import Participantes from './pages/Participantes/Participantes';
import Contato from './pages/Contato/Contato';
import Simulados from './pages/Simulados/Simulados';
import SimuladoExame from './pages/Simulados/SimuladoExame';
import VideoAula from './pages/VideoAula/VideoAula';
import Dicas from './pages/Dicas/Dicas';
import Curiosidades from './pages/Curiosidades/Curiosidades';
import Acervo from './pages/Acervo/Acervo';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<PaginaPrincipal />} />
                <Route path="/sobre-nos" element={<Participantes />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/simulados" element={<Simulados />} />
                <Route path="/simulados/exame" element={<SimuladoExame />} />
                <Route path="/video-aulas" element={<VideoAula />} />
                <Route path="/dicas" element={<Dicas />} />
                <Route path="/curiosidades" element={<Curiosidades />} />
                <Route path="/acervo" element={<Acervo />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
