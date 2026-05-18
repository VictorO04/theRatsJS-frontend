import { useState } from "react";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem("lang") || "pt-br";
    });

    function toggleLanguage() {
        setLang(prevLang => {
            const novoLang = prevLang === "pt-br" ? "en" : "pt-br";
            localStorage.setItem("lang", novoLang);
            return novoLang;
        });
    }

    return (
        <LanguageContext.Provider value={{ lang, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}