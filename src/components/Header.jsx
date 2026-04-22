import { History, Moon, Mountain, Sun } from "lucide-react";

export default function Header({
  dark,
  onToggleDark,
  historyCount,
  onShowHistory,
}) {
  return (
    <header
      style={{
        background: "var(--bg-surface)",
        borderBottom: "1px solid var(--border)",
      }}
      className="sticky top-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="section-icon"
            style={{ background: "var(--accent-dim)" }}
          >
            <Mountain
              size={16}
              strokeWidth={1.8}
              style={{ color: "var(--accent)" }}
            />
          </div>
          <div className="min-w-0">
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Nepal Trek
            </div>
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                fontWeight: 600,
              }}
            >
              Cost Estimator
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* History */}
          <button
            onClick={onShowHistory}
            className="btn-secondary"
            style={{ padding: "7px 12px", fontSize: "12.5px", gap: "5px" }}
          >
            <History size={14} strokeWidth={2} />
            <span className="hidden sm:inline">History</span>
            {historyCount > 0 && (
              <span
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  borderRadius: "10px",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "1px 6px",
                  lineHeight: "16px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {historyCount}
              </span>
            )}
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-input)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 0.15s",
            }}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <Sun size={15} strokeWidth={2} />
            ) : (
              <Moon size={15} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mountain silhouette */}
      <div
        style={{
          height: 3,
          background:
            "linear-gradient(90deg, var(--accent) 0%, var(--accent-warm) 50%, var(--accent) 100%)",
          opacity: 0.6,
        }}
      />
    </header>
  );
}
