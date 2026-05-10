import { Routes, Route } from "react-router-dom";
import PaginaPrincipal from "./pages/PaginaPrincipal/PaginaPrincipal";

function App() {
    return (
        <>
            
            <Routes>
                <Route path="/" element={<PaginaPrincipal />} />
            </Routes>
        </>
    );
}

export default App;
