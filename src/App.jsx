import { useEffect, useState } from 'react';
import styles from './App.module.css'
import DropDown from './components/DropDown/DropDown';
import australia from './assets/australia.png';
import CheckField from './components/CheckField/CheckField';
import { toNumber, totext } from './functions/functions';
import TaxCard from './components/TaxCard/TaxCard';

const countries = [
    { label: "Australia", value: "australia", flag: australia }
];

const financialYears = [
    { label: "FY 2023-24", value: "fy-2023-24" }
];

const annualIncome = [
    { label: "$0 - $18,200", value: 0, data: "0%" },
    { label: "$18,201 - $45,000", value: 0.19, data: "Nil + 19% of the excess over $18,200" },
    { label: "$45,001 - $120,000", value: 0.325, data: "$5,092 + 32.5% of the excess over $45,000" },
    { label: "$120,001 - $180,000", value: 0.37, data: "$29,467 + 37% of the excess over $120,000" },
    { label: "$180,001+", value: 0.45, data: "$51,667 + 45% of the excess over $180,000" }
];

const investmentType = [
    { label: "Short Term", value: 'short-term', data: "< 12 Months" },
    { label: "Long Term", value: 'long-term', data: "> 12 Months" }
];

function App() {
    const [form, setForm] = useState({
        financialYear: { label: "FY 2023-24", value: "fy-2023-24" },
        country: { label: "Australia", value: "australia", flag: australia },
        purchase: '$ 50,000',
        sale: '$ 100,000',
        expenses: '$ 20,000',
        type: 'long-term',
        annual: { label: "$45,001 - $120,000", value: 0.325, data: "$5,092 + 32.5% of the excess over $45,001" },
        capital: '$ 30,000',
        discount: '$ 15,000',
        capitalTax: '$ 15,000',
        payTax: '$ 4,875',
    });

    useEffect(() => {
        const sale = toNumber(form.sale);
        const purchase = toNumber(form.purchase);
        const expenses = toNumber(form.expenses);
        let capital = sale - purchase - expenses;
        capital = capital > 0? capital : 0;
        updateForm('capital', totext(capital));
    },[form.sale, form.purchase, form.expenses]);

    useEffect(() => {
        const capital = toNumber(form.capital);
        const discount = 0.5 * capital;
        updateForm('discount', totext(discount));
    },[form.capital]);

    useEffect(() => {
        const capital = toNumber(form.capital);
        const discount = toNumber(form.discount);
        const capitalTax = capital - discount;
        updateForm('capitalTax', totext(capitalTax));
    },[form.discount]);

    useEffect(() => {
        const capitalTax = toNumber(form.capitalTax);
        const payTax = form.annual.value * capitalTax;
        updateForm('payTax', totext(payTax));
    },[form.capitalTax, form.annual]);

    function updateForm(name, value) {
        setForm({ ...form, [name]: value });
    }

    function convert(event) {
        const name = event.target.name;
        const value = totext(toNumber(event.target.value));
        updateForm(name, value);
    }

    return (
        <main className={styles.main}>
            <h1>Free Crypto Tax Calculator - Australia</h1>
            <div className={styles.form}>
                <header className={styles.header}>
                    <section>
                        <label>Financial Year</label>
                        <DropDown options={financialYears} current={form.financialYear} name='financialYear' updateForm={updateForm} />
                    </section>
                    <section>
                        <label>Country</label>
                        <DropDown options={countries} current={form.country} name='country' updateForm={updateForm} />
                    </section>
                </header>
                <div className={styles.fields}>
                    <section>
                        <label>Enter purchase price of Crypto</label>
                        <input type='text' name='purchase' value={form.purchase} onChange={(event) => convert(event)} />
                    </section>
                    <section>
                        <label>Enter sale price of Crypto</label>
                        <input type='text' name='sale' value={form.sale} onChange={(event) => convert(event)} />
                    </section>
                </div>
                <div className={styles.fields}>
                    <section>
                        <label>Enter your Expenses</label>
                        <input type='text' name='expenses' value={form.expenses} onChange={(event) => convert(event)} />
                    </section>
                    <section>
                        <label>Investment Type</label>
                        <div className={styles.selectOps}>
                            {investmentType.map((type, index) => {
                                return (<CheckField key={index} type={form.type} {...type} updateForm={updateForm} />);
                            })}
                        </div>
                    </section>
                </div>
                <div className={styles.fields}>
                    <section>
                        <label>Select Your Annual Income</label>
                        <DropDown options={annualIncome} current={form.annual} name='annual' updateForm={updateForm} />
                    </section>
                    <section className={styles.taxRates}>
                        <p>Tax Rate</p>
                        <p>{form.annual.data}</p>
                    </section>
                </div>
                {form.type === 'long-term' ? <div className={styles.fields}>
                    <section>
                        <label>Capital gains amount</label>
                        <input type='text' name='capital' value={form.capital} disabled/>
                    </section>
                    <section>
                        <label>Discount for long term gains</label>
                        <input type='text' name='discount' value={form.discount} disabled/>
                    </section>
                </div> : ''}
                <div className={styles.tax}>
                    <TaxCard label='Net Capital gains tax amount' value={form.capitalTax} type='green'/>
                    <TaxCard label='The tax you need to pay*' value={form.payTax} type='blue'/>
                </div>
            </div>
        </main>);
}

export default App;