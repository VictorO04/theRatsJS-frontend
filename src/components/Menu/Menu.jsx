import styles from "./Menu.module.css";
import { LanguageContext } from "../../contexts/LanguageContext";

import { Link } from "react-router-dom";
import { useContext } from "react";

import { FaBook } from "react-icons/fa";
import { RiBookletFill } from "react-icons/ri";
import { IoDocumentTextSharp } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

const texts = {
    "pt-br": {
        acervo: "Acervo",
        dicas: "Dicas",
        simulados: "Simulados",
        videos: "Video Aulas",
        curiosidades: "Curiosidades"
    },
    "en": {
        acervo: "collection",
        dicas: "Exam Tips",
        simulados: "Mock Exams",
        videos: "Video Lessons",
        curiosidades: "Curiosities"
    }
}

function Menu() {
    const { lang } = useContext(LanguageContext);


    return (
        <div className={styles.menuContainer}>
            <Link className={styles.link} to="/acervo">
                <FaBook size={17} />
                {texts[lang].acervo}
            </Link>

            <Link className={styles.link} to="/dicas">
                <RiBookletFill size={17} />
                {texts[lang].dicas}
            </Link>

            <Link className={styles.link} to="/simulados">
                <IoDocumentTextSharp size={17} />
                {texts[lang].simulados}
            </Link>

            <Link className={styles.link} to="/video-aulas">
                <FaVideo size={17} />
                {texts[lang].videos}
            </Link>

            <Link className={styles.link} to="/curiosidades">
                <FaLightbulb size={17} />
                {texts[lang].curiosidades}
            </Link>

        </div>
    );
}

export default Menu;