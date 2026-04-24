import { Minus, Plus } from "lucide-react";

export function Field({ label, hint, children }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {hint && (
        <p
          style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: 4 }}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

export function Stepper({ value, onChange, min = 0, max = 999, step = 1 }) {
  const dec = () => onChange(Math.max(min, (value || 0) - step));
  const inc = () => onChange(Math.min(max, (value || 0) + step));
  return (
    <div className="stepper">
      <button className="stepper-btn" onClick={dec} type="button">
        <Minus size={13} strokeWidth={2.5} />
      </button>
      <input
        className="stepper-input"
        type="number"
        value={value ?? 0}
        min={min}
        max={max}
        onChange={(e) => {
          const v = parseInt(e.target.value);
          if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)));
        }}
      />
      <button className="stepper-btn" onClick={inc} type="button">
        <Plus size={13} strokeWidth={2.5} />
      </button>
    </div>
  );
}

export function Toggle({ checked, onChange, label, sublabel }) {
  return (
    <div className="toggle-wrap" onClick={() => onChange(!checked)}>
      <div className={`toggle-track ${checked ? "on" : ""}`}>
        <div className="toggle-thumb" />
      </div>
      {label && (
        <div>
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
          {sublabel && (
            <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
              {sublabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function PillGroup({ options, value, onChange }) {
  return (
    <div className="pill-group">
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`pill ${value === opt.value ? "active" : ""}`}
          onClick={() => onChange(opt.value)}
          type="button"
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function SectionCard({ icon: Icon, title, subtitle, step, children }) {
  return (
    <div className="card fade-up" style={{ padding: "20px" }}>
      <div className="flex items-start gap-3 mb-5">
        <div style={{ position: "relative" }}>
          <div className="section-icon">
            <Icon size={15} strokeWidth={1.8} />
          </div>
          {step && (
            <span
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "var(--accent)",
                color: "#fff",
                fontSize: "9px",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                border: "2px solid var(--bg-card)",
              }}
            >
              {step}
            </span>
          )}
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "16px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: "11.5px",
                color: "var(--text-muted)",
                marginTop: 1,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export function Divider() {
  return (
    <div style={{ borderTop: "1px solid var(--border)", margin: "14px 0" }} />
  );
}

export function SelectInput({ value, onChange, options, className = "" }) {
  return (
    <select
      className={`fi fi-select ${className}`}
      value={value ?? "none"}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
