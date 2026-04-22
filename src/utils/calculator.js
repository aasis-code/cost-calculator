export const HOTEL_RATES_USD = { "3star": 50, "4star": 90, "5star": 140 };
export const HOTEL_LABELS = {
  "3star": "3★ ($50/night)",
  "4star": "4★ ($90/night)",
  "5star": "5★ ($140/night)",
  none: "No Hotel",
};

export const ARRIVAL_OPTIONS = [
  { value: "none", label: "None", cost: 0 },
  { value: "car", label: "Car", cost: 1500 },
  { value: "hiace", label: "Hiace", cost: 2500 },
  { value: "minibus", label: "Mini Bus / Coaster", cost: 4000 },
  { value: "sutlej", label: "Sutlej Bus", cost: 6000 },
];

export const KTM_PKR_OPTIONS = [
  { value: "none", label: "None", cost: 0, perPerson: false },
  { value: "bus_public", label: "Public Bus", cost: 1500, perPerson: true },
  { value: "car", label: "Private Car", cost: 15000, perPerson: false },
  { value: "jeep", label: "Private Jeep", cost: 20000, perPerson: false },
  { value: "hiace", label: "Private Hiace", cost: 25000, perPerson: false },
  { value: "bus_private", label: "Private Bus", cost: 45000, perPerson: false },
];

export const PKR_LOCAL_OPTIONS = [
  { value: "none", label: "None", cost: 0 },
  { value: "birethanti", label: "Pokhara ↔ Birethanti (Jeep)", cost: 5000 },
  { value: "samrong", label: "Pokhara ↔ Samrong (Jeep)", cost: 8000 },
  { value: "ghandruk", label: "Pokhara ↔ Ghandruk (Jeep)", cost: 7000 },
];

export const PKR_LOCAL_OPTIONS_RETURN = [
  { value: "none", label: "None", cost: 0 },
  { value: "birethanti", label: "Birethanti ↔ Pokhara (Jeep)", cost: 5000 },
  { value: "samrong", label: "Samrong ↔ Pokhara (Jeep)", cost: 8000 },
  { value: "ghandruk", label: "Ghandruk ↔ Pokhara (Jeep)", cost: 7000 },
];

export const JEEP_OPTIONS = [
  { value: "machha_khola", label: "KTM → Machha Khola (Jeep)", cost: 24000 },
  { value: "syabrubesi", label: "KTM → Syabrubesi (Jeep)", cost: 21000 },
];

export function fmt(n) {
  if (n === 0) return "—";
  return "NPR " + Math.round(n).toLocaleString("en-IN");
}

export function fmtUSD(n) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function calculateCosts(form) {
  const {
    participants,
    region,
    trekkingDays,
    guides,
    porters,
    ktmDays,
    ktmStars,
    pkrDays,
    pkrStars,
    arrivalVehicle,
    arrivalRoundTrip,
    ktmPkrTransport,
    ktmPkrRoundTrip,
    pkrLocalTransport,
    pkrLocalTransportReturn,
    ktmPkrFlight,
    ktmLuklaFlight,
    ktmMachhaKhola,
    ktmSyabrubesi,
    permits,
    additionalCosts,
    usdRate,
  } = form;

  const pax = Math.max(1, participants || 1);
  const days = Math.max(0, trekkingDays || 0);
  const rate = usdRate || 135;

  // ── Staff ──
  let guidePorterCost = 0,
    guideCost = 0,
    porterCost = 0;
  if (pax === 1) {
    guidePorterCost = 3000 * days;
  } else {
    guideCost = (guides || 0) * 2500 * days;
    porterCost = (porters || 0) * 2500 * days;
  }

  // ── Food ──
  const foodRate = region === "everest" ? 4500 : 4000;
  const foodCost = pax * foodRate * days;

  // ── Accommodation ──
  const rooms = Math.ceil(pax / 2);
  const ktmHotelCost =
    ktmStars !== "none"
      ? rooms * (HOTEL_RATES_USD[ktmStars] || 0) * (ktmDays || 0) * rate
      : 0;
  const pkrHotelCost =
    pkrStars !== "none"
      ? rooms * (HOTEL_RATES_USD[pkrStars] || 0) * (pkrDays || 0) * rate
      : 0;

  // ── Arrival/Departure ──
  const arrOpt = ARRIVAL_OPTIONS.find((o) => o.value === arrivalVehicle);
  const arrBase = arrOpt ? arrOpt.cost : 0;
  const arrivalCost = arrBase * (arrivalRoundTrip ? 2 : 1);

  // ── KTM-PKR Transport ──
  const ktmPkrOpt = KTM_PKR_OPTIONS.find((o) => o.value === ktmPkrTransport);
  let ktmPkrCost = 0;
  if (ktmPkrOpt) {
    ktmPkrCost = ktmPkrOpt.perPerson ? ktmPkrOpt.cost * pax : ktmPkrOpt.cost;
    if (ktmPkrRoundTrip && ktmPkrTransport !== "none") ktmPkrCost *= 2;
  }

  // ── Pokhara Local ──
  const pkrOpt = PKR_LOCAL_OPTIONS.find((o) => o.value === pkrLocalTransport);
  const pkrLocalCost = pkrOpt ? pkrOpt.cost : 0;

  // ── Pokhara Local Return ──
  const pkrLocalTransportReturnSafe = pkrLocalTransportReturn || "none";

  const pkrOptRt = PKR_LOCAL_OPTIONS_RETURN.find(
    (o) => o.value === pkrLocalTransportReturnSafe,
  );

  const pkrLocalCostRt = pkrOptRt ? pkrOptRt.cost : 0;

  // ── Flights ──
  const ktmPkrFlightCost = (ktmPkrFlight || 0) * pax * 125 * rate;
  const ktmLuklaFlightCost = (ktmLuklaFlight || 0) * pax * 256 * rate;
  const machhaKholaCost = ktmMachhaKhola ? 24000 : 0;
  const syabrubesiCost = ktmSyabrubesi ? 21000 : 0;

  // ── Permits ──
  const permitCost = (permits !== undefined ? permits : pax) * 4000;

  // ── Additional ──
  const addCost = additionalCosts || 0;

  // ── Total ──
  const sections = {
    staff: guidePorterCost + guideCost + porterCost,
    food: foodCost,
    accommodation: ktmHotelCost + pkrHotelCost,
    transport: arrivalCost + ktmPkrCost + pkrLocalCost + pkrLocalCostRt,
    flights:
      ktmPkrFlightCost + ktmLuklaFlightCost + machhaKholaCost + syabrubesiCost,
    permits: permitCost,
    additional: addCost,
  };

  const total = Object.values(sections).reduce((s, v) => s + v, 0);

  return {
    guidePorterCost,
    guideCost,
    porterCost,
    foodCost,
    ktmHotelCost,
    pkrHotelCost,
    arrivalCost,
    ktmPkrCost,
    pkrLocalCost,
    pkrLocalCostRt,
    ktmPkrFlightCost,
    ktmLuklaFlightCost,
    machhaKholaCost,
    syabrubesiCost,
    permitCost,
    addCost,
    sections,
    total,
    totalUSD: total / rate,
    perPerson: total / pax,
    perPersonUSD: total / rate / pax,
  };
}
