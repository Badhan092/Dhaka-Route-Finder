import { Bus, MapPin, Compass } from "lucide-react";

function BrtcBusIllustration({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="340 160 650 470"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMaxYMax meet"
    >
        <defs>
          <pattern id="brtc-dots" width="3" height="3" patternUnits="userSpaceOnUse">
    
            <circle cx="0.75" cy="0.75" r="0.55" fill="#ffffff" opacity="0.12"/>
            <circle cx="2.25" cy="2.25" r="0.6" fill="#b0187a" opacity="0.14"/>
          </pattern>
          <linearGradient id="brtc-front" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="#f77dd0"/>
            <stop offset="0.6" stopColor="#f26ac4"/>
            <stop offset="1" stopColor="#e556b4"/>
          </linearGradient>
          <linearGradient id="brtc-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f673cc"/>
            <stop offset="0.55" stopColor="#f066c4"/>
            <stop offset="1" stopColor="#e05bb0"/>
          </linearGradient>
          <linearGradient id="brtc-roof" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff8fdb"/>
            <stop offset="1" stopColor="#f770cb"/>
          </linearGradient>
          <linearGradient id="brtc-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d6ecfa"/>
            <stop offset="0.5" stopColor="#a9cbe6"/>
            <stop offset="1" stopColor="#7fa6cc"/>
          </linearGradient>
          <linearGradient id="brtc-win" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a63b0"/>
            <stop offset="0.35" stopColor="#26356f"/>
            <stop offset="1" stopColor="#16204a"/>
          </linearGradient>
          <linearGradient id="brtc-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f4f5f7"/>
            <stop offset="0.5" stopColor="#b7bbc3"/>
            <stop offset="1" stopColor="#7d8189"/>
          </linearGradient>
          <linearGradient id="brtc-chrome" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#eceef1"/>
            <stop offset="1" stopColor="#9fa3aa"/>
          </linearGradient>
          <radialGradient id="brtc-shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#000" stopOpacity="0.6"/>
            <stop offset="0.6" stopColor="#000" stopOpacity="0.25"/>
            <stop offset="1" stopColor="#000" stopOpacity="0"/>
          </radialGradient>
        </defs>

        <g id="brtc-bus">
          <ellipse cx="670" cy="598" rx="345" ry="24" fill="url(#brtc-shadow)"/>
          <ellipse cx="450" cy="582" rx="95" ry="10" fill="url(#brtc-shadow)"/>

  
          <ellipse cx="846" cy="572" rx="17" ry="16" fill="#111113"/>

  
          <polygon points="577,190 966,328 976,528 962,548 905,568 830,572 722,582 668,604 595,598 505,590 580,470" fill="url(#brtc-side)"/>
  
          <polygon points="575,505 976,512 976,528 962,548 905,568 830,572 722,582 668,604 595,598 505,590 580,520" fill="#d94fa8" opacity="0.35"/>

  
          <polygon points="388,224 396,209 572,168 580,172 966,312 968,330 578,192 392,228" fill="url(#brtc-roof)"/>
          <polygon points="396,209 572,168 580,172 578,178 400,218" fill="#ffb0e8" opacity="0.7"/>

  
          <polygon points="390,225 577,190 582,470 505,592 362,548 360,540 366,372" fill="url(#brtc-front)"/>
          <polygon points="390,225 577,190 582,470 505,592 362,548 360,540 366,372" fill="url(#brtc-dots)"/>
          <polygon points="577,190 966,328 976,528 962,548 905,568 830,572 722,582 668,604 595,598 505,590 580,470" fill="url(#brtc-dots)"/>

  
          <polygon points="577,190 590,194 592,470 582,470" fill="#e65cb9"/>

  
          <polygon points="398,228 461,214 461,293 398,299" fill="#c4d0e8" stroke="#2e2f3a" strokeWidth="3.5"/>
          <polygon points="402,232 457,219 457,258 402,267" fill="#9fb2db"/>
          <polygon points="402,267 457,258 457,289 402,295" fill="#2f3f78"/>
          <polygon points="470,208 552,196 552,276 470,286" fill="#c4d0e8" stroke="#2e2f3a" strokeWidth="3.5"/>
          <polygon points="474,212 548,201 548,238 474,248" fill="#8ea6d8"/>
          <polygon points="474,248 548,238 548,272 474,282" fill="#2a3a74"/>

  
          <polygon points="590,205 962,335 965,378 590,282" fill="url(#brtc-win)"/>
          <polygon points="590,205 962,335 962,344 590,218" fill="#5b78c8" opacity="0.55"/>
          <g stroke="#f06cc4" strokeWidth="5"><line x1="635" y1="220.8" x2="635" y2="293.5"/><line x1="680" y1="236.5" x2="680" y2="305.0"/><line x1="725" y1="252.2" x2="725" y2="316.6"/><line x1="772" y1="268.7" x2="772" y2="328.6"/><line x1="815" y1="283.8" x2="815" y2="339.6"/><line x1="855" y1="297.8" x2="855" y2="349.8"/><line x1="892" y1="310.7" x2="892" y2="359.3"/><line x1="925" y1="322.2" x2="925" y2="367.8"/><line x1="948" y1="330.3" x2="948" y2="373.6"/></g>
          <polygon points="590,205 962,335 965,378 590,282" fill="none" stroke="#e45bb7" strokeWidth="2.5"/>

  
          <polygon points="578,280 968,376 968,391 578,297" fill="#f2514c"/>
          <polygon points="578,299 968,393 968,408 578,318" fill="#2f8c60"/>
          <polygon points="578,299 968,393 968,397 578,303" fill="#1f6d49"/>

  
          <polygon points="428,296 506,290 506,322 428,330" fill="#fde9f5" stroke="#e09acc" strokeWidth="1.5"/>
          <g stroke="#c8609f" strokeWidth="1.6">
            <line x1="434" y1="304" x2="500" y2="300"/>
            <line x1="434" y1="311" x2="494" y2="308"/>
            <line x1="434" y1="318" x2="486" y2="315"/>
          </g>

  
          <text x="741" y="357" fontFamily="Arial Black, Arial, Helvetica, sans-serif" fontWeight="900" fontSize="35" fill="#ffffff" transform="rotate(13 741 357)" textLength="70" lengthAdjust="spacingAndGlyphs">BRTC</text>

  
          <polygon points="902,372 946,380 946,394 902,388" fill="#f58ad4" stroke="#fbb0e3" strokeWidth="1.5"/>

  
          <polygon points="575,352 601,356 601,467 575,471" fill="#1b2756" stroke="#2e2f3a" strokeWidth="3"/>
          <polygon points="578,356 598,359 598,380 578,377" fill="#4a63b0" opacity="0.6"/>
          <polygon points="606,361 638,365 638,440 606,440" fill="#1b2756" stroke="#2e2f3a" strokeWidth="3"/>
          <polygon points="609,366 635,369 635,388 609,386" fill="#4a63b0" opacity="0.6"/>
          <polygon points="651,374 677,376 677,459 651,459" fill="#1b2756" stroke="#2e2f3a" strokeWidth="3"/>
          <rect x="606" y="444" width="16" height="20" fill="#2a2a33" stroke="#777" strokeWidth="1.5"/>

  
          <polygon points="678,390 712,392 712,577 678,574" fill="#c7bfd3" stroke="#2e2f3a" strokeWidth="2.5"/>
          <polygon points="682,396 693,397 693,566 682,564" fill="#6e6a86"/>
          <polygon points="697,397 709,398 709,567 697,568" fill="#6e6a86"/>
          <line x1="695" y1="395" x2="695" y2="572" stroke="#2e2f3a" strokeWidth="2.5"/>
          <polygon points="684,402 691,402 691,440 684,440" fill="#9aa3c8" opacity="0.7"/>
          <polygon points="699,403 707,404 707,442 699,442" fill="#9aa3c8" opacity="0.7"/>

  
          <polygon points="717,396 950,428 950,476 717,466" fill="url(#brtc-win)"/>
          <polygon points="717,396 950,428 950,438 717,408" fill="#5b78c8" opacity="0.5"/>
          <g stroke="#f06cc4" strokeWidth="5">
            <line x1="760" y1="402" x2="760" y2="468"/>
            <line x1="805" y1="408" x2="805" y2="469"/>
            <line x1="850" y1="414" x2="850" y2="471"/>
            <line x1="893" y1="420" x2="893" y2="473"/>
            <line x1="918" y1="424" x2="918" y2="474"/>
          </g>
          <polygon points="717,396 950,428 950,476 717,466" fill="none" stroke="#2e2f3a" strokeWidth="2"/>

  
          <polygon points="575,466 974,477 974,489 575,481" fill="#f2514c"/>
          <polygon points="575,489 678,491 678,505 575,503" fill="#2f8c60"/>
          <polygon points="716,491 976,497 976,511 716,505" fill="#2f8c60"/>

  
          <rect x="957" y="494" width="12" height="32" fill="#c24a9a" stroke="#fbb0e3" strokeWidth="1"/>
          <g stroke="#7a2a63" strokeWidth="1">
            <line x1="958" y1="500" x2="968" y2="500"/>
            <line x1="958" y1="506" x2="968" y2="506"/>
            <line x1="958" y1="512" x2="968" y2="512"/>
            <line x1="958" y1="518" x2="968" y2="518"/>
          </g>

  
          <path d="M586,600 C582,540 600,506 634,506 C670,506 686,545 680,604 Z" fill="#241a2b"/>
          <path d="M588,600 C584,545 602,512 634,512" fill="none" stroke="#f77dd0" strokeWidth="3"/>
          <path d="M852,574 C850,520 862,502 880,502 C898,502 912,522 908,568 Z" fill="#241a2b"/>

  
  
            <ellipse cx="880" cy="546" rx="25" ry="40" fill="#151517"/>
            <ellipse cx="880" cy="546" rx="21" ry="35" fill="none" stroke="#2b2b30" strokeWidth="2"/>
            <ellipse cx="880" cy="546" rx="16" ry="29" fill="none" stroke="#222226" strokeWidth="1.5"/>
            <ellipse cx="883" cy="546" rx="17" ry="28" fill="#40424a"/>
            <ellipse cx="883" cy="546" rx="14" ry="25" fill="url(#brtc-rim)" stroke="#5a5d63" strokeWidth="1.5"/>
            <ellipse cx="883" cy="546" rx="10.9" ry="19.5" fill="#a9adb5" stroke="#6b6e75" strokeWidth="1"/>
            <ellipse cx="891.7" cy="546.0" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="889.1" cy="557.0" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="883.0" cy="561.5" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="876.9" cy="557.0" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="874.3" cy="546.0" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="876.9" cy="535.0" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="883.0" cy="530.5" rx="1.4" ry="2.0" fill="#3b3d42"/><ellipse cx="889.1" cy="535.0" rx="1.4" ry="2.0" fill="#3b3d42"/>
            <ellipse cx="883" cy="546" rx="7.0" ry="12.5" fill="#c9ccd2" stroke="#4d4f55" strokeWidth="1.2"/>
            <ellipse cx="888.2" cy="549.8" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="885.1" cy="555.2" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="880.9" cy="555.2" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="877.8" cy="549.8" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="877.8" cy="542.2" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="880.9" cy="536.8" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="885.1" cy="536.8" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="888.2" cy="542.2" rx="1.3" ry="1.9" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/>
            <ellipse cx="883" cy="546" rx="3.4" ry="6.0" fill="#e7e9ed" stroke="#4d4f55" strokeWidth="1.2"/>
            <ellipse cx="883" cy="546" rx="1.4" ry="2.5" fill="#6c6f76"/>
    

  
          <polygon points="373,356 546,342 564,462 372,468" fill="url(#brtc-glass)" stroke="#26262c" strokeWidth="4"/>
          <polygon points="376,360 456,353 458,462 376,466" fill="#bcd8ee" opacity="0.55"/>
          <polygon points="380,430 456,425 458,462 376,466" fill="#5d86b8" opacity="0.55"/>
          <polygon points="466,425 556,418 562,458 468,462" fill="#5a82b4" opacity="0.5"/>
          <polygon points="392,352 420,350 396,466 376,466" fill="#ffffff" opacity="0.25"/>
          <line x1="458" y1="349" x2="462" y2="465" stroke="#26262c" strokeWidth="5"/>
          <g stroke="#0e0e10" strokeWidth="3" strokeLinecap="round">
            <line x1="402" y1="466" x2="448" y2="384"/>
            <line x1="440" y1="466" x2="447" y2="384"/>
            <line x1="470" y1="466" x2="498" y2="394"/>
            <line x1="504" y1="460" x2="498" y2="394"/>
          </g>

  
          <rect x="537" y="352" width="27" height="58" rx="7" fill="#f89a4a" stroke="#6a3a20" strokeWidth="2"/>
          <rect x="541" y="356" width="19" height="30" rx="4" fill="#ffc48e" opacity="0.8"/>
          <line x1="550" y1="410" x2="552" y2="424" stroke="#222" strokeWidth="3"/>
          <rect x="357" y="371" width="19" height="52" rx="6" fill="#f58aa6" stroke="#6a3a20" strokeWidth="2"/>
          <rect x="360" y="400" width="13" height="20" rx="4" fill="#f8923c"/>

  
          <polygon points="372,468 566,462 572,490 505,592 362,548 360,540" fill="#ee62be" opacity="0.55"/>
          <polygon points="362,538 500,584 505,592 362,548" fill="#ff8be0" opacity="0.7"/>

  
          <rect x="413" y="467" width="72" height="11" rx="2" fill="#262629" stroke="#8a8a90" strokeWidth="1"/>
          <text x="449" y="475.8" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="8" fill="#e9e9ec">ASHOK LEYLAND</text>

  
          <rect x="406" y="485" width="90" height="54" rx="4" fill="#1f1f22" stroke="#9a9ca2" strokeWidth="2.5"/>
          <g stroke="#c9cbd0" strokeWidth="1.6">
            <line x1="410" y1="494" x2="492" y2="494"/>
            <line x1="410" y1="502" x2="492" y2="502"/>
            <line x1="410" y1="510" x2="492" y2="510"/>
            <line x1="410" y1="518" x2="492" y2="518"/>
            <line x1="410" y1="526" x2="492" y2="526"/>
            <line x1="410" y1="533" x2="492" y2="533"/>
          </g>
          <rect x="412" y="489" width="78" height="46" fill="none" stroke="#6a6c72" strokeWidth="1"/>
          <circle cx="450" cy="508" r="8" fill="#d8dadf" stroke="#333" strokeWidth="2"/>
          <circle cx="450" cy="508" r="3.5" fill="#44464c"/>

  
          <rect x="367" y="511" width="37" height="28" rx="4" fill="#161618"/>
          <circle cx="378" cy="525" r="6.5" fill="#f1f4f7" stroke="#777" strokeWidth="1"/>
          <circle cx="394" cy="525" r="6.5" fill="#f1f4f7" stroke="#777" strokeWidth="1"/>
          <rect x="497" y="516" width="46" height="34" rx="4" fill="#161618"/>
          <circle cx="510" cy="533" r="7.5" fill="#f1f4f7" stroke="#777" strokeWidth="1"/>
          <circle cx="531" cy="533" r="7.5" fill="#f1f4f7" stroke="#777" strokeWidth="1"/>
          <rect x="546" y="520" width="16" height="28" rx="3" fill="#f8923c" stroke="#7a3d10" strokeWidth="1.5"/>

  
          <rect x="427" y="549" width="36" height="26" rx="2" fill="#62d38a" stroke="#2a8a50" strokeWidth="2"/>

  
  
            <ellipse cx="632" cy="566" rx="37" ry="52" fill="#151517"/>
            <ellipse cx="632" cy="566" rx="33" ry="47" fill="none" stroke="#2b2b30" strokeWidth="2"/>
            <ellipse cx="632" cy="566" rx="28" ry="41" fill="none" stroke="#222226" strokeWidth="1.5"/>
            <ellipse cx="637" cy="566" rx="27" ry="39" fill="#40424a"/>
            <ellipse cx="637" cy="566" rx="24" ry="36" fill="url(#brtc-rim)" stroke="#5a5d63" strokeWidth="1.5"/>
            <ellipse cx="637" cy="566" rx="18.7" ry="28.1" fill="#a9adb5" stroke="#6b6e75" strokeWidth="1"/>
            <ellipse cx="651.9" cy="566.0" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="647.5" cy="581.8" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="637.0" cy="588.3" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="626.5" cy="581.8" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="622.1" cy="566.0" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="626.5" cy="550.2" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="637.0" cy="543.7" rx="2.4" ry="3.4" fill="#3b3d42"/><ellipse cx="647.5" cy="550.2" rx="2.4" ry="3.4" fill="#3b3d42"/>
            <ellipse cx="637" cy="566" rx="12.0" ry="18.0" fill="#c9ccd2" stroke="#4d4f55" strokeWidth="1.2"/>
            <ellipse cx="645.9" cy="571.5" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="640.7" cy="579.3" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="633.3" cy="579.3" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="628.1" cy="571.5" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="628.1" cy="560.5" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="633.3" cy="552.7" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="640.7" cy="552.7" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/><ellipse cx="645.9" cy="560.5" rx="2.2" ry="3.2" fill="#d9dce1" stroke="#555" strokeWidth="0.8"/>
            <ellipse cx="637" cy="566" rx="5.8" ry="8.6" fill="#e7e9ed" stroke="#4d4f55" strokeWidth="1.2"/>
            <ellipse cx="637" cy="566" rx="2.4" ry="3.6" fill="#6c6f76"/>
    
  
          <path d="M584,552 C588,516 606,503 634,503 C664,503 680,520 684,552" fill="none" stroke="#f77dd0" strokeWidth="3" opacity="0.9"/>
        </g>
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

      {/* Decorative BRTC double-decker bus */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute -right-[8%] bottom-4 h-[230px] lg:h-[250px] aspect-[650/470] pointer-events-none select-none"
      >
        {/* Soft ground shadow */}
        <div className="absolute left-[4%] right-[0%] bottom-[1%] h-[9%] rounded-[50%] bg-black/35 blur-lg" />
        {/* Tight contact shadow under the wheels */}
        <div className="absolute left-[10%] right-[6%] bottom-[3%] h-[5%] rounded-[50%] bg-black/55 blur-[6px]" />
        <BrtcBusIllustration className="relative w-full h-full" />
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/10 border border-emerald-800/25 text-emerald-900 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          <span>ঢাকা সিটি ট্রানজিট • Dhaka Bus Directory</span>
        </div>

        {/* Hero Headings */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-emerald-950 leading-tight">
          Navigate <span className="text-emerald-700">Dhaka</span> with Ease
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl">
          From Mirpur to Motijheel, Uttara to Sadarghat—find reliable routes, counters, and stoppages across all local, semi-sitting, and AC services.
        </p>

        {/* Key Metrics / Highlights */}
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