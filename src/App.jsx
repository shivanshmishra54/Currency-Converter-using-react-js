import { useState, useEffect } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './Hooks/UseCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [isRotated, setIsRotated] = useState(false)
  const [history, setHistory] = useState([])

  // Destructure data, loading, and error from our custom hook
  const { data: currencyInfo, loading, error } = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo || {})

  // Real-time conversion effect
  useEffect(() => {
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount((Number(amount) * currencyInfo[to]).toFixed(2))
    }
  }, [amount, from, to, currencyInfo])

  const swap = () => {
    setIsRotated(!isRotated) // Trigger animation state
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  // Function to save current conversion to history
  const saveToHistory = () => {
    const newEntry = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`
    // Prevent duplicate consecutive entries
    if (history[0] !== newEntry) {
        setHistory(prev => [newEntry, ...prev].slice(0, 5)) // Keep only last 5
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4 font-sans">
      <div className="w-full max-w-md">

        <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl border border-white/50">

          <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Currency Converter
          </h1>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center text-sm">
              Error fetching rates: {error}
            </div>
          )}

          <div className="space-y-4">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
              loading={loading}
            />

            <div className="flex justify-center -my-2 relative z-10">
              <button
                type="button"
                onClick={swap}
                className={`bg-indigo-600 text-white p-2 rounded-full shadow-lg border-2 border-white 
                  hover:bg-indigo-700 active:scale-95 transition-all duration-500 ease-in-out
                  ${isRotated ? 'rotate-180' : 'rotate-0'}`} 
              >
                 {/* Simple SVG Icon for clearer rotation */}
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                </svg>
              </button>
            </div>

            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
              loading={loading}
            />

            {/* Save Button instead of Convert Button */}
            <button
              onClick={saveToHistory}
              disabled={loading || amount <= 0}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
            >
              {loading ? "Getting Rates..." : "Save Calculation"}
            </button>
          </div>
        </div>

        {/* History Section */}
        {history.length > 0 && (
          <div className="mt-6 bg-white/50 backdrop-blur-md rounded-xl p-4 shadow-sm animate-fade-in">
            <h3 className="text-gray-600 font-semibold mb-2 text-sm uppercase tracking-wider">Recent History</h3>
            <ul className="space-y-2">
              {history.map((item, index) => (
                <li key={index} className="text-gray-700 bg-white/60 p-2 rounded-lg text-sm flex justify-between border border-gray-100">
                  <span>{item}</span>
                  <span className="text-gray-400 text-xs flex items-center">Just now</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;