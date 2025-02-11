import React, { useState, useEffect } from "react";
import ExchangeRates from "./component/ExchangeRates";
import CurrencyConverter from "./component/CurrencyConverter";
import HistoricalRates from "./component/HistoricalRates";
import CurrencyAlerts from "./component/CurrencyAlerts";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Replace this with actual API call
  }, []);

  return (
    <div className="bg-gray-700 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
          <div className="relative flex">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-ping absolute opacity-75"></div>
            <div className="w-16 h-16 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-center py-5 font-extrabold md:text-4xl text-2xl text-amber-50">
            Currency Exchange App
          </h1>
          <ExchangeRates />
          <CurrencyConverter />
          <HistoricalRates />
          <CurrencyAlerts />
        </>
      )}
    </div>
  );
}

export default App;
