import { Bus, MapPin, Compass } from "lucide-react";

function BrtcBusIllustration({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="60 1000 1680 1030"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      role="img"
      aria-label="BRTC pink bus"
    >
    <defs>
        <linearGradient id="brtcPink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ec3f9c"/>
          <stop offset="0.5" stopColor="#e0308d"/>
          <stop offset="1" stopColor="#c8227a"/>
        </linearGradient>
        <linearGradient id="brtcPinkFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ee45a2"/>
          <stop offset="1" stopColor="#d42a85"/>
        </linearGradient>
        <linearGradient id="brtcRoof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f25aac"/>
          <stop offset="1" stopColor="#e0308d"/>
        </linearGradient>
        <linearGradient id="brtcGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4a5659"/>
          <stop offset="0.5" stopColor="#2d3638"/>
          <stop offset="1" stopColor="#1c2325"/>
        </linearGradient>
        <linearGradient id="brtcWindshield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b7577"/>
          <stop offset="0.5" stopColor="#3a4446"/>
          <stop offset="1" stopColor="#1f2729"/>
        </linearGradient>
        <linearGradient id="brtcCurtain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c85a95"/>
          <stop offset="0.3" stopColor="#e58bbd"/>
          <stop offset="0.6" stopColor="#b4467f"/>
          <stop offset="1" stopColor="#e58bbd"/>
        </linearGradient>
        <radialGradient id="brtcHub" cx="0.4" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#d9dcde"/>
          <stop offset="1" stopColor="#6f7679"/>
        </radialGradient>
        <filter id="brtcBlur" x="-10%" y="-50%" width="120%" height="200%">
          <feGaussianBlur stdDeviation="14"/>
        </filter>
      </defs>
      <path d="M120,1760 L560,1930 L1060,2000 L1560,1985 L1600,1960 L1100,1990 L700,1900 Z" fill="#000" opacity="0.35" filter="url(#brtcBlur)"/>
      <path d="M82,1352 Q84,1338 108,1332 L1035,1112 L1085,1135 L1050,1975 L700,1885 L560,1850 Q380,1790 90,1672 Q80,1665 82,1640 Z" fill="url(#brtcPink)"/>
      <path d="M100,1336 L330,1262 L640,1165 L1030,1105 L1110,1065 L1190,1045 L1245,1060 L1235,1100 L1085,1135 L1035,1112 L108,1332 Z" fill="url(#brtcRoof)"/>
      <path d="M100,1336 L640,1165 L1035,1108" fill="none" stroke="#f97cbc" strokeWidth="3" opacity="0.7"/>
      <path d="M1130,1058 L1185,1030 L1200,1038 L1150,1068 Z" fill="#5b2a45"/>
      <ellipse cx="1180" cy="1098" rx="14" ry="14" fill="#2a2a2a"/>
      <path d="M90,1350 L135,1340 L135,1485 L96,1482 Z" fill="#14181a"/>
      <path d="M100,1362 L128,1356 L128,1478 L104,1476 Z" fill="#5c6568"/>
      <path d="M135,1345 L830,1165 L836,1172 L826,1505 L135,1487 Z" fill="#0f1416"/>
      <g fill="url(#brtcGlass)">
        <path d="M141,1347 L182,1336 L182,1479 L141,1478 Z"/>
        <path d="M190,1334 L237,1322 L237,1481 L190,1480 Z"/>
        <path d="M245,1320 L317,1302 L317,1483 L245,1482 Z"/>
        <path d="M325,1300 L432,1273 L432,1486 L325,1484 Z"/>
        <path d="M440,1271 L597,1232 L597,1491 L440,1488 Z"/>
        <path d="M605,1230 L826,1174 L820,1497 L605,1492 Z"/>
      </g>
      <path d="M141,1408 L826,1335" stroke="#0f1416" strokeWidth="9" fill="none"/>
      <g stroke="#d7a21b" strokeWidth="5" opacity="0.8">
        <line x1="250" y1="1325" x2="250" y2="1480"/>
        <line x1="435" y1="1285" x2="435" y2="1486"/>
        <line x1="602" y1="1240" x2="602" y2="1492"/>
      </g>
      <g fill="#0b1012" opacity="0.8">
        <ellipse cx="478" cy="1428" rx="18" ry="32"/>
        <ellipse cx="650" cy="1395" rx="22" ry="40"/>
        <ellipse cx="610" cy="1430" rx="20" ry="30"/>
      </g>
      <g fill="url(#brtcCurtain)">
        <path d="M214,1327 L236,1322 L236,1470 L214,1468 Z"/>
        <path d="M285,1308 L316,1301 L316,1472 L285,1470 Z"/>
        <path d="M395,1281 L431,1272 L431,1476 L395,1474 Z"/>
        <path d="M538,1244 L587,1232 L587,1480 L538,1477 Z"/>
        <path d="M772,1190 L822,1176 L818,1486 L765,1482 Z"/>
      </g>
      <g stroke="#a23a74" strokeWidth="2" opacity="0.7">
        <line x1="548" y1="1242" x2="548" y2="1478"/>
        <line x1="562" y1="1238" x2="562" y2="1479"/>
        <line x1="577" y1="1235" x2="577" y2="1479"/>
        <line x1="785" y1="1186" x2="783" y2="1484"/>
        <line x1="800" y1="1182" x2="798" y2="1485"/>
        <line x1="812" y1="1179" x2="810" y2="1486"/>
      </g>
      <path d="M135,1486 L826,1506" stroke="#0f1416" strokeWidth="6"/>
      <path d="M845,1160 L1085,1135 L1050,1975 L845,1700 Z" fill="url(#brtcPink)" opacity="0.0"/>
      <path d="M870,1165 L1050,1140 L1062,1190 L880,1215 Z" fill="#d52b86" stroke="#c0227a" strokeWidth="2"/>
      <path d="M845,1700 L845,1250" stroke="#b01e6c" strokeWidth="3"/>
      <path d="M1050,1250 L1050,1975" stroke="#b01e6c" strokeWidth="3"/>
      <path d="M860,1275 L1040,1240 L1046,1245 L1046,1545 L852,1535 Z" fill="#0f1416"/>
      <path d="M870,1285 L1035,1254 L1035,1535 L865,1527 Z" fill="url(#brtcGlass)"/>
      <path d="M893,1280 L945,1270 L955,1525 L905,1522 Z" fill="url(#brtcCurtain)"/>
      <path d="M1005,1390 L1030,1385 L1030,1535 L1005,1533 Z" fill="#2b3234" opacity="0.8"/>
      <rect x="845" y="1608" width="40" height="8" rx="4" fill="#111"/>
      <path d="M230,1700 L440,1768 L440,1850 L240,1790 Z" fill="none" stroke="#b01e6c" strokeWidth="3"/>
      <path d="M300,1740 L300,1815" stroke="#b01e6c" strokeWidth="3"/>
      <path d="M440,1768 L555,1810 L555,1880 L440,1840 Z" fill="none" stroke="#b01e6c" strokeWidth="3"/>
      <path d="M778,1865 L880,1895 L880,2050 L778,2020 Z" fill="#d5298a" stroke="#a81c68" strokeWidth="3" transform="translate(0,-130)"/>
      <rect x="815" y="1840" width="20" height="20" fill="#111" transform="translate(0,-10)"/>
      <path d="M85,1518 L305,1530 L305,1558 L85,1545 Z" fill="#d6202a"/>
      <path d="M85,1545 L305,1558 L305,1590 L85,1575 Z" fill="#0d7a4a"/>
      <path d="M440,1550 L845,1598 L1040,1625 L1040,1670 L845,1648 L440,1597 Z" fill="#e0202b"/>
      <path d="M440,1597 L845,1648 L1040,1670 L1040,1715 L845,1692 L440,1642 Z" fill="#0f7d4c"/>
      <g transform="translate(305,1620) skewY(4)">
        <text x="0" y="0" fontFamily="Arial Black, Arial, Helvetica, sans-serif" fontWeight="900" fontSize="130" fill="#f2f2f2" textLength="135" lengthAdjust="spacingAndGlyphs">BRTC</text>
      </g>
      <path d="M170,1620 Q200,1590 235,1620 L260,1710 Q240,1740 175,1730 Z" fill="#1a1d1e"/>
      <ellipse cx="203" cy="1680" rx="30" ry="72" fill="#0d0f10"/>
      <ellipse cx="200" cy="1675" rx="16" ry="48" fill="url(#brtcHub)"/>
      <path d="M580,1790 Q600,1690 690,1685 Q770,1700 775,1830 L770,1900 L585,1860 Z" fill="#181b1c"/>
      <ellipse cx="690" cy="1805" rx="82" ry="145" fill="#0c0e0f"/>
      <ellipse cx="683" cy="1790" rx="60" ry="120" fill="#1b1f21"/>
      <ellipse cx="662" cy="1775" rx="46" ry="94" fill="url(#brtcHub)"/>
      <ellipse cx="655" cy="1770" rx="34" ry="70" fill="none" stroke="#50585b" strokeWidth="3"/>
      <g fill="#c9cdcf" stroke="#4a5154" strokeWidth="2">
        <circle cx="640" cy="1735" r="8"/>
        <circle cx="665" cy="1730" r="8"/>
        <circle cx="684" cy="1760" r="8"/>
        <circle cx="660" cy="1800" r="8"/>
        <circle cx="635" cy="1805" r="8"/>
        <circle cx="628" cy="1770" r="8"/>
      </g>
      <ellipse cx="656" cy="1768" rx="14" ry="26" fill="#3b4144"/>
      <path d="M1085,1135 L1095,1112 Q1300,1055 1545,1140 L1578,1640 L1585,1900 Q1585,1955 1530,1965 L1050,1975 Z" fill="url(#brtcPinkFront)"/>
      <path d="M1100,1130 L1285,1085 L1548,1150 L1578,1625 L1100,1610 Z" fill="#0b0f10"/>
      <path d="M1115,1140 L1282,1100 L1535,1160 L1565,1610 L1112,1595 Z" fill="url(#brtcWindshield)"/>
      <g fill="#222a24" opacity="0.8">
        <ellipse cx="1420" cy="1250" rx="110" ry="60"/>
        <ellipse cx="1330" cy="1330" rx="70" ry="50"/>
        <ellipse cx="1490" cy="1330" rx="60" ry="45"/>
      </g>
      <path d="M1290,1105 L1530,1165 L1530,1215 L1285,1160 Z" fill="#a8b0b2" opacity="0.65"/>
      <path d="M1440,1300 L1500,1300 L1500,1450 L1440,1450 Z" fill="#6e7679" opacity="0.5"/>
      <path d="M1112,1500 L1300,1500 L1330,1560 L1112,1585 Z" fill="#1a2224"/>
      <ellipse cx="1220" cy="1540" rx="95" ry="30" fill="#2d363a"/>
      <path d="M1115,1448 L1250,1450 Q1275,1455 1290,1480 L1320,1525" fill="none" stroke="#e8c320" strokeWidth="9" strokeLinecap="round"/>
      <path d="M1250,1450 L1250,1500" stroke="#e8c320" strokeWidth="7"/>
      <path d="M1120,1155 L1135,1150 L1135,1400 L1120,1400 Z" fill="#20282a" opacity="0.7"/>
      <g stroke="#0a0a0a" strokeLinecap="round" fill="none">
        <path d="M1302,1638 L1418,1330" strokeWidth="10"/>
        <path d="M1385,1330 L1450,1330" strokeWidth="3"/>
        <path d="M1292,1630 L1410,1330" strokeWidth="4"/>
        <path d="M1532,1632 L1412,1335" strokeWidth="10"/>
        <path d="M1525,1625 L1405,1335" strokeWidth="4"/>
      </g>
      <path d="M1100,1610 L1578,1625 L1578,1720 L1255,1790 L1210,1700 Q1160,1690 1100,1680 Z" fill="#e3338f"/>
      <path d="M1210,1650 L1565,1640 L1545,1760 Q1400,1800 1260,1810 Z" fill="#e9449c"/>
      <path d="M1210,1650 Q1380,1655 1565,1640" stroke="#c0227a" strokeWidth="3" fill="none"/>
      <ellipse cx="1415" cy="1800" rx="22" ry="10" fill="none" stroke="#c0227a" strokeWidth="3"/>
      <circle cx="1187" cy="1715" r="20" fill="none" stroke="#b01e6c" strokeWidth="3"/>
      <g transform="translate(1358,1745) skewY(-1)">
        <text x="0" y="0" fontFamily="Arial Black, Arial, Helvetica, sans-serif" fontWeight="900" fontSize="68" fill="#f2f2f2" textLength="120" lengthAdjust="spacingAndGlyphs">BRTC</text>
      </g>
      <path d="M1050,1850 L1255,1835 Q1400,1870 1580,1830 L1585,1900 Q1585,1955 1530,1965 L1050,1975 Z" fill="#df2f8b"/>
      <path d="M1255,1835 Q1400,1870 1580,1830" stroke="#b01e6c" strokeWidth="3" fill="none"/>
      <path d="M1078,1765 Q1160,1775 1255,1795 L1250,1835 Q1170,1830 1118,1805 Q1085,1795 1078,1765 Z" fill="#0d0f10"/>
      <circle cx="1117" cy="1790" r="14" fill="#e08a1a"/>
      <circle cx="1165" cy="1810" r="20" fill="#e6eef0" stroke="#222" strokeWidth="3"/>
      <circle cx="1215" cy="1812" r="20" fill="#d8e2e5" stroke="#222" strokeWidth="3"/>
      <circle cx="1165" cy="1810" r="9" fill="#9fb0b5"/>
      <circle cx="1215" cy="1812" r="9" fill="#9fb0b5"/>
      <circle cx="1202" cy="1905" r="16" fill="#cdd5d7" stroke="#8a8f91" strokeWidth="3"/>
      <path d="M1538,1745 Q1565,1735 1580,1750 L1580,1795 Q1555,1800 1540,1790 Z" fill="#0d0f10"/>
      <circle cx="1552" cy="1775" r="9" fill="#e1e9eb"/>
      <circle cx="1569" cy="1768" r="9" fill="#e1e9eb"/>
      <rect x="1386" y="1845" width="70" height="60" rx="3" fill="#12a57a" stroke="#d9e6df" strokeWidth="3" transform="rotate(-3 1421 1875)"/>
      <text x="1421" y="1895" fontFamily="Arial, sans-serif" fontSize="22" textAnchor="middle" fill="#2c4f45" transform="rotate(-3 1421 1875)">88-২১১</text>
      <rect x="1396" y="1852" width="50" height="6" fill="#2c4f45" opacity="0.6" transform="rotate(-3 1421 1875)"/>
      <path d="M1035,1135 Q1060,1105 1130,1085 L1205,1075 L1240,1048 Q1290,1050 1305,1100 L1312,1285 L1230,1285 L1210,1140 L1165,1120 Q1090,1140 1060,1160 Z" fill="#e8409a" stroke="#b01e6c" strokeWidth="2"/>
      <path d="M1205,1100 Q1240,1085 1280,1105 L1312,1285 L1230,1290 Z" fill="#f05aa9"/>
      <path d="M1232,1285 L1312,1285 L1312,1312 L1232,1312 Z" fill="#e8861a"/>
      <path d="M1232,1295 L1312,1295" stroke="#f4b04a" strokeWidth="4"/>
      <path d="M1528,1245 Q1535,1205 1575,1200 L1680,1208 Q1715,1220 1715,1260 L1715,1380 Q1712,1405 1690,1405 L1640,1395 L1640,1255 L1580,1240 Z" fill="#e8409a" stroke="#b01e6c" strokeWidth="2"/>
      <path d="M1645,1250 L1712,1262 L1715,1380 L1650,1390 Z" fill="#f05aa9"/>
      <path d="M1672,1385 L1712,1385 L1710,1408 L1676,1406 Z" fill="#e8861a"/>
      <path d="M1528,1245 Q1580,1228 1640,1258" fill="none" stroke="#b01e6c" strokeWidth="3"/>

    </svg>
  );
}

export default function HeroBanner({ filteredCount, busesCount }) {
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#f8f3ea] via-[#f2ece3] to-emerald-50 text-emerald-950 p-6 sm:p-10 md:min-h-[320px] border border-emerald-900/15 mb-8">
      {/* Outline ring accent */}
      <div
        aria-hidden="true"
        className="absolute -right-28 -top-28 w-[440px] h-[440px] rounded-full border border-emerald-900/25 pointer-events-none"
      />

      {/* Soft green glow */}
      <div
        aria-hidden="true"
        className="absolute -left-16 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"
      />

      {/* Decorative BRTC bus (ground shadow is part of the SVG) */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-[5%] bottom-4 h-[230px] lg:h-[250px] aspect-[1680/1030] pointer-events-none select-none"
      >
        <BrtcBusIllustration className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/10 border border-emerald-800/25 text-emerald-900 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span>ঢাকা সিটি ট্রানজিট • Dhaka Bus Directory</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950 leading-tight">
          Navigate <span className="text-emerald-700">Dhaka</span> with Ease
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl">
          From Mirpur to Motijheel, Uttara to Sadarghat—find reliable routes, counters, and stoppages across all local, semi-sitting, and AC services.
        </p>

        <div className="flex flex-wrap items-center gap-3 mt-6 text-xs font-medium">
          <div className="flex items-center gap-2 bg-white/80 px-3.5 py-2 rounded-xl border border-emerald-900/15 text-emerald-900 shadow-sm">
            <Bus className="w-4 h-4 text-emerald-700" />
            <span>
              Showing <strong className="text-emerald-950 font-bold">{filteredCount}</strong> of {busesCount} buses
            </span>
          </div>

          <div className="flex items-center gap-2 bg-white/80 px-3.5 py-2 rounded-xl border border-emerald-900/15 text-slate-700 shadow-sm">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>All DMP Corridors</span>
          </div>

          <div className="flex items-center gap-2 bg-white/80 px-3.5 py-2 rounded-xl border border-emerald-900/15 text-slate-700 shadow-sm">
            <Compass className="w-4 h-4 text-amber-600" />
            <span>Verified Stoppages</span>
          </div>
        </div>
      </div>
    </div>
  );
}             