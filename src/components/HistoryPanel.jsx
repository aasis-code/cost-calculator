import { Clock, Mountain, RotateCcw, Trash2, Users, X } from "lucide-react";
import { fmtUSD } from "../utils/calculator";

function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function HistoryPanel({ history, onClose, onLoad, onClear }) {
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--bg-surface)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "18px",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              Calculation History
            </div>
            <div
              style={{
                fontSize: "11.5px",
                color: "var(--text-muted)",
                marginTop: 1,
              }}
            >
              {history.length} saved estimate{history.length !== 1 ? "s" : ""}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {history.length > 0 && (
              <button className="btn-danger" onClick={onClear}>
                <Trash2 size={12} strokeWidth={2} />
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: 7,
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-secondary)",
                transition: "all 0.15s",
              }}
            >
              <X size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {history.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60 }}>
              <Mountain
                size={32}
                style={{ color: "var(--text-muted)", margin: "0 auto 12px" }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18px",
                  color: "var(--text-muted)",
                }}
              >
                No history yet
              </div>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--text-muted)",
                  marginTop: 6,
                }}
              >
                Save an estimate to see it here.
              </p>
            </div>
          ) : (
            history.map((entry, i) => (
              <div
                key={entry.id}
                className="history-entry fade-up"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 5,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                        }}
                      >
                        {entry.label}
                      </span>
                      <span
                        style={{
                          padding: "1px 7px",
                          borderRadius: 4,
                          fontSize: "10px",
                          background:
                            entry.form.region === "everest"
                              ? "var(--accent-warm-dim)"
                              : "var(--accent-dim)",
                          color:
                            entry.form.region === "everest"
                              ? "var(--accent-warm)"
                              : "var(--accent)",
                          fontWeight: 600,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {entry.form.region === "everest" ? "Everest" : "Other"}
                      </span>
                    </div>

                    {/* Stats row */}
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                      {[
                        { icon: Users, val: `${entry.form.participants} pax` },
                        {
                          icon: Mountain,
                          val: `${entry.form.trekkingDays}d trek`,
                        },
                        ...(entry.form.ktmDays > 0
                          ? [{ icon: null, val: `KTM ${entry.form.ktmDays}n` }]
                          : []),
                        ...(entry.form.pkrDays > 0
                          ? [{ icon: null, val: `PKR ${entry.form.pkrDays}n` }]
                          : []),
                      ].map((s, j) => (
                        <span
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            fontSize: "11.5px",
                            color: "var(--text-muted)",
                          }}
                        >
                          {s.icon && <s.icon size={10} strokeWidth={2} />}
                          {s.val}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      NPR{" "}
                      {Math.round(entry.breakdown.total).toLocaleString(
                        "en-IN",
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {fmtUSD(entry.breakdown.totalUSD)}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "11px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <Clock size={10} strokeWidth={2} />
                    {formatDate(entry.timestamp)}
                  </div>
                  <button
                    onClick={() => onLoad(entry)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 6,
                      background: "var(--accent-dim)",
                      border: "1px solid rgba(75,172,200,0.25)",
                      color: "var(--accent)",
                      cursor: "pointer",
                      fontSize: "11.5px",
                      fontWeight: 600,
                      fontFamily: "var(--font-body)",
                      transition: "all 0.15s",
                    }}
                  >
                    <RotateCcw size={10} strokeWidth={2.5} />
                    Load
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
