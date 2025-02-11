import React, { useEffect, useState } from "react";

const API_KEY = "bcc1c5585a689b5d2cae3a1d";
const ALERT_THRESHOLD = 300;

function CurrencyAlerts() {
    const [rates, setRates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setRates(data.conversion_rates);
                setLoading(false);

                // ✅ Alert trigger agar PKR rate threshold cross kare
                if (data.conversion_rates["PKR"] > ALERT_THRESHOLD) {
                    alert("PKR rate has gone above 300!");
                }
            })
            .catch((error) => {
                console.error("Error fetching rates:", error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    // Function to get country flag URL
    const getFlagUrl = (currency) => {
        return `https://flagcdn.com/w40/${currency.slice(0, 2).toLowerCase()}.png`;
    };

    return (
        <div className="p-6">
            <h2 className="font-bold mb-4 text-center text-3xl text-amber-50">Currency Alerts</h2>

            {loading && <div className="flex justify-center items-center min-h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
            </div>}
            {error && <p className="text-red-500">Error: {error}</p>}

            {!loading && rates && (
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-900 text-amber-50">
                                <th className="border border-gray-300 px-4 py-2">Flag</th>
                                <th className="border border-gray-300 px-4 py-2">Currency</th>
                                <th className="border border-gray-300 px-4 py-2">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(rates).map(([currency, rate]) => (
                                <tr key={currency} className="border-t">
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <img src={getFlagUrl(currency)} alt={currency} className="w-8 h-5 mx-auto" />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 font-medium text-amber-50">{currency}</td>
                                    <td className="border border-gray-300 px-4 py-2  text-amber-50">{rate.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <footer className="flex flex-col gap-2 text-center mt-5">
                <p className="md:text-xl text-xs text-amber-50">&copy;Design & Developed By Ritik Choudhary</p>
                <p className="md:text-xl text-xs text-amber-300">ritikchoudhary90566@gmail.com</p>
            </footer>
        </div>
    );
}

export default CurrencyAlerts;