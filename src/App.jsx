import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './Hooks/UseCurrencyInfo'


function App() {

  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    const temp = from
    setFrom(to)
    setTo(temp)

    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }

  const convert = () => {
  if (!currencyInfo[to]) return
  const numericAmount = Number(amount)
  setConvertedAmount(numericAmount * currencyInfo[to])
}


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 p-4">
    <div className="w-full max-w-md">

      <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl">

        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Currency Converter
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
          className="space-y-4"
        >
          <InputBox
            label="From"
            amount={amount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setFrom(currency)}
            selectCurrency={from}
            onAmountChange={(amount) => setAmount(amount)}
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="bg-indigo-500 text-white px-4 py-1.5 rounded-full shadow-md hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              ⇅ Swap
            </button>
          </div>

          <InputBox
            label="To"
            amount={convertedAmount}
            currencyOptions={options}
            onCurrencyChange={(currency) => setTo(currency)}
            selectCurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-medium shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200"
          >
            Convert {from.toUpperCase()} → {to.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  </div>
);

}


export default App;