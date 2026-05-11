import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal";
import Participantes from "./pages/Participantes/Participantes";
import Contato from "./pages/Contato/Contato";


function App() {
    return (
        <>

                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/sobre-nos" element={<Participantes />} />
                    <Route path="/contato" element={<Contato />} />
                </Routes>
        </>
    )
}


export default App;