import styles from "./PaginaPrincipal.module.css";
import Header from '../../components/Header/Header';

function PaginaPrincipal() {
    return (
        <>
            <Header />
            <main>
                <h1 className={styles.textoBemVindo}>
                    Seja bem-vindo ao <strong>The RatsJS</strong>, o destino definitivo para{' '}
                    <strong>
                        <u>amantes de literatura</u>
                    </strong>
                    .
                </h1>
            </main>
        </>
    );
}

export default PaginaPrincipal;
