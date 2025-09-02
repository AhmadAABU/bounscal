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
  const [dark, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

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
  const finalSalary = Number(monthlyIncome) + streamerBonus;

  return (
    <div className="bg-[#f3f3f3] flex h-screen justify-center items-center px-4 md:px-0 dark:bg-[#081020]">
      <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-md relative dark:bg-gray-800 dark:text-gray-100 ">
        <div className="absolute bottom-0 right-0 pr-2.5 pb-2.5">
          <button className="toggle-mode text-md" onClick={toggleDarkMode}>
            {dark ? "🌞" : "🌙"}
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          حساب مكافأة صانع المحتوى لوكالة جو
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-x-6 gap-y-3 mb-6 items-center ">
          <label className="text-md">المستوى</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded-md px-3 py-2 text-md dark:bg-gray-700"
          >
            {Object.keys(TIERS).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>

          <label className="text-md">دخل الالماس الشهري</label>
          <input
            type="number"
            min={0}
            value={monthlyDiamonds}
            onChange={(e) => setMonthlyDiamonds(e.target.value)}
            className="border rounded-md px-3 py-2 text-md dark:bg-gray-700"
          />

          <label className="text-md">الراتب بالدولار بدون مكافأة</label>
          <input
            type="number"
            value={monthlyIncome.toFixed(2)}
            readOnly
            className="border rounded-md px-3 py-2 text-md dark:bg-gray-700"
          />
        </div>
        <div className="bg-gray-50 border rounded-lg p-4 space-y-3 text-md dark:bg-gray-700  dark:text-gray-100">
          <div className="flex justify-between border-b border-dashed pb-2">
            <span>Matched Tier</span>
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
            <span>نسبة مكافأة صانع المحتوى %</span>
            <span className="font-bold">{bonusPct}%</span>
          </div>
          <div className="flex justify-between">
            <span>مكافأة صانع المحتوى بالدولار</span>
            <span className="font-bold">
              $
              {streamerBonus.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between border-t border-dashed pt-2">
            <span>الراتب النهائي بالدولار مع المكأفاة</span>
            <span className="font-bold">
              $
              {finalSalary.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
        <h2 className="text-xl font-semibold mt-5 text-center">
          للتسجيل مع وكالة جو
        </h2>
        <div className="flex justify-center mt-3">
          <a
            href="https://wa.me/962787039611"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.9 11.9 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.07 1.52 5.78L0 24l6.29-1.51A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.25-6.18-3.48-8.52zM12 21.5a9.5 9.5 0 0 1-4.91-1.38l-.35-.22-3.73.9.95-3.63-.23-.36A9.5 9.5 0 1 1 12 21.5zm5.36-7.64c-.28-.14-1.65-.81-1.9-.91-.25-.11-.43-.14-.61.14-.18.28-.7.91-.86 1.1-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.33-.8-.71-1.34-1.59-1.5-1.87-.16-.28-.02-.43.12-.57.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.47.07-.72.34s-.94.91-.94 2.21c0 1.3.96 2.56 1.09 2.74.14.18 1.88 2.87 4.56 4.02.64.28 1.14.45 1.53.58.64.21 1.22.18 1.68.11.51-.08 1.65-.67 1.88-1.32.23-.64.23-1.19.16-1.32-.07-.14-.25-.22-.53-.36z" />
            </svg>
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
