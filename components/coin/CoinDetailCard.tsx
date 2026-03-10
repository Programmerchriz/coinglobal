
"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const CoinDetailCard = ({
  coinDetailsArray,
}: CoinDetailCardProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {coinDetailsArray.map((detail) => detail.isLink && detail.href != "/" ? (
        <Link
          key={detail.title}
          href={`${detail.href}`}
          target="_blank"
        >
          <DetailCard
            title={detail.title}
            value={detail.title}
            isLink={true}
          />
        </Link>
      ) : (
        <DetailCard
          key={detail.title}
          title={detail.title}
          value={detail.value ?? `No ${detail.title}`}
          isLink={false}
        />
      ))}
    </div>
  )
};

const DetailCard = ({ title, value, isLink }: DetailCardProps) => {
  return (
  <div className={`bg-(--bg-surface) border border-(--color-5) rounded-lg p-4 ${isLink ? "hover:bg-(--color-10)" : ""}`}>
    <p className="text-sm text-(--color-40) mb-1">{title}</p>

    <div className="flex gap-1 items-center">
      <p
        className={`text-sm font-medium ${
          isLink ? "text-(--color-success)" : "text-(--color-100)"
        }`}
      >
        {value}
      </p>

      {isLink && (
        <ArrowUpRight
          width={20}
          className="text-(--color-success)"
        />
      )}
    </div>
  </div>
);
};

export default CoinDetailCard;
