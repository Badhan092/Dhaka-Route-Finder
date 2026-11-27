import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Search,
  GitCompare,
  Bookmark,
  ArrowRight,
  MapPinned,
  Layers,
  Banknote,
} from "lucide-react";

const STEPS = [
  {
    no: "০১",
    icon: Search,
    title: "আপনার রুট খুঁজুন",
    text: "আপনি কোথা থেকে কোথায় যেতে চান তা লিখুন। আমরা ঢাকার বাস নেটওয়ার্ক থেকে মিলিয়ে সঠিক বাস বের করব।",
    cta: { label: "রুট খুঁজুন", href: "#trip-planner" },
    tone: {
      card: "bg-emerald-50 border-emerald-200",
      icon: "bg-emerald-600 text-white",
      chip: "bg-emerald-100 text-emerald-800",
      glow: "bg-emerald-300/40",
    },
    chips: ["মিরপুর ১০", "মতিঝিল", "সরাসরি বাস"],
  },
  {
    no: "০২",
    icon: GitCompare,
    title: "বিকল্পগুলো তুলনা করুন",
    text: "বাস সার্ভিস, স্টপ ও রুট পাশাপাশি দেখুন। আপনার যাত্রার জন্য সবচেয়ে সুবিধাজনক বিকল্পটি বেছে নিন।",
    cta: { label: "সব বাস দেখুন", href: "#all-buses" },
    tone: {
      card: "bg-sky-50 border-sky-200",
      icon: "bg-sky-600 text-white",
      chip: "bg-sky-100 text-sky-800",
      glow: "bg-sky-300/40",
    },
    chips: ["সেমি-সিটিং", "এসি", "সাধারণ"],
  },
  {
    no: "০৩",
    icon: MapPinned,
    title: "হাব স্টপ থেকে শুরু করুন",
    text: "পল্টন, শাহবাগ, মিরপুর ১০, ফার্মগেটের মতো প্রধান ইন্টারচেঞ্জে কোন কোন বাস থামে তা এক নজরে দেখুন।",
    cta: { label: "হাব দেখুন", href: "#hubs" },
    tone: {
      card: "bg-amber-50 border-amber-200",
      icon: "bg-amber-500 text-white",
      chip: "bg-amber-100 text-amber-800",
      glow: "bg-amber-300/40",
    },
    chips: ["পল্টন", "শাহবাগ", "ফার্মগেট", "এয়ারপোর্ট"],
  },
  {
    no: "০৪",
    icon: Layers,
    title: "সার্ভিস ধরন অনুযায়ী বেছে নিন",
    text: "সেমি-সিটিং, সাধারণ, এসি, লোকাল বা সার্কুলার, পছন্দ অনুযায়ী ফিল্টার করে আপনার মতো বাস খুঁজে নিন।",
    cta: { label: "সার্ভিস দেখুন", href: "#service-types" },
    tone: {
      card: "bg-rose-50 border-rose-200",
      icon: "bg-rose-500 text-white",
      chip: "bg-rose-100 text-rose-800",
      glow: "bg-rose-300/40",
    },
    chips: ["এসি সার্ভিস", "লোকাল", "সার্কুলার"],
  },
  {
    no: "০৫",
    icon: Banknote,
    title: "আনুমানিক ভাড়া জানুন",
    text: "প্রতিটি বাসে বিআরটিএ নির্ধারিত আনুমানিক ভাড়া দেখুন, যাতে যাত্রার আগেই খরচের ধারণা পান।",
    cta: { label: "ভাড়া দেখুন", href: "#all-buses" },
    tone: {
      card: "bg-teal-50 border-teal-200",
      icon: "bg-teal-600 text-white",
      chip: "bg-teal-100 text-teal-800",
      glow: "bg-teal-300/40",
    },
    chips: ["৳১০ – ৳৪৫", "BRTA রেট", "স্বচ্ছ ভাড়া"],
  },
  {
    no: "০৬",
    icon: Bookmark,
    title: "সংরক্ষণ করুন এবং ভ্রমণ করুন",
    text: "পছন্দের বাস সংরক্ষণ করুন, যাতে পরের বার দ্রুত খুঁজে পান এবং নিশ্চিন্তে যাত্রা করতে পারেন।",
    cta: { label: "সংরক্ষিত বাস", href: "/saved" },
    tone: {
      card: "bg-violet-50 border-violet-200",
      icon: "bg-violet-600 text-white",
      chip: "bg-violet-100 text-violet-800",
      glow: "bg-violet-300/40",
    },
    chips: ["Save", "দ্রুত অ্যাক্সেস", "ফ্রি"],
  },
];

const STICKY_TOP = 96;
const STACK_GAP = 16; 


const StickyStackedCards = ({ steps = STEPS }) => {

  const wrapRefs = useRef([]);
  const innerRefs = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const n = wrapRefs.current.length;

      for (let i = 0; i < n - 1; i++) {
        const next = wrapRefs.current[i + 1];
        const inner = innerRefs.current[i];
        if (!next || !inner) continue;

        const stickyLine = STICKY_TOP + (i + 1) * STACK_GAP;
        const nextTop = next.getBoundingClientRect().top;
        const height = inner.offsetHeight || 1;

        // 0 → next card far away, 1 → next card fully covering this one
        const progress = Math.min(1, Math.max(0, 1 - (nextTop - stickyLine) / height));

        inner.style.transform = `scale(${1 - progress * 0.06})`;
        inner.style.filter = `brightness(${1 - progress * 0.06})`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          সহজ ও সুবিধাজনক
        </span>
        <h2 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          আপনার যাত্রা, <span className="text-emerald-600">সহজীকৃত</span>
        </h2>
        <p className="mt-3 text-slate-600">
          ঢাকায় সঠিক বাস খুঁজে বের করা জটিল হতে হবে না।
        </p>
      </header>

      <div className="relative">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <div
              key={step.no}
              ref={(el) => (wrapRefs.current[i] = el)}
              className="sticky mb-6 last:mb-0"
              style={{ top: STICKY_TOP + i * STACK_GAP, zIndex: i + 1 }}
            >
              <article
                ref={(el) => (innerRefs.current[i] = el)}
                className={`relative origin-top overflow-hidden rounded-3xl border p-6 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.18)] will-change-transform sm:p-10 ${step.tone.card}`}
              >
                {/* decorative glow */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl ${step.tone.glow}`}
                />

                {/* big number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-4 select-none text-7xl font-black text-slate-900/5 sm:text-9xl"
                >
                  {step.no}
                </span>

                <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg sm:h-20 sm:w-20 ${step.tone.icon}`}
                  >
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10" strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      ধাপ {step.no}
                    </p>
                    <h3 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                      {step.text}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {step.chips.map((c) => (
                        <span
                          key={c}
                          className={`rounded-full px-3 py-1 text-xs font-medium ${step.tone.chip}`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={step.cta.href}
                      className="group mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                    >
                      {step.cta.label}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {/* spacer so the last card can finish its stick before the next section */}
      <div className="h-8" />
    </section>
  );
};

export default StickyStackedCards;