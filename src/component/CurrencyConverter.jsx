import React, { useEffect, useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";

const API_KEY = "bcc1c5585a689b5d2cae3a1d";

function CurrencyConverter() {
    const [rates, setRates] = useState({});
    const [amount, setAmount] = useState(0);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
            .then((response) => response.json())
            .then((data) => setRates(data.conversion_rates))
            .catch((error) => console.error("Error fetching rates:", error));
    }, [fromCurrency]);

    const handleConvert = () => {
        setLoading(true);
        setTimeout(() => {
            if (rates[toCurrency]) {
                setConvertedAmount(amount * rates[toCurrency]);
            }
            setLoading(false);
        }, 1000); // Simulating a delay for loading effect
    };

    const getFlagUrl = (currency) => {
        return `https://flagcdn.com/w40/${currency.slice(0, 2).toLowerCase()}.png`;
    };

    return (
        <div className="h-auto w-full grid place-content-center md:pt-1 md:pb-8 pb-8 px-2">
            <div className="flex justify-center items-center flex-col md:px-4 px-2 md:pb-10 pb-5 md:pt-5 pt-3 shadow-md shadow-gray-950 w-full rounded-2xl bg-neutral-50">
                <h2 className="md:text-3xl text-2xl font-extrabold">Currency Converter</h2>
                <div className="flex flex-col mt-7">
                    <label className="md:text-xl text-[1rem]">Enter Your Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="border-2 px-2 text-xl rounded border-amber-500 md:w-84 w-70 h-10" />
                </div>
                <div className="flex justify-between md:gap-10 gap-5 items-center mt-10">
                    <div className="border-2 border-black rounded flex justify-center items-center md:py-2 py-1 md:px-3 px-2">
                        <img src={getFlagUrl(fromCurrency)} alt={fromCurrency} className="w-6 h-4 inline-block mr-2" />
                        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="cursor-pointer">
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                    <div className="rotate-90 text-2xl"><LuArrowUpDown /></div>
                    <div className="border-2 border-black rounded flex justify-center items-center md:py-2 py-1 md:px-3 px-2">
                        <img src={getFlagUrl(toCurrency)} alt={toCurrency} className="w-6 h-4 inline-block mr-2" />
                        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="cursor-pointer">
                            {Object.keys(rates).map((currency) => (
                                <option key={currency} value={currency}>{currency}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="mt-5 md:text-xl text-xs font-bold">
                    {loading ? <p>Loading...</p> : <h3>Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}</h3>}
                </div>
                <button className="mt-5 w-full py-2 cursor-pointer  bg-blue-500 rounded text-amber-50" onClick={handleConvert}>Get Exchange rate</button>
            </div>
        </div>
    );
}

export default CurrencyConverter;
