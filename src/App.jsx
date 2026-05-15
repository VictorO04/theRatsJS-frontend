import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal";
import Participantes from "./pages/Participantes/Participantes";
import Contato from "./pages/Contato/Contato";
import Simulados from "./pages/Simulados/Simulados";
import VideoAula from "./pages/VideoAula/VideoAula"


function App() {
    return (
        <>

                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/sobre-nos" element={<Participantes />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/simulados" element={<Simulados />} />
                    <Route path="/video-aulas" element={<VideoAula />} />
                </Routes>
        </>
    )
}


export default App;
