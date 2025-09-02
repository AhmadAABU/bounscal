import React, { useState, useMemo, useEffect } from "react";

const TIERS = {
  Basic: {
    activenessPct: 6,
    bonusPct: 20,
    rows: [
      { label: "<100,000", min: 0, max: 99_999, totalPct: 14 },
      { label: "100,000 - 499,999", min: 100_000, max: 499_999, totalPct: 18 },
      {
        label: "500,000 - 1,999,999",
        min: 500_000,
        max: 1_999_999,
        totalPct: 23,
      },
      {
        label: "2,000,000 - 4,999,999",
        min: 2_000_000,
        max: 4_999_999,
        totalPct: 29,
      },
      { label: ">=5,000,000", min: 5_000_000, max: Infinity, totalPct: 36 },
    ],
  },
  Good: {
    activenessPct: 8,
    bonusPct: 27,
    rows: [
      { label: "<100,000", min: 0, max: 99_999, totalPct: 16 },
      { label: "100,000 - 499,999", min: 100_000, max: 499_999, totalPct: 20 },
      {
        label: "500,000 - 1,999,999",
        min: 500_000,
        max: 1_999_999,
        totalPct: 25,
      },
      {
        label: "2,000,000 - 4,999,999",
        min: 2_000_000,
        max: 4_999_999,
        totalPct: 31,
      },
      { label: ">=5,000,000", min: 5_000_000, max: Infinity, totalPct: 38 },
    ],
  },
  Outstanding: {
    activenessPct: 12,
    bonusPct: 35,
    rows: [
      { label: "<100,000", min: 0, max: 99_999, totalPct: 20 },
      { label: "100,000 - 499,999", min: 100_000, max: 499_999, totalPct: 24 },
      {
        label: "500,000 - 1,999,999",
        min: 500_000,
        max: 1_999_999,
        totalPct: 29,
      },
      {
        label: "2,000,000 - 4,999,999",
        min: 2_000_000,
        max: 4_999_999,
        totalPct: 35,
      },
      { label: ">=5,000,000", min: 5_000_000, max: Infinity, totalPct: 42 },
    ],
  },
};

export default function CommissionCalculator() {
  const [level, setLevel] = useState("Basic");
  const [monthlyDiamonds, setMonthlyDiamonds] = useState(0);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    const d = Number(monthlyDiamonds) || 0;
    setMonthlyIncome(d * 0.005);
  }, [monthlyDiamonds]);

  const selectedRow = useMemo(() => {
    const tier = TIERS[level];
    const d = Number(monthlyDiamonds) || 0;
    for (const row of tier.rows) {
      if (d >= row.min && d <= row.max) return row;
    }
    return tier.rows[tier.rows.length - 1];
  }, [level, monthlyDiamonds]);

  const totalPct = selectedRow.totalPct;
  const bonusPct = TIERS[level].bonusPct;
  const income = Number(monthlyIncome) || 0;
  const agencyUSD = (income * totalPct) / 100;
  const diamonds = Number(monthlyDiamonds) || 0;
  const streamerBonus = (diamonds / 200) * (totalPct / 100) * (bonusPct / 100);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          حساب مكافأة صانع المحتوى لوكالة جو
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-3 mb-6 items-center">
          <label className="text-sm">المستوى</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            {Object.keys(TIERS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>

          <label className="text-sm">دخل الالماس الشهري</label>
          <input
            type="number"
            min={0}
            value={monthlyDiamonds}
            onChange={(e) => setMonthlyDiamonds(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <label className="text-sm">الراتب بالدولار بدون مكافأة</label>
          <input
            type="number"
            value={monthlyIncome.toFixed(2)}
            readOnly
            className="border rounded-md px-3 py-2 text-sm bg-gray-100"
          />
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 space-y-3">
          <div className="flex justify-between border-b border-dashed pb-2">
            <span className="text-gray-700">Matched Tier</span>
            <span className="font-bold">{selectedRow.label}</span>
          </div>
          <div className="hidden">
            <span className="font-bold">
              $
              {agencyUSD.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between border-b border-dashed pb-2">
            <span className="text-gray-700">نسبة مكافأة صانع المحتوى %</span>
            <span className="font-bold">{bonusPct}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">مكافأة صانع المحتوى بالدولار</span>
            <span className="font-bold">
              $
              {streamerBonus.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
