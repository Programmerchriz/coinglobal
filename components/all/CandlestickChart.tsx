"use client";

import { getCandlestickConfig, getChartConfig, PERIOD_BUTTONS, PERIOD_CONFIG } from "@/constants";
import { fetcher } from "@/lib/coingecko.actions";
import { convertOHLCData, getPricePrecision } from "@/lib/utils";

import { CandlestickSeries, createChart, IChartApi, ISeriesApi, OhlcData } from "lightweight-charts";
import { startTransition, useEffect, useRef, useState, useTransition } from "react";

const CandlestickChart = ({
  children,
  data,
  coinId,
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
        // interval: config.interval,
        // precison: "full",
      });

      setOhlcData(newData ?? []);
    } catch (e) {
      console.error("Failed to fetch OHLCData:", e);
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
  }, [height, period]);

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
            className="text-sm mx-2 font-medium text-white/50"
          >
            Period:
          </span>
          {PERIOD_BUTTONS.map(({ value, label }) => (
            <button
              key={value}
              className={ period === value ? "config-button-active" : "config-button" }
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
