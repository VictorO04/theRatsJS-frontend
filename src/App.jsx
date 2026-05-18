<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal";
import Participantes from "./pages/Participantes/Participantes";
import Contato from "./pages/Contato/Contato";
import Simulados from "./pages/Simulados/Simulados";

=======
import { Routes, Route } from 'react-router-dom';
import PaginaPrincipal from './pages/PaginaPrincipal/PaginaPrincipal';
import Participantes from './pages/Participantes/Participantes';
import Contato from './pages/Contato/Contato';
import Simulados from './pages/Simulados/Simulados';
import VideoAula from './pages/VideoAula/VideoAula';
import Dicas from './pages/Dicas/Dicas';
import Curiosidades from './pages/Curiosidades/Curiosidades';
>>>>>>> 3dc62aeab0ca045f5b392f4eefd8e152f6267a0a

function App() {
    return (
        <>
<<<<<<< HEAD
            
                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/sobre-nos" element={<Participantes />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/simulados" element={<Simulados />} />
                </Routes>
=======
            <Routes>
                <Route path="/" element={<PaginaPrincipal />} />
                <Route path="/sobre-nos" element={<Participantes />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/simulados" element={<Simulados />} />
                <Route path="/video-aulas" element={<VideoAula />} />
                <Route path="/dicas" element={<Dicas />} />
                <Route path="/curiosidades" element={<Curiosidades />} />
            </Routes>
>>>>>>> 3dc62aeab0ca045f5b392f4eefd8e152f6267a0a
        </>
    );
}

export default App;
