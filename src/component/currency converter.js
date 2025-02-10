
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const  [fromCurrency, setFromCurrency] = useState("USD");

    const [toCurrency, setToCurrency] = useState("INR");

   const [amount, setAmount] = useState(0);

  const [convertedAmount, setConvertedAmount] = useState(null);
   const [error, setError] = useState(null);

      useEffect(() => {
        fetchCurrencies();
      }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      setCurrencies(Object.keys(response.data.rates));
    } catch (err) {
      setError("Failed to fetch currency data");
    }
  };

  const convertCurrency = async() => {
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      const rate = response.data.rates[toCurrency];
      setConvertedAmount((amount * rate).toFixed(2));
    } catch (err) {
      setError("sorry! Conversion failed. Please try again.");
    }
  };

  return (
    
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 rounded border-0">
             {/* <div class="shadow p-3 mb-5 bg-white rounded"> */}
            <h2 className="text-center text-primary fw-bold mb-4">Currency_Converter</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
              <label className="form-label fw-semibold">Enter Amount:-</label>
              <input
                type="number"
                className="form-control border-primary"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-3">
                <label className="form-label fw-semibold">From:-</label>
                 <select
                      className="form-select border-primary"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    >

                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                 </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">To:-</label>
              <select
                className="form-select border-primary"
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)} >


                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary w-100 fw-bold" onClick={convertCurrency}> Convert </button>
            {convertedAmount && (
              <div className="mt-4 p-3 bg-light text-center rounded shadow-sm">
                <h3 className="text-success fw-bold">Converted Amount:</h3>
                <h2 className="text-dark">{convertedAmount} {toCurrency}</h2>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
