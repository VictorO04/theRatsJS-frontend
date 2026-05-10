import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal";
import Participantes from "./pages/Participantes/Participantes";


function App() {
    return (
        <>

                <Routes>
                    <Route path="/" element={<PaginaPrincipal />} />
                    <Route path="/sobre-nos" element={<Participantes />} />
                </Routes>
        </>
    )
}


export default App;
