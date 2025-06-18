import styles from './styles.module.css';
import Check from '../../assets/Check';

function CheckField({ type, label, value, data, updateForm}) {
    return (
        <section className={styles.selectOp}>
            <div className={type === value ? styles.active : ''} onClick={() => { updateForm('type', value) }}>
                <p>{label} {type === value ? <Check /> : ''}</p>
            </div>
            <label>{data}</label>
        </section>
    );
}

export default CheckField;