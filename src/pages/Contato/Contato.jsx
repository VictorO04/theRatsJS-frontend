import styles from "./Contato.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Contato() {
  return (
    <>
    <Header />
      <div className={styles.pagina}>

        {/* arthur morais -> 10/05 (16:20) aqui começa a parte inicial da tela: hero pq ta no topo*/}
        
        <section className={styles.hero}>
          <div className={styles.heroFundo}/>
          <div className={styles.heroConteudo}>
            <div className={styles.faleConosco}>
              <span className={styles.ponto} /> FALE CONOSCO
            </div>
            <h1 className={styles.titulo}>
              Entre em <span className={styles.contatoRosa}>contato</span>
            </h1>
            <p className={styles.subtitulo}>
              Tem dúvidas sobre o projeto, quer colaborar ou só quer dizer oi?
              Manda uma mensagem — respondemos em até 24h.
            </p>
          </div>
        </section>

        <section className={styles.mid}>

          <div>
            <p className={styles.formularioRosa}>FORMULÁRIO</p>
            <h2 className={styles.tituloSecao}>Envie uma mensagem</h2>

            <form className={styles.formulario}>
              <div className={styles.campo}>
                <label className={styles.label}>Nome</label>
                <input className={styles.input} type="text" placeholder="Seu nome completo" />
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>E-mail</label>
                <input className={styles.input} type="email" placeholder="seu@email.com" />
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Assunto</label>
                <select className={styles.select}>
                  <option value="">Selecione um assunto</option>
                  <option value="quero falar c o lisboa">Suporte</option>
                  <option value="quero falar c o victor">Parceria</option>
                  <option value="quero falar c o arthur">Sugestão</option>
                  <option value="outro (rafinha)">Outro</option>
                </select>
              </div>

              <div className={styles.campo}>
                <label className={styles.label}>Mensagem</label>
                <textarea className={styles.areaTexto} placeholder="Escreva sua mensagem aqui..." />
              </div>

              <button className={styles.botaoEnviar} type="button">Enviar mensagem</button>
            </form>
          </div>

          <div className={styles.colunaInformacao}>

            <div className={styles.cardInfo}>
              <p className={styles.cardInfoTitulo}>Informações de contato</p>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>E-mail</span>
                <a className={styles.infoValorLink} href="mailto:contato@therats.com.br">
                  contato@therats.com.br
                </a>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>WhatsApp</span>
                <a className={styles.infoValorLink} href="https://wa.me/5511999999999" target="_blank" rel="noreferrer">
                  +55 (11) 99999-9999
                </a>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>Endereço</span>
                <span className={styles.infoValor}>Valinhos, São Paulo — Brasil</span>
              </div>
              <div className={styles.linhaInfo}>
                <span className={styles.infoRotulo}>Atendimento</span>
                <span className={styles.infoValor}>Seg–Sex, 8h às 18h</span>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <p className={styles.cardInfoTitulo}>Redes sociais</p>
              <div className={styles.redesSociais}>
                <a className={styles.botaoSocial} href="https://www.instagram.com/therats/" target="_blank" rel="noreferrer">Instagram</a>
                <a className={styles.botaoSocial} href="https://www.linkedin.com/company/therats/" target="_blank" rel="noreferrer">LinkedIn</a>
                <a className={styles.botaoSocial} href="https://github.com/therats" target="_blank" rel="noreferrer">GitHub</a>
                <a className={styles.botaoSocial} href="https://twitter.com/therats" target="_blank" rel="noreferrer">X</a>
              </div>
            </div>

          </div>
        </section>

        <section className={styles.secaoMapa}>
          <div className={styles.mapaInterno}>
            <p className={styles.formularioRosa}>Localização</p>
            <h2 className={styles.tituloSecao}>Onde estamos - SENAI VALINHOS</h2>
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

      </div>

      <Footer />
    </>
  );
}