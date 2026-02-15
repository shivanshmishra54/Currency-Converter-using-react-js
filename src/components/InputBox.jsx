import React, { useId } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = 'usd',
    amountDisable = false,
    currencyDisable = false,
    className = "",
    loading = false,
}) {
    const amountInputId = useId();

    // Helper to get country code for flag (e.g., "usd" -> "US")
    // Note: This is a basic heuristic. For production, you might want a proper mapping library.
    const getFlagUrl = (currencyCode) => {
        if (!currencyCode) return "";
        const countryCode = currencyCode.substring(0, 2).toUpperCase();
        return `https://flagsapi.com/${countryCode}/flat/64.png`;
    };

    return (
        <div className={`bg-white rounded-xl p-4 shadow-sm border border-gray-200 ${className}`}>
            <div className="flex justify-between items-center mb-2">
                <label htmlFor={amountInputId} className="text-sm font-medium text-gray-600">
                    {label}
                </label>
                <div className='flex items-center gap-2'>
                    {/* Flag Image */}
                    <img 
                        src={getFlagUrl(selectCurrency)} 
                        alt="flag" 
                        className="w-5 h-5 object-contain opacity-80"
                        onError={(e) => e.target.style.display = 'none'} // Hide if flag not found
                    />
                    <p className="text-xs text-gray-400">Currency</p>
                </div>
            </div>

            <div className="flex gap-3">
                <input
                    id={amountInputId}
                    type="number"
                    placeholder="0.00"
                    disabled={amountDisable}
                    value={amount}
                    // Handle case where user clears input (empty string)
                    onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
                    className="flex-1 bg-gray-100 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
                />

                <select
                    value={selectCurrency}
                    disabled={currencyDisable || loading}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    className="bg-gray-100 rounded-lg px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200 cursor-pointer uppercase font-medium"
                >
                    {loading ? (
                        <option>Loading...</option>
                    ) : (
                        currencyOptions.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency.toUpperCase()}
                            </option>
                        ))
                    )}
                </select>
            </div>
        </div>
    );
}

export default InputBox;