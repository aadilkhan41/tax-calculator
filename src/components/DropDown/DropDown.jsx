import styles from './styles.module.css';
import { useEffect, useRef, useState } from "react";

function DropDown({ options, current, name, updateForm }) {
    const dropDownRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (name, value) => {
        updateForm(name, value);
        setIsOpen(false);
    };

    useEffect(()=>{
        function handelDropDown(event){
            if(dropDownRef.current && !dropDownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handelDropDown);
        return () => document.removeEventListener('mousedown', handelDropDown);
    },[]);

    return (
        <div ref={dropDownRef} className={styles.dropdown}>
            <button className={styles.dropdownToggle} onClick={() => setIsOpen((prev) => !prev)}>
                {current.flag? <img className={styles.flag} src={current.flag} alt={current.label} /> : ''}
                <span>{current.label}</span>
            </button>
            {isOpen && (<div className={styles.dropdownMenu}>
                {options.map((country) => (
                    <div key={country.value} className={styles.dropdownItem} onClick={() => handleSelect(name, country)}>
                        {country.flag? <img className={styles.flag} src={country.flag} alt={country.label} /> : ''}
                        <span>{country.label}</span>
                    </div>
                ))}
            </div>)}
        </div>
    );
}

export default DropDown;