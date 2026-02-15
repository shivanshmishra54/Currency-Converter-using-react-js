import React from 'react'
import { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions= [],
    selectCurrency='usd',
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   
    const amountInputId = useId();

   return (
  <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 ${className}`}>
    <div className="flex justify-between items-center mb-2">
      <label htmlFor={amountInputId} className="text-sm font-medium text-gray-600">
        {label}
      </label>
      <p className="text-xs text-gray-400">Currency</p>
    </div>

    <div className="flex gap-3">
      <input
        id={amountInputId}
        type="number"
        placeholder="0.00"
        disabled={amountDisable}
        value={amount}
        onChange={(e) =>
           onAmountChange(e.target.value)
        }
        className="flex-1 bg-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
      />

      <select
        value={selectCurrency}
        disabled={currencyDisable}
        onChange={(e) =>
          onCurrencyChange && onCurrencyChange(e.target.value)
        }
        className="bg-gray-100 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 cursor-pointer"
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  </div>
);

}

export default InputBox;
