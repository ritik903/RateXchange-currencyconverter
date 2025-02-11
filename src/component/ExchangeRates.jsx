import React, { useEffect, useState } from "react";

const API_KEY = "bcc1c5585a689b5d2cae3a1d";
const BASE_CURRENCY = "USD";

function ExchangeRates() {
    const [rates, setRates] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${BASE_CURRENCY}`)
            .then((response) => response.json())
            .then((data) => {
                setRates(data.conversion_rates);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching exchange rates:", error));
    }, []);

    return (
        <div>
        </div>
    );
}

export default ExchangeRates;