import styles from './styles.module.css';

function TaxCard({ label, value, type }) {
    return (
        <section className={type === 'blue'? `${styles.taxCard} ${styles.blue}` : `${styles.taxCard} ${styles.green}`}>
            <label>{label}</label>
            <p>{value}</p>
        </section>
    );
}

export default TaxCard;