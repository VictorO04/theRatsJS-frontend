import { useContext } from "react";
import styles from "./Contato.module.css";
import Menu from "../../components/Menu/Menu";
import { LanguageContext } from "../../contexts/LanguageContext";

const text = {
  "pt-br": {
    faleConosco: "Fale conosco",
    titulo: "Entre em",
    destaque: "contato",
    subtitulo:
      "Tem dúvidas sobre o projeto, quer colaborar ou só quer dizer oi? Manda uma mensagem — respondemos em até 24h.",
    formularioLabel: "Formulário",
    envieUmaMensagem: "Envie uma mensagem",
    nome: "Nome",
    placeholderNome: "Seu nome completo",
    placeholderEmail: "seu@email.com",
    assunto: "Assunto",
    selecioneUmAssunto: "Selecione um assunto",
    suporte: "Suporte",
    parceria: "Parceria",
    sugestao: "Sugestão",
    outro: "Outro",
    mensagem: "Mensagem",
    escrevaSuaMensagem: "Escreva sua mensagem aqui...",
    enviarMensagem: "Enviar mensagem",
    informacoesContato: "Informações de contato",
    atendimento: "Atendimento",
    hAtendimento: "Seg–Sex, 8h às 18h",
    endereco: "Endereço",
    enderecoValor: "Valinhos, São Paulo — Brasil",
    redesSociais: "Redes sociais",
    localizacao: "Localização",
    ondeEstamos: "Onde estamos — SENAI Valinhos",
  },
  en: {
    faleConosco: "Talk to us",
    titulo: "Get in",
    destaque: "touch",
    subtitulo:
      "Have questions about the project, want to collaborate, or just want to say hi? Send us a message — we'll respond within 24 hours.",
    formularioLabel: "Form",
    envieUmaMensagem: "Send a message",
    nome: "Name",
    placeholderNome: "Your full name",
    placeholderEmail: "your@email.com",
    assunto: "Subject",
    selecioneUmAssunto: "Select a subject",
    suporte: "Support",
    parceria: "Partnership",
    sugestao: "Suggestion",
    outro: "Other",
    mensagem: "Message",
    escrevaSuaMensagem: "Write your message here...",
    enviarMensagem: "Send message",
    informacoesContato: "Contact information",
    atendimento: "Service hours",
    hAtendimento: "Mon–Fri, 8am to 6pm",
    endereco: "Address",
    enderecoValor: "Valinhos, São Paulo — Brazil",
    redesSociais: "Social media",
    localizacao: "Location",
    ondeEstamos: "Where we are — SENAI Valinhos",
  },
};

export default function Contato() {
  const { lang } = useContext(LanguageContext);
  const t = text[lang] ?? text["pt-br"];

  return (
    <div className={styles.pagina}>
      <Menu />

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroFundo} />
        <div className={styles.heroConteudo}>
          <div className={styles.faleConosco}>
            <span className={styles.ponto} />
            {t.faleConosco}
          </div>
          <h1 className={styles.titulo}>
            {t.titulo} <span className={styles.destaque}>{t.destaque}</span>
          </h1>
          <p className={styles.subtitulo}>{t.subtitulo}</p>
        </div>
      </section>
      <section className={styles.mid}>
        <div>
          <p className={styles.formularioRosa}>{t.formularioLabel}</p>
          <h2 className={styles.tituloSecao}>{t.envieUmaMensagem}</h2>

          <form className={styles.formulario}>
            <div className={styles.campo}>
              <label className={styles.label}>{t.nome}</label>
              <input
                className={styles.input}
                type="text"
                placeholder={t.placeholderNome}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>E-mail</label>
              <input
                className={styles.input}
                type="email"
                placeholder={t.placeholderEmail}
              />
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>{t.assunto}</label>
              <select className={styles.select}>
                <option value="">{t.selecioneUmAssunto}</option>
                <option value="suporte">{t.suporte}</option>
                <option value="parceria">{t.parceria}</option>
                <option value="sugestao">{t.sugestao}</option>
                <option value="outro">{t.outro}</option>
              </select>
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>{t.mensagem}</label>
              <textarea
                className={styles.areaTexto}
                placeholder={t.escrevaSuaMensagem}
              />
            </div>

            <button className={styles.botaoEnviar} type="button">
              {t.enviarMensagem}
            </button>
          </form>
        </div>
        <div className={styles.colunaInformacao}>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoFaixa} />
            <div className={styles.cardInfoConteudo}>
              <p className={styles.cardInfoTitulo}>{t.informacoesContato}</p>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>E-mail</span>
                <a
                  className={styles.infoValorLink}
                  href="mailto:contato@therats.com.br"
                >
                  contato@therats.com.br
                </a>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>WhatsApp</span>
                <a
                  className={styles.infoValorLink}
                  href="https://wa.me/19989983398"
                  target="_blank"
                  rel="noreferrer"
                >
                  +55 (19) 98998-3398
                </a>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>{t.endereco}</span>
                <span className={styles.infoValor}>{t.enderecoValor}</span>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>{t.atendimento}</span>
                <span className={styles.infoValor}>{t.hAtendimento}</span>
              </div>
            </div>
          </div>

          <div className={styles.cardInfo}>
            <div className={styles.cardInfoFaixa} />
            <div className={styles.cardInfoConteudo}>
              <p className={styles.cardInfoTitulo}>{t.redesSociais}</p>
              <div className={styles.redesSociais}>
                <a
                  className={styles.botaoSocial}
                  href="https://www.instagram.com/arthurrr_mn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <a
                  className={styles.botaoSocial}
                  href="https://www.linkedin.com/in/arthurmorais0227/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className={styles.botaoSocial}
                  href="https://github.com/VictorO04/theRatsJS-frontend"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className={styles.botaoSocial}
                  href="https://twitter.com/therats"
                  target="_blank"
                  rel="noreferrer"
                >
                  X
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.secaoMapa}>
        <div className={styles.mapaInterno}>
          <p className={styles.formularioRosa}>{t.localizacao}</p>
          <h2 className={styles.tituloSecao}>{t.ondeEstamos}</h2>
          <iframe
            className={styles.mapaFrame}
            title="Localização"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.225064197859!2d-47.010101!3d-22.978749899999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c8cd9c133b52f5%3A0xbe859c603dcb641b!2sEscola%20SENAI%20de%20Valinhos!5e0!3m2!1spt-BR!2sbr!4v1778450409581!5m2!1spt-BR!2sbr"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <a
        className={styles.whatsappFlutuante}
        href="https://wa.me/19989983398"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </div>
  );
}