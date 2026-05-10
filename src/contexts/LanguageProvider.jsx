import { useState } from "react";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState("pt-br");

    function toggleLanguage() {
        setLang(prevLang => prevLang === "pt-br" ? "en" : "pt-br");
    }

    return (
        <LanguageContext.Provider value={{lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}