import { useState } from "react";
import { ChangeEvent } from "react";
import { TextField } from '@mui/material';

const Calculator = () => {
    const [income, setIncome] = useState("");
    const [entry, setEntry] = useState("");
    const [purchasingPower, setPurchasingPower] = useState("");

    const calculatePurchasingPower = () => {
        const incomeValue = Number(income.replace(/,/g, "")) || 0;
        const entryValue = Number(entry.replace(/,/g, "")) || 0;

        const maximumInstallment = incomeValue * 0.30; // 30% da renda
        const interestRate = 12; // 12% ao ano
        const months = 360; // 30 anos

        const monthlyRate = interestRate / 100 / 12;
        const denominator = 1 - Math.pow(1 + monthlyRate, -months);

        if (denominator === 0) {
            setPurchasingPower("Error in calculation");
            return;
        }

        const loanAmount = (maximumInstallment / monthlyRate) * denominator;
        const result = loanAmount + entryValue;

        setPurchasingPower(formatCurrency(result));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const handleIncome = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
        setIncome(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // Adiciona as vírgulas
    };

    const handleEntry = (e: ChangeEvent<HTMLInputElement>) => {
        const numericValue = e.target.value.replace(/\D/g, "");
        setEntry(numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    };

    return (
        <>
            {/* <div className="container">
                <h1>Calculator</h1>
            </div> */}
            <div className="calculator-container">
                <div className="calculator">
                    <h1>Purchasing Power</h1>
                    <TextField
                        label="Income"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        onChange={handleIncome}
                        value={income}
                    />

                    <TextField
                        label="Entry"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="text"
                        onChange={handleEntry}
                        value={entry}
                    />
                    <button onClick={calculatePurchasingPower} className="button">
                        Calculate
                    </button>
                    {purchasingPower && <p>Your purchasing power is: {purchasingPower}</p>}
                </div>
                <div>
                    {/* <h2>Property Value</h2>
                    <label>
                        <span>Property Value</span>
                        <input type="text" className="input" />
                        <button className="button">Calculate</button>
                    </label> */}
                </div>
            </div>
        </>
    );
};

export default Calculator;