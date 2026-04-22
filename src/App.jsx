import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import CostBreakdown from "./components/CostBreakdown";
import Header from "./components/Header";
import HistoryPanel from "./components/HistoryPanel";
import TrekForm from "./components/TrekForm";
import { calculateCosts } from "./utils/calculator";

const DEFAULT_FORM = {
  participants: 2,
  region: "other",
  trekkingDays: 7,
  guides: 1,
  porters: 1,
  ktmDays: 2,
  ktmStars: "3star",
  pkrDays: 1,
  pkrStars: "3star",
  arrivalVehicle: "car",
  arrivalRoundTrip: true,
  ktmPkrTransport: "none",
  ktmPkrRoundTrip: false,
  pkrLocalTransport: "none",
pkrLocalTransportReturn: "none",
  ktmPkrFlight: 0,
  ktmLuklaFlight: 0,
  ktmMachhaKhola: false,
  ktmSyabrubesi: false,
  permits: 2,
  additionalCosts: 0,
  usdRate: 145,
};

const TS = {
  background: "var(--bg-card)",
  color: "var(--text-primary)",
  border: "1px solid var(--border)",
  borderRadius: "9px",
  fontSize: "13px",
  fontFamily: "var(--font-body)",
  boxShadow: "var(--shadow-lg)",
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("trekHistory") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const breakdown = useMemo(() => calculateCosts(form), [form]);

  const updateField = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "participants") {
        next.permits = value;
        if (value === 1) {
          next.guides = 0;
          next.porters = 0;
        } else if (prev.participants === 1) {
          next.guides = 1;
          next.porters = Math.ceil(value / 2);
        }
      }
      return next;
    });
  };

  const saveToHistory = () => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      label: `${form.participants} pax · ${form.trekkingDays}d trek`,
      form: { ...form },
      breakdown,
    };
    const updated = [entry, ...history].slice(0, 30);
    setHistory(updated);
    localStorage.setItem("trekHistory", JSON.stringify(updated));
    toast.success("Saved to history", { style: TS });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("trekHistory");
    toast.success("History cleared", { style: TS });
    setShowHistory(false);
  };

  const loadFromHistory = (entry) => {
    setForm(entry.form);
    setShowHistory(false);
    toast.success("Estimate loaded", { style: TS });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        color: "var(--text-primary)",
      }}
    >
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000, style: TS }}
      />
      <Header
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        historyCount={history.length}
        onShowHistory={() => setShowHistory(true)}
      />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <div style={{ marginBottom: 24 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px,4vw,36px)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Trekking Cost Estimator
          </h1>
          <p
            style={{
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              marginTop: 6,
              maxWidth: 480,
            }}
          >
            Build a detailed cost breakdown for your Nepal trek package — all
            costs in NPR with live USD conversion.
          </p>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">
          <TrekForm form={form} updateField={updateField} />
          <div className="xl:sticky xl:top-20">
            <CostBreakdown
              breakdown={breakdown}
              participants={form.participants}
              onSave={saveToHistory}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
            fontSize: "11.5px",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          All prices in NPR unless noted · Hotel rates in USD converted at
          current exchange rate · Figures are estimates
        </div>
      </main>
      {showHistory && (
        <HistoryPanel
          history={history}
          onClose={() => setShowHistory(false)}
          onLoad={loadFromHistory}
          onClear={clearHistory}
        />
      )}
    </div>
  );
}
