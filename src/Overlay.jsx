import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeContext.jsx";
import { Sun, Moon } from "lucide-react";

export default function Overlay() {
  const [open, setOpen] = useState(false);
  const { dark, toggleDark } = useTheme();

  const TIERS = [
    {
      level: "Basic 👍",
      rules: [
        "عدد الفيديوهات : 3",
        "ايام البث خلال الشهر : 10",
        "عدد الساعات خلال الشهر : 12",
      ],
    },
    {
      level: "Good 🔥",
      rules: [
        "عدد الفيديوهات : 3",
        "ايام البث خلال الشهر : 17",
        "عدد الساعات خلال الشهر : 32",
      ],
    },
    {
      level: "Outstanding 🚀",
      rules: [
        "عدد الفيديوهات : 3",
        "ايام البث خلال الشهر : 23",
        "عدد الساعات خلال الشهر : 60",
      ],
    },
  ];
  return (
    <div className="relative bg-gray-100 dark:bg-[#081020]">
      <button
        onClick={() => setOpen(true)}
        className="fixed top-1/2 right-0 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-blue-700 transition"
      >
        🔒
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-end z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 w-full h-full p-6 relative overflow-y-auto shadow-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                إغلاق ✖
              </button>

              <h1 className="text-2xl font-bold text-center mt-10 mb-8 dark:text-gray-100">
                الشروط لكل مستوى 🔑
              </h1>

              <div className="grid grid-cols-1 gap-6 ">
                {TIERS.map((tier, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-center dark:text-gray-100">
                      {tier.level}
                    </h2>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-200 ">
                      {tier.rules.map((rule, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 justify-center text-md"
                        >
                          ✅ <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="absolute top-4 left-4 pr-3 pb-3">
                <button
                  onClick={toggleDark}
                  className="p-3 rounded-full shadow-md bg-gray-200 dark:bg-gray-700 hover:scale-110 transition-transform duration-200 flex items-center justify-center"
                >
                  {dark ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-blue-400" />
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
