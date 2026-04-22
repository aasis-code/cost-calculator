import { Bookmark, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fmt, fmtUSD } from "../utils/calculator";

function useAnimatedNumber(target) {
  const [display, setDisplay] = useState(target);
  const prevRef = useRef(target);

  useEffect(() => {
    const from = prevRef.current;
    const to = target;

    if (from === to) return;

    const start = performance.now();
    const dur = 500;

    const raf = (time) => {
      const t = Math.min((time - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);

      setDisplay(Math.round(from + (to - from) * ease));

      if (t < 1) requestAnimationFrame(raf);
      else prevRef.current = to;
    };

    requestAnimationFrame(raf);
  }, [target]);

  return display;
}

function BreakdownSection({ title, rows }) {
  const [open, setOpen] = useState(true);
  const hasValue = rows.some((r) => r.value > 0);

  if (!hasValue) return null;

  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontFamily: "var(--font-body)",
        }}
      >
        {title}
        {open ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 2 }}>
          {rows
            .filter((r) => r.value > 0)
            .map((r) => (
              <div key={r.label} className="br-row">
                <span className="br-label">{r.label}</span>
                <span className={`br-value ${r.value === 0 ? "zero" : ""}`}>
                  {fmt(r.value)}
                </span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default function CostBreakdown({ breakdown, participants, onSave }) {
  const [perPerson, setPerPerson] = useState(true);
  const animTotal = useAnimatedNumber(breakdown?.total || 0);

  if (!breakdown) {
    return (
      <div
        className="card"
        style={{ padding: "28px 20px", textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            color: "var(--text-muted)",
            marginBottom: 8,
          }}
        >
          Cost Estimator
        </div>
        <p
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            lineHeight: 1.6,
          }}
        >
          Fill in the trek details on the left to see a live cost breakdown
          here.
        </p>
      </div>
    );
  }

  const {
    guidePorterCost,
    guideCost,
    porterCost,
    foodCost,
    ktmHotelCost,
    pkrHotelCost,
    arrivalCost,
    ktmPkrCost,
    pkrLocalCost,
    ktmPkrFlightCost,
    ktmLuklaFlightCost,
    machhaKholaCost,
    syabrubesiCost,
    permitCost,
    addCost,
    total,
    totalUSD,
    perPerson: ppNPR,
    perPersonUSD,

    // ✅ FIX: safe fallback so return never disappears
    pkrLocalCostRt = breakdown?.pkrLocalCostRt || 0,
  } = breakdown;

  const displayTotal = perPerson ? ppNPR : total;
  const animDisplayTotal = perPerson ? ppNPR : animTotal;
  const displayUSD = perPerson ? perPersonUSD : totalUSD;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {/* ── Total Card ── */}
      <div className="card" style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Estimated Cost
          </div>

          <button
            onClick={() => setPerPerson((p) => !p)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 6,
              background: perPerson ? "var(--accent-dim)" : "var(--bg-input)",
              border: `1px solid ${perPerson ? "var(--accent)" : "var(--border)"}`,
              color: perPerson ? "var(--accent)" : "var(--text-muted)",
              cursor: "pointer",
              fontSize: "11px",
              fontWeight: 600,
              transition: "all 0.15s",
              fontFamily: "var(--font-body)",
            }}
          >
            <Users size={11} strokeWidth={2.5} />
            Per Person
          </button>
        </div>

        <div className="pop">
          <div className="total-display">
            NPR {Math.round(animDisplayTotal).toLocaleString("en-IN")}
          </div>

          <div className="total-usd" style={{ marginTop: 4 }}>
            ≈ {fmtUSD(displayUSD)}
          </div>

          {perPerson && participants > 1 && (
            <div
              style={{
                marginTop: 6,
                fontSize: "13px",
                color: "var(--text-muted)",
              }}
            >
              per person · {participants} participants total
            </div>
          )}
        </div>

        {/* Section bars unchanged */}
        <div style={{ marginTop: 16 }}>
          {[
            {
              key: "staff",
              label: "Staff",
              value: breakdown.sections.staff,
              color: "var(--accent)",
            },
            {
              key: "food",
              label: "Food",
              value: breakdown.sections.food,
              color: "var(--accent-warm)",
            },
            {
              key: "accommodation",
              label: "Hotels",
              value: breakdown.sections.accommodation,
              color: "#8b7cf6",
            },
            {
              key: "transport",
              label: "Transport",
              value: breakdown.sections.transport,
              color: "#52a87a",
            },
            {
              key: "flights",
              label: "Flights",
              value: breakdown.sections.flights,
              color: "#e08050",
            },
            {
              key: "permits",
              label: "Permits",
              value: breakdown.sections.permits,
              color: "#cc8844",
            },
          ]
            .filter((s) => s.value > 0)
            .map((s) => (
              <div key={s.key} style={{ marginBottom: 5 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginBottom: 2,
                  }}
                >
                  <span>{s.label}</span>
                  <span style={{ fontFamily: "var(--font-mono)" }}>
                    {Math.round((s.value / total) * 100)}%
                  </span>
                </div>

                <div
                  style={{
                    height: 4,
                    borderRadius: 2,
                    background: "var(--border)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 2,
                      background: s.color,
                      width: `${Math.round((s.value / total) * 100)}%`,
                      transition: "width 0.5s cubic-bezier(0.34,1.2,0.64,1)",
                      opacity: 0.85,
                    }}
                  />
                </div>
              </div>
            ))}
        </div>

        <button
          className="btn-primary"
          onClick={onSave}
          style={{ width: "100%", marginTop: 16 }}
        >
          <Bookmark size={14} strokeWidth={2} />
          Save to History
        </button>
      </div>

      {/* ── Line Items ── */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
            marginBottom: 12,
          }}
        >
          Line Items
        </div>

        <BreakdownSection
          title="Staff"
          rows={[
            {
              label: guidePorterCost > 0 ? "Guide-Porter (combined)" : "Guides",
              value: guidePorterCost || guideCost,
            },
            { label: "Porters", value: porterCost },
          ]}
        />

        <BreakdownSection
          title="Food & Meals"
          rows={[{ label: "Trekking food", value: foodCost }]}
        />

        <BreakdownSection
          title="Accommodation"
          rows={[
            { label: "Kathmandu hotel", value: ktmHotelCost },
            { label: "Pokhara hotel", value: pkrHotelCost },
          ]}
        />

        <BreakdownSection
          title="Ground Transport"
          rows={[
            { label: "Arrival / Departure", value: arrivalCost || 0 },
            { label: "KTM ↔ Pokhara", value: ktmPkrCost || 0 },
            { label: "Pokhara local (Start)", value: pkrLocalCost || 0 },
            { label: "Pokhara local (Return)", value: pkrLocalCostRt || 0 },
            { label: "KTM → Machha Khola jeep", value: machhaKholaCost || 0 },
            { label: "KTM → Syabrubesi jeep", value: syabrubesiCost || 0 },
          ]}
        />

        <BreakdownSection
          title="Flights"
          rows={[
            { label: "KTM ↔ Pokhara flight", value: ktmPkrFlightCost },
            { label: "KTM ↔ Lukla flight", value: ktmLuklaFlightCost },
          ]}
        />

        <BreakdownSection
          title="Permits & Other"
          rows={[
            { label: "Trekking permits", value: permitCost },
            { label: "Additional costs", value: addCost },
          ]}
        />

        <div
          style={{
            marginTop: 8,
            paddingTop: 10,
            borderTop: "2px solid var(--border-strong)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: 600 }}>Total</span>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              NPR {Math.round(total).toLocaleString("en-IN")}
            </div>
            <div style={{ fontSize: "11.5px", color: "var(--text-muted)" }}>
              {fmtUSD(totalUSD)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
