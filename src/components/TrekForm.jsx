import {
  AlertCircle,
  Building2,
  Car,
  Info,
  Plane,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import {
  ARRIVAL_OPTIONS,
  KTM_PKR_OPTIONS,
  PKR_LOCAL_OPTIONS,
  PKR_LOCAL_OPTIONS_RETURN,
} from "../utils/calculator";
import {
  Divider,
  Field,
  PillGroup,
  SectionCard,
  SelectInput,
  Stepper,
  Toggle,
} from "./ui";

const REGION_OPTIONS = [
  { value: "other", label: "Other Regions" },
  { value: "everest", label: "Everest Region" },
];

const HOTEL_OPTIONS = [
  { value: "none", label: "No Hotel" },
  { value: "3star", label: "3★  $50/night" },
  { value: "4star", label: "4★  $90/night" },
  { value: "5star", label: "5★ $140/night" },
];

const FLIGHT_OPTIONS = [
  { value: 0, label: "None" },
  { value: 1, label: "One-way" },
  { value: 2, label: "Return" },
];

export default function TrekForm({ form, updateField }) {
  const isSolo = form.participants === 1;
  const suggestedPorters = isSolo ? 0 : Math.ceil(form.participants / 2);
  const suggestedGuides = isSolo
    ? 0
    : Math.max(1, Math.ceil(form.participants / 8));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ─── 1. Trek Basics ─── */}
      <SectionCard
        icon={Info}
        title="Trek Details"
        subtitle="Basic trek parameters"
        step={1}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Participants">
            <Stepper
              value={form.participants}
              onChange={(v) => updateField("participants", v)}
              min={1}
              max={50}
            />
          </Field>
          <Field label="Trek Region">
            <PillGroup
              options={REGION_OPTIONS}
              value={form.region}
              onChange={(v) => updateField("region", v)}
            />
          </Field>
          <Field label="Trekking Days">
            <Stepper
              value={form.trekkingDays}
              onChange={(v) => updateField("trekkingDays", v)}
              min={1}
              max={60}
            />
          </Field>
        </div>

        {/* Food rate note */}
        <div
          style={{
            marginTop: 14,
            padding: "8px 12px",
            borderRadius: 7,
            background: "var(--accent-dim)",
            border: "1px solid var(--accent)",
            borderColor: "rgba(75,172,200,0.25)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <AlertCircle
            size={13}
            style={{ color: "var(--accent)", flexShrink: 0 }}
          />
          <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
            Food cost:{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              NPR {form.region === "everest" ? "4,500" : "4,000"}/person/day
            </strong>{" "}
            —{" "}
            {form.region === "everest"
              ? "Everest region premium"
              : "standard rate"}
          </span>
        </div>
      </SectionCard>

      {/* ─── 2. Staff ─── */}
      <SectionCard
        icon={Users}
        title="Staff"
        subtitle="Guide & porter arrangements"
        step={2}
      >
        {isSolo ? (
          <div
            className="info-badge"
            style={{
              width: "100%",
              justifyContent: "center",
              padding: "10px 14px",
            }}
          >
            <Users size={14} />
            Solo trekker — 1 Guide-Porter @ NPR 3,000/day (combined role)
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Guides"
              hint={`Suggested: ${suggestedGuides} guide${suggestedGuides > 1 ? "s" : ""} for ${form.participants} pax · NPR 2,500/day shared`}
            >
              <Stepper
                value={form.guides}
                onChange={(v) => updateField("guides", v)}
                min={0}
                max={20}
              />
            </Field>
            <Field
              label="Porters"
              hint={`Suggested: ${suggestedPorters} porter${suggestedPorters !== 1 ? "s" : ""} for ${form.participants} pax · NPR 2,500/day (shared per 2 trekkers)`}
            >
              <Stepper
                value={form.porters}
                onChange={(v) => updateField("porters", v)}
                min={0}
                max={40}
              />
            </Field>
          </div>
        )}
      </SectionCard>

      {/* ─── 3. Accommodation ─── */}
      <SectionCard
        icon={Building2}
        title="Accommodation"
        subtitle="Hotels charged at BB — shared per 2 pax"
        step={3}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Kathmandu */}
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--accent)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Kathmandu
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nights">
                <Stepper
                  value={form.ktmDays}
                  onChange={(v) => updateField("ktmDays", v)}
                  min={0}
                  max={30}
                />
              </Field>
              <Field label="Category">
                <SelectInput
                  value={form.ktmStars}
                  onChange={(v) => updateField("ktmStars", v)}
                  options={HOTEL_OPTIONS}
                />
              </Field>
            </div>
          </div>
          {/* Pokhara */}
          <div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--accent-warm)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Pokhara
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nights">
                <Stepper
                  value={form.pkrDays}
                  onChange={(v) => updateField("pkrDays", v)}
                  min={0}
                  max={30}
                />
              </Field>
              <Field label="Category">
                <SelectInput
                  value={form.pkrStars}
                  onChange={(v) => updateField("pkrStars", v)}
                  options={HOTEL_OPTIONS}
                />
              </Field>
            </div>
          </div>
        </div>
        {(form.ktmStars !== "none" || form.pkrStars !== "none") && (
          <div
            style={{
              marginTop: 12,
              fontSize: "11.5px",
              color: "var(--text-muted)",
            }}
          >
            {Math.ceil(form.participants / 2)} room
            {Math.ceil(form.participants / 2) > 1 ? "s" : ""} needed · rates in
            USD, converted @ {form.usdRate}
          </div>
        )}
      </SectionCard>

      {/* ─── 4. Ground Transport ─── */}
      <SectionCard
        icon={Car}
        title="Ground Transport"
        subtitle="Vehicle costs shared between all travelers"
        step={4}
      >
        {/* Arrival / Departure */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Arrival / Departure
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <Field label="Vehicle (shared cost)">
              <SelectInput
                value={form.arrivalVehicle}
                onChange={(v) => updateField("arrivalVehicle", v)}
                options={ARRIVAL_OPTIONS.map((o) => ({
                  value: o.value,
                  label:
                    o.cost > 0
                      ? `${o.label} — NPR ${o.cost.toLocaleString()}`
                      : o.label,
                }))}
              />
            </Field>
            <div style={{ paddingBottom: 2 }}>
              <Toggle
                checked={form.arrivalRoundTrip}
                onChange={(v) => updateField("arrivalRoundTrip", v)}
                label="Round trip"
                sublabel="Arrival + Departure"
              />
            </div>
          </div>
        </div>

        <Divider />

        {/* KTM to PKR */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Kathmandu ↔ Pokhara
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
            <Field label="Transport Mode">
              <SelectInput
                value={form.ktmPkrTransport}
                onChange={(v) => updateField("ktmPkrTransport", v)}
                options={KTM_PKR_OPTIONS.map((o) => ({
                  value: o.value,
                  label:
                    o.cost > 0
                      ? `${o.label} — NPR ${o.cost.toLocaleString()}${o.perPerson ? "/pp" : " shared"}`
                      : o.label,
                }))}
              />
            </Field>
            {form.ktmPkrTransport !== "none" && (
              <div style={{ paddingBottom: 2 }}>
                <Toggle
                  checked={form.ktmPkrRoundTrip}
                  onChange={(v) => updateField("ktmPkrRoundTrip", v)}
                  label="Round trip"
                  sublabel="KTM ↔ PKR both ways"
                />
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Pokhara Local */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Pokhara Local Transport for Start
          </div>
          <Field label="Route (Private Jeep — For Start)">
            <SelectInput
              value={form.pkrLocalTransport}
              onChange={(v) => updateField("pkrLocalTransport", v)}
              options={PKR_LOCAL_OPTIONS.map((o) => ({
                value: o.value,
                label:
                  o.cost > 0
                    ? `${o.label} — NPR ${o.cost.toLocaleString()}`
                    : o.label,
              }))}
            />
          </Field>
        </div>
        <Divider />
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Pokhara Local Transport for Return
          </div>
          <Field label="Route (Private Jeep - For Return)">
            <SelectInput
              value={form.pkrLocalTransportReturn}
              onChange={(v) => updateField("pkrLocalTransportReturn", v)}
              
              options={PKR_LOCAL_OPTIONS_RETURN.map((o) => ({
                value: o.value,
                label:
                  o.cost > 0
                    ? `${o.label} — NPR ${o.cost.toLocaleString()}`
                    : o.label,
              }))}
            />
          </Field>
        </div>
        <Divider />

        {/* Overland Jeep routes */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Overland Jeep Routes (from KTM)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
              }}
            >
              <Toggle
                checked={form.ktmMachhaKhola}
                onChange={(v) => updateField("ktmMachhaKhola", v)}
                label="KTM → Machha Khola"
                sublabel="Private Jeep — NPR 24,000 shared"
              />
            </div>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--bg-input)",
              }}
            >
              <Toggle
                checked={form.ktmSyabrubesi}
                onChange={(v) => updateField("ktmSyabrubesi", v)}
                label="KTM → Syabrubesi"
                sublabel="Private Jeep — NPR 21,000 shared"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* ─── 5. Flights ─── */}
      <SectionCard
        icon={Plane}
        title="Flights"
        subtitle="Per person, per direction — billed in USD"
        step={5}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="KTM ↔ Pokhara  ($125/person/one-way)">
            <PillGroup
              options={FLIGHT_OPTIONS.map((o) => ({
                ...o,
                label:
                  o.value === 0 ? "None" : o.value === 1 ? "One-way" : "Return",
              }))}
              value={form.ktmPkrFlight}
              onChange={(v) => updateField("ktmPkrFlight", Number(v))}
            />
          </Field>
          <Field label="KTM ↔ Lukla  ($256/person/one-way)">
            <PillGroup
              options={FLIGHT_OPTIONS.map((o) => ({
                ...o,
                label:
                  o.value === 0 ? "None" : o.value === 1 ? "One-way" : "Return",
              }))}
              value={form.ktmLuklaFlight}
              onChange={(v) => updateField("ktmLuklaFlight", Number(v))}
            />
          </Field>
        </div>
      </SectionCard>

      {/* ─── 6. Extras ─── */}
      <SectionCard
        icon={SlidersHorizontal}
        title="Extras & Settings"
        subtitle="Permits, additional costs, exchange rate"
        step={6}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field
            label="Trekking Permits"
            hint={`Auto: ${form.participants} permit${form.participants > 1 ? "s" : ""} @ NPR 4,000 each`}
          >
            <Stepper
              value={
                form.permits !== undefined ? form.permits : form.participants
              }
              onChange={(v) => updateField("permits", v)}
              min={0}
              max={50}
            />
          </Field>
          <Field
            label="Additional Costs (NPR)"
            hint="Miscellaneous, tips, extras"
          >
            <input
              className="fi"
              type="number"
              min={0}
              value={form.additionalCosts || ""}
              placeholder="0"
              onChange={(e) =>
                updateField("additionalCosts", parseInt(e.target.value) || 0)
              }
            />
          </Field>
          <Field label="USD Exchange Rate" hint="USD → NPR conversion rate">
            <Stepper
              value={form.usdRate}
              onChange={(v) => updateField("usdRate", v)}
              min={100}
              max={200}
              step={1}
            />
          </Field>
        </div>
      </SectionCard>
    </div>
  );
}
