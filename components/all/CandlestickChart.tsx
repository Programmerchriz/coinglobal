"use client";

import { CandlestickSeries, ColorType, createChart, IChartApi, ISeriesApi } from "lightweight-charts";
import { useEffect, useRef, useState, useTransition } from "react";

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from "@/constants";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, convertOHLCData, getPricePrecision } from "@/lib/utils";

const CandlestickChart = ({
  children,
  data,
  coinId,
  theme,
  height = 360,
  initialPeriod = "daily",
}: CandlestickChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [ period, setPeriod ] = useState(initialPeriod);
  const [ ohlcData, setOhlcData ] = useState<OHLCData[] | null>(data ?? []);

  const [ isPending, startTransition ] = useTransition();

  const fetchOHLCData = async (selectedPeriod: Period) => {
    try {
      const config = PERIOD_CONFIG[selectedPeriod];

      const newData = await fetcher<OHLCData[]>(`/coins/${coinId}/ohlc`, {
        vs_currency: 'usd',
        days: config.days,
      });

      setOhlcData(newData ?? []);
    } catch (e) {
      console.error("Failed to fetch OHLCData:", e);
      throw new Error("Failed to fetch chart data");
    };
  };

  const handlePeriodChange = (newPeriod: Period) => {
    if (newPeriod === period) return;
    
    startTransition(() => {
      setPeriod(newPeriod);
      fetchOHLCData(newPeriod);
    });
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const showTime = [ "daily", "weekly", "monthly" ].includes(period);
      const chart = createChart(container, {
        ...getChartConfig(height, showTime),
        width: container.clientWidth,
        rightPriceScale: {
          visible: true,
          autoScale: true,
          borderVisible: false,
          minimumWidth: 90,
        },
      });

    const convertToSeconds = ohlcData?.map((item) => [
      Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4] ] as OHLCData
    ) || [];
    
    const { precision, minMove } = getPricePrecision(convertToSeconds);

    const series = chart.addSeries(CandlestickSeries, {
      ...getCandlestickConfig(),
      priceFormat: {
        type: 'price',
        precision,
        minMove,
      },
    });
    
    series.setData(convertOHLCData(convertToSeconds || []));
    chart.timeScale().fitContent();
    
    chartRef.current = chart;
    candleSeriesRef.current = series;

    const observer = new ResizeObserver((entries) => {
      if (!entries.length) return;

      const { width } = entries[0].contentRect;

      chart.applyOptions({
        width,
        localization: {
          priceFormatter: (price: number) => {
            return price.toFixed(precision);
          },
        },
      });

      chart.timeScale().fitContent();
    });
    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.remove();
      candleSeriesRef.current = null;
    };
  }, [height]);

  useEffect(() => {
    if (!candleSeriesRef.current || !ohlcData) return;

    const convertToSeconds = ohlcData.map((item) => [
      Math.floor(item[0] / 1000), item[1], item[2], item[3], item[4] ] as OHLCData
    ) || [];

    const converted = convertOHLCData(convertToSeconds);
    candleSeriesRef.current?.setData(converted);
    chartRef.current?.timeScale().fitContent();

    const { precision, minMove } = getPricePrecision(convertToSeconds);

    candleSeriesRef.current.applyOptions({
      priceFormat: {
        type: 'price',
        precision,
        minMove,
      },
    });
  }, [ohlcData, period]);

  useEffect(() => {
    if (!chartRef.current) return;

    const isDark = theme === "dark";

    const chartColors = {
      layout: {
        dark: {
          bg: "#0a0a0a",
          text: "#d1d5db",
        },

        light: {
          bg: "#F7F9FC",
          text: "#374151",
        },
      },

      grid: {
        dark: {
          vert: "rgba(255, 255, 255, 0.08)",
          hor: "rgba(255, 255, 255, 0.08)",
        },

        light: {
          vert: "rgba(0, 0, 0, 0.08)",
          hor: "rgba(0, 0, 0, 0.08)",
        },
      },
    };

    chartRef.current.applyOptions({
      layout: {
        background: {
          type: ColorType.Solid,
          color: isDark ? chartColors.layout.dark.bg : chartColors.layout.light.bg,
        },
        textColor: isDark ? chartColors.layout.dark.text : chartColors.layout.light.text,
      },

      grid: {
        vertLines: {
          color: isDark ? chartColors.grid.dark.vert : chartColors.grid.light.vert,
        },
        horzLines: {
          color: isDark ? chartColors.grid.dark.hor : chartColors.grid.light.hor,
        },
      },
    });

    candleSeriesRef.current?.applyOptions({
      upColor: isDark ? "#22c55e" : "#16a34a",
      downColor: isDark ? "#ef4444" : "#dc2626",
      wickUpColor: isDark ? "#22c55e" : "#16a34a",
      wickDownColor: isDark ? "#ef4444" : "#dc2626",
    });

  }, [theme]);

  return (
    <div
      id="candlestick-chart"
    >
      <div
        className="chart-header"
      >
        <div
          className="flex-1"
        >
          { children }
        </div>

        <div 
          className="button-group"
        >
          <span
            className="text-sm mx-2 font-medium text-(--color-50)"
          >
            Period:
          </span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={ cn("text-white", period === value ? "config-button-active" : "config-button") }
              onClick={() => handlePeriodChange(value)}
              disabled={isPending}
            >
              { label }
            </button>
          ))}
        </div>
      </div>

      <div
        ref={chartContainerRef}
        className="chart"
        style={{height}}
      />
    </div>
  )
}

export default CandlestickChart;
