"use client";

import { useEffect, useRef } from "react";

export default function TradingViewWidget() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "BINANCE:BTCUSDT",
      interval: "60",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: false,
      enable_publishing: false,
    });

    ref.current.innerHTML = "";
    ref.current.appendChild(script);
  }, []);

  return <div ref={ref} className="w-full h-52" />;
};
