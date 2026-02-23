'use client';

import { useState, useMemo } from 'react';

import Image from 'next/image';

import { ArrowUpDown } from 'lucide-react';

import { DropDown } from '../all/DropDownMenu';

const CurrencyConverter = ({
  symbol,
  image,
  currencies,
  currenciesObj,
}: CurrencyConverterProps) => {
  const [cryptoAmount, setCryptoAmount] = useState<string>('');
  const [fiatAmount, setFiatAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const rate = currenciesObj[selectedCurrency];

  // Convert Crypto to Fiat
  const handleCryptoChange = (value: string) => {
    setCryptoAmount(value);
    const numeric = parseFloat(value);

    if (!isNaN(numeric)) {
      setFiatAmount((numeric * rate).toFixed(2).toString());
    } else {
      setFiatAmount('');
    }
  };

  // Convert Fiat to Crypto
  const handleFiatChange = (value: string) => {
    setFiatAmount(value);

    const numeric = parseFloat(value);
    if (!isNaN(numeric) && rate) {
      setCryptoAmount((numeric / rate).toFixed(8).toString());
    } else {
      setCryptoAmount('');
    }
  };

  return (
    <section className="bg-[#111827] border border-white/5 rounded-2xl p-6 space-y-5 shadow-xl">
      <h3 className="font-semibold text-lg text-white">
        {symbol.toUpperCase()} Converter
      </h3>

      <div className="bg-[#0F1623] rounded-xl px-4 py-3 flex justify-between items-center border border-white/10">
        <input
          type="number"
          placeholder="10"
          value={cryptoAmount}
          onChange={(e) => handleCryptoChange(e.target.value)}
          className="bg-transparent outline-none w-1/2 text-base text-white placeholder:text-white/30"
        />

        <div className="flex items-center gap-2">
          <Image src={image} alt="logo" width={24} height={24} />
          <span className="text-sm text-white/50">
            {symbol.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex justify-center text-white/50">
        <ArrowUpDown size={18} />
      </div>

      <div className="bg-[#0F1623] rounded-xl px-4 py-3 flex justify-between items-center border border-white/10">
        <input
          type="number"
          placeholder={`${rate * 10}`}
          value={fiatAmount}
          onChange={(e) => handleFiatChange(e.target.value)}
          className="bg-transparent outline-none w-1/2 text-base text-white placeholder:text-white/30"
        />
        <DropDown list={currencies} value={selectedCurrency} onChange={setSelectedCurrency} />
      </div>
    </section>
  );
};

export default CurrencyConverter;
