import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const BASE_CURRENCY = "USD";

// Extended Currency to Country Mapping
const currencyToCountry = {
    USD: "United States",
    EUR: "European Union",
    GBP: "United Kingdom",
    INR: "India",
    JPY: "Japan",
    AUD: "Australia",
    CAD: "Canada",
    CNY: "China",
    KRW: "South Korea",
    CHF: "Switzerland",
    SEK: "Sweden",
    NZD: "New Zealand",
    ZAR: "South Africa",
    MXN: "Mexico",
    SGD: "Singapore",
    HKD: "Hong Kong",
    NOK: "Norway",
    THB: "Thailand",
    PLN: "Poland",
    // Add more currencies here...
};

function HistoricalRates() {
    const [rates, setRates] = useState([]);
    const [date, setDate] = useState("2025-02-10");

    useEffect(() => {
        if (!date) return;

        fetch(`https://api.frankfurter.app/${date}?from=${BASE_CURRENCY}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.rates) {
                    const chartData = Object.entries(data.rates).map(([currency, rate]) => ({
                        currency,
                        country: currencyToCountry[currency] || currency, // Fallback to currency code
                        rate: parseFloat(rate.toFixed(2)),
                    }));
                    setRates(chartData);
                } else {
                    console.error("Error fetching historical rates:", data);
                }
            })
            .catch((error) => console.error("Error fetching historical rates:", error));
    }, [date]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-1">
            <h2 className="text-3xl font-bold mb-5 text-center">📈 Historical Exchange Rates</h2>

            <label className="text-lg mb-3">Select Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-2 rounded-md text-gray-900 bg-white mb-5"
            />

            <div className="w-full max-w-4xl bg-gray-800 p-5 rounded-xl shadow-lg mx-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-center text-white">
                    Rates for {date}
                </h3>

                {rates.length > 0 ? (
                    <div className="w-full h-[300px] sm:h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={rates} margin={{ top: 20, right: 10, left: -19, bottom: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="currency"
                                    stroke="#ffffff"
                                    tick={{ fontSize: 12 }}
                                    label={{ value: "Currency", position: "insideBottom", fill: "#ffffff", fontSize: 12 }}
                                />
                                <YAxis stroke="#ffffff" tick={{ fontSize: 12 }} />
                                <Tooltip
                                    formatter={(value, name, props) => [
                                        value,
                                        `${props.payload.currency} (${props.payload.country})`,
                                    ]}
                                />
                                <Bar dataKey="rate" fill="#4ade80" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                ) : (
                    <p className="text-center text-red-400 text-sm sm:text-base">No data available for this date.</p>
                )}
            </div>

        </div>
    );
}

export default HistoricalRates;
