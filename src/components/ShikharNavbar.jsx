import { ChevronDown, Clock, Search, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import profileImage from "./../assets/dambar-thapa.jpg";
import EverestImage from "./../assets/everest-trek.jpg";
import Logo from "./../assets/logo.png";
const experienceColumns = [
  [
    {
      title: "Popular Treks",
      items: [
        "Everest Base Camp Trek - 14 Days",
        "Annapurna Base Camp Trek - 12 Days",
        "Ghorepani Poon Hill Trek - 9 Days",
        "Langtang Valley Trek - 9 Days",
        "Manaslu Circuit Trek - 14 Days",
        "Mardi Himal Trek - 9 Days",
        "Annapurna Circuit Trek - 13 Days",
        "EBC Helicopter Return Trek - 12 Days",
        "Gokyo Valley Trek - 14 Days",
        "Upper Mustang Trek - 16 Days",
      ],
    },
  ],
  [
    {
      title: "Short & Easy",
      items: [
        "Ama Yangri Trek - 2 Days",
        "Poonhill Trek from Pokhara - 4 Days",
        "Mardi Himal Trek from Pokhara - 4 Days",
        "Poonhill Sunrise Trek - 5 Days",
        "ABC Trek from Pokhara - 5 Days",
        "Everest View Trek - 8 Days",
        "Gosaikunda Trek - 8 Days",
      ],
    },
  ],
  [
    {
      title: "Moderate Treks",
      items: [
        "Mardi Himal Trek - 9 Days",
        "Ghorepani Poon Hill Trek - 9 Days",
        "Langtang Valley Trek - 9 Days",
        "Khopra Ridge Trek - 12 Days",
        "Annapurna Base Camp Trek - 12 Days",
      ],
    },
    {
      title: "Luxury & Heli",
      items: [
        "EBC Luxury Trek - 15 Days",
        "EBC Helicopter Return Trek - 12 Days",
        "Annapurna Lodge Trek - 11 Days",
      ],
    },
  ],
  [
    {
      title: "Challenging",
      items: [
        "Annapurna Circuit Trek - 13 Days",
        "Manaslu Circuit Trek - 14 Days",
        "Nar Phu Valley Trek - 15 Days",
        "Upper Mustang Trek - 16 Days",
        "Everest Three Pass Trek - 18 Days",
      ],
    },
    {
      title: "Camping & Expedition",
      items: [
        "Limi Valley Camping Trek - 17 Days",
        "Upper Dolpo Trek - 24 Days",
      ],
    },
  ],
];

const regionColumns = [
  [
    {
      title: "Everest Region",
      items: [
        "Everest Base Camp Trek - 14 Days",
        "Gokyo Chola Pass & EBC Trek - 16 Days",
        "EBC Helicopter Return Trek - 12 Days",
        "Gokyo Valley Trek - 14 Days",
        "Everest Three Pass Trek - 18 Days",
        "EBC Trek By Road - 16 Days",
        "Everest View Trek - 8 Days",
        "EBC Luxury Trek - 15 Days",
        "EBC Trek from Jiri - 21 Days",
        "Manirimdu Festival & EBC Trek - 16 Days",
        "Pikey Peak Trek - 9 Days",
      ],
    },
  ],
  [
    {
      title: "Annapurna Region",
      items: [
        "Mardi Himal Trek - 9 Days",
        "Ghorepani Poon Hill Trek - 9 Days",
        "Annapurna Base Camp Trek - 12 Days",
        "Annapurna Circuit Trek - 13 Days",
        "Khopra Ridge Trek - 12 Days",
        "Annapurna Circuit with Tilicho Lake Trek - 17 Days",
        "ABC Short Trek - 9 Days",
        "ABC Trek from Pokhara - 5 Days",
        "ABC Yoga Trek - 12 Days",
        "Annapurna Luxury Lodge Trek - 11 Days",
        "Nar Phu Valley Trek - 15 Days",
      ],
    },
  ],
  [
    {
      title: "Manaslu Region",
      items: [
        "Manaslu Circuit Trek - 14 Days",
        "Manaslu Tsum Valley Trek - 19 Days",
        "Tsum Valley Trek - 16 Days",
      ],
    },
    {
      title: "Langtang Region",
      items: [
        "Langtang Valley Trek - 9 Days",
        "Langtang Circuit Trek - 14 Days",
        "Gosaikunda Trek - 8 Days",
      ],
    },
  ],
  [
    {
      title: "Mustang Region",
      items: [
        "Upper Mustang Trek - 16 Days",
        "Upper Mustang Jeep Tour - 12 Days",
      ],
    },
  ],
];

const tourPackages = [
  {
    title: "Adventure Tours",
    items: [
      "Rafting & Bungee",
      "Mountain Biking",
      "Rock Climbing",
      "Paragliding Pokhara",
    ],
  },
  {
    title: "Cultural Tours",
    items: [
      "Kathmandu Heritage Tour",
      "Lumbini Pilgrimage",
      "Chitwan Jungle Safari",
      "Bhutan Tour Package",
    ],
  },
];

const travelGuides = [
  {
    title: "Destination Guides",
    items: [
      "Kathmandu Valley Guide",
      "Pokhara Travel Tips",
      "Everest Region Guide",
      "Annapurna Guide",
    ],
  },
  {
    title: "Practical Info",
    items: [
      "Nepal Visa & Entry",
      "Best Time to Trek",
      "Trekking Permits",
      "Altitude Sickness Tips",
    ],
  },
];

const company = [
  {
    title: "About Us",
    items: ["Our Story", "Our Team", "Why Choose Us", "Responsible Tourism"],
  },
  {
    title: "Connect",
    items: ["Testimonials", "Gallery", "Awards & Recognition", "Careers"],
  },
];

const NAV_ITEMS = [
  { label: "Nepal Trekking", hasMega: true, isTrekking: true },
  { label: "Tour Packages", hasMega: true, simple: tourPackages },
  { label: "Travel Guides", hasMega: true, simple: travelGuides },
  { label: "Company", hasMega: true, simple: company },
  { label: "Contact Us", hasMega: false },
  { label: "Blog", hasMega: false },
];

/* ─────────────────────────────────────────────────────────────
   MOUNTAIN ILLUSTRATION
───────────────────────────────────────────────────────────── */
function MountainIllustration() {
  return (
    <svg
      width="100%"
      height="80"
      viewBox="0 0 220 80"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <defs>
        <linearGradient id="mgsky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="mgm1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#2d5f8a" />
        </linearGradient>
        <linearGradient id="mgm2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2d5f8a" />
          <stop offset="100%" stopColor="#3d7ab0" />
        </linearGradient>
        <linearGradient id="mgsnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="#e0f0ff" />
        </linearGradient>
      </defs>
      <rect width="220" height="80" fill="url(#mgsky)" />
      <polygon points="30,80 80,20 130,80" fill="url(#mgm2)" opacity="0.6" />
      <polygon points="90,80 150,10 210,80" fill="url(#mgm1)" />
      <polygon points="0,80 40,30 80,80" fill="url(#mgm2)" opacity="0.7" />
      <polygon points="150,10 140,30 160,30" fill="url(#mgsnow)" />
      <polygon points="80,20 72,36 88,36" fill="url(#mgsnow)" opacity="0.7" />
      <circle cx="185" cy="18" r="8" fill="#fbbf24" opacity="0.85" />
      <rect x="0" y="72" width="220" height="8" fill="#1b4d2e" opacity="0.4" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   FEATURED TREK CARD
───────────────────────────────────────────────────────────── */

function FeaturedTrekCard() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4">
      {/* Image */}
      <img
        src={EverestImage}
        alt="Everest Base Camp Trek"
        className="w-full h-24 object-cover"
      />

      <div className="p-3">
        <div className="flex items-center gap-0.5 mb-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} size={10} fill="#f08b24" color="#f08b24" />
          ))}
          <span className="text-[10.5px] text-slate-500 ml-1">4.9 (312)</span>
        </div>

        <p className="text-[12.5px] font-bold text-[#0d2d4e] leading-snug mb-1.5">
          Everest Base Camp Trek
        </p>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock size={11} className="text-slate-400" />
            14 Days
          </span>

          <span className="text-[12px] font-bold text-[#1b75ba]">
            From $1,290
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TREK COLUMN
───────────────────────────────────────────────────────────── */
function TrekColumn({ groups }) {
  return (
    <div className="flex flex-col gap-5">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="text-sm font-bold tracking-wide uppercase text-[#1b75ba] mb-1 pb-1.5 border-slate-100">
            {g.title}
          </p>
          <ul className="space-y-0.5 list-none m-0 p-0">
            {g.items.map((item) => (
              <li
                key={item}
                className="text-sm text-slate-700 hover:text-[#1b75ba] font-medium cursor-pointer leading-5 transition-colors py-0.5"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIMPLE DROPDOWN
───────────────────────────────────────────────────────────── */
function SimpleDropdown({ groups }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] z-50 bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 w-[480px] grid grid-cols-2 gap-6 animate-fadeDown">
      {groups.map((g) => (
        <div key={g.title}>
          <p className="text-[10.5px] font-bold tracking-widest uppercase text-[#1b75ba] mb-2.5 pb-1.5 border-b border-blue-50">
            {g.title}
          </p>
          <ul className="space-y-1.5 list-none m-0 p-0">
            {g.items.map((item) => (
              <li
                key={item}
                className="text-[13.5px] text-slate-600 hover:text-[#1b75ba] cursor-pointer transition-colors leading-snug"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NEPAL TREKKING MEGA MENU
   KEY FIX: Rendered INSIDE the <header ref={navRef}> so that
   any click inside it is considered "inside" by the mousedown
   outside-click handler. Uses fixed positioning + left:50vw
   for true viewport centering.
───────────────────────────────────────────────────────────── */
function NepalTrekkingMega({ tab, setTab }) {
  const activeColumns =
    tab === "experience" ? experienceColumns : regionColumns;

  return (
    <div
      className="fixed z-[9999] animate-fadeDownMega"
      style={{
        top: 102,
        left: "50vw",
        transform: "translateX(-50%)",
        width: "min(1272px, calc(100vw - 48px))",
      }}
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex h-[520px]">
        {/* ── Left sidebar ── */}
        <div className="w-[210px] shrink-0 flex flex-col py-6 px-4 bg-slate-50 border-r border-slate-200">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-3">
            Browse treks
          </p>

          {[
            { key: "experience", label: "By Experience" },
            { key: "region", label: "By Region" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={[
                "text-left rounded-lg px-3 py-2.5 text-[13px] mb-2 transition-all duration-150 cursor-pointer",
                tab === key
                  ? "bg-blue-50 border border-[#1b75ba] text-[#1b75ba] font-bold"
                  : "bg-[#e8f1f8] border border-[#bbd6ea] text-slate-700 font-bold hover:text-slate-700",
              ].join(" ")}
            >
              {label}
            </button>
          ))}

          {/* Featured trek */}
          <div className="mt-12">
            <p className="text-xs font-bold tracking-wide uppercase text-slate-700 mb-2.5">
              Featured Trek
            </p>
            <FeaturedTrekCard />
          </div>

          {/* CTA */}
          <div className="mt-auto pt-3.5 border-t border-slate-200">
            <p className="text-sm text-slate-700 mb-2">Need help choosing?</p>
            <button className="w-full rounded-lg py-2.5 text-[13px] font-semibold text-white border-none bg-[#f08b24] cursor-pointer hover:opacity-90 transition-opacity">
              Talk to an Expert
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col px-6 py-5 overflow-hidden">
          <div className="flex items-center justify-between mb-3.5 shrink-0">
            <p className="text-base font-bold text-[#0d2d4e]">
              {tab === "experience"
                ? "Find your perfect trek"
                : "Explore by destination"}
            </p>
            <span className="text-[12px] text-slate-700">
              {tab === "experience"
                ? "Filtered by difficulty & style"
                : "Filtered by geographic region"}
            </span>
          </div>

          <div className="flex-1 overflow-y-auto border-t border-slate-100 pt-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <div className="grid grid-cols-4">
              {activeColumns.map((colGroups, i) => (
                <div
                  key={`${tab}-${i}`}
                  className={[
                    i > 0 ? "pl-2 border-slate-100" : "",
                    i < 3 ? "pr-2" : "",
                  ].join(" ")}
                >
                  <TrekColumn groups={colGroups} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────────────────────────── */
export default function ShikharNavbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [trekkingTab, setTrekkingTab] = useState("experience");
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      // Only close if the click is truly outside the entire header
      // (which now contains the mega menu portal anchor too)
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (label) =>
    setOpenMenu((prev) => (prev === label ? null : label));

  return (
    <>
      {/* ── Sticky header — navRef wraps EVERYTHING including mega menu ── */}
      <header
        ref={navRef}
        className="sticky top-0 z-50 bg-white border-b border-slate-200"
      >
        {/* Main bar */}
        <div className="max-w-[1272px] mx-auto px-4 h-[102px] flex items-center">
          {/* Logo */}

          <div className="w-36 mr-4">
            <img src={Logo} alt="" />
          </div>

          {/* Nav items */}
          <nav className="flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative">
                <button
                  onClick={() => item.hasMega && toggle(item.label)}
                  className={[
                    "flex items-center gap-1.5 px-2 py-2 text-base border-none outline-none bg-transparent whitespace-nowrap transition-colors duration-150",
                    item.hasMega ? "cursor-pointer" : "cursor-default",
                    openMenu === item.label
                      ? "text-[#1b75ba] font-bold"
                      : "text-slate-700 font-bold hover:text-[#0d2d4e]",
                  ].join(" ")}
                >
                  {item.label}
                  {item.hasMega && (
                    <ChevronDown
                      size={14}
                      strokeWidth={3}
                      className={`shrink-0 mt-1 text-[#1b75ba] transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {openMenu === item.label && item.simple && (
                  <SimpleDropdown groups={item.simple} />
                )}
              </div>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className={[
                "w-9 h-9 rounded-[9px] flex items-center justify-center cursor-pointer shrink-0 transition-all duration-150",
                searchOpen
                  ? "border-[#1b75ba]  text-[#1b75ba]"
                  : "border-slate-200  text-slate-500 hover:border-[#1b75ba] hover:bg-blue-50 hover:text-[#1b75ba]",
              ].join(" ")}
            >
              <Search size={17} />
            </button>

            {/* Avatar */}
            <button className="w-[50px] h-[50px] rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:border-[#1b75ba] transition-colors bg-gradient-to-br from-[#1b75ba] to-[#0d2d4e] overflow-hidden">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* WhatsApp */}
            <div className="flex items-center gap-2 shrink-0">
              <div>
                <p className="text-base font-bold text-gray-700 leading-tight m-0">
                  +977 9841876123
                </p>
                <p className="text-sm font-semibold text-gray-700 m-0">
                  WhatsApp 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-slate-100 bg-white px-8 py-2.5 animate-fadeDown">
            <div className="max-w-lg mx-auto relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex">
                <Search size={15} />
              </span>
              <input
                autoFocus
                type="text"
                placeholder="Search treks, destinations, guides..."
                className="w-full pl-9 pr-4 py-2.5 border-[1.5px] border-[#1b75ba] rounded-[10px] text-[14px] text-[#0d2d4e] placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-100 transition font-[inherit]"
              />
            </div>
          </div>
        )}

        {/* ── Mega menu rendered INSIDE navRef so clicks inside it
               are never treated as "outside" clicks ── */}
        {openMenu === "Nepal Trekking" && (
          <NepalTrekkingMega tab={trekkingTab} setTab={setTrekkingTab} />
        )}
      </header>

      <style>{`
        @keyframes fadeDownMega {
          from { opacity: 0; transform: translateX(-50%) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeDownMega { animation: fadeDownMega 0.2s ease forwards; }
        .animate-fadeDown     { animation: fadeDown 0.2s ease forwards; }

        .scrollbar-thin::-webkit-scrollbar       { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </>
  );
}
