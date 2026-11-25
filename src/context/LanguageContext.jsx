
import {  createContext, useContext, useEffect, useMemo, useRef, useState,} from "react";

const STORAGE_KEY = "dhaka-bus-finder-language";
const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = ["en", "bn"];

const translations = {

  en:{

    // Header translations:
    "Dhaka Bus Finder": "Dhaka Bus Finder",
    "Home": "Home",
    "Explore": "Explore",
    "Directory": "Directory",
    "Saved": "Saved",
    "Find a Bus": "Find a Bus",
    "hero.titleBefore": "Navigate",
    "hero.titleHighlight": "Dhaka",
    "hero.titleAfter": "with Ease",
    "hero.description": "From Mirpur to Motijheel, Uttara to Sadarghat, find reliable routes, counters, and stoppages across all local, semi-sitting, and AC services.",

    //Network:
    "network_intelligence": "Network intelligence",
    "dhaka_at_a_glance": "Dhaka at a glance",
    "discover_numbers": "Discover the numbers behind Dhaka's connected bus network.",
    "dataset_overview": "Dataset overview",

    // Trip Planner:
    "trip.title": "Plan your trip",
    "trip.description": "Find the right bus. Discover your route.",
    "trip.directRoutes": "Direct routes",
    "trip.findBuses": "Find buses",
    "trip.popularTrips": "Popular trips",

    //How It Works:
    "simple_convenient": "Simple & convenient",
    "your_journey": "Your journey",
    "simplified": "simplified",
    "finding_right_bus": "Finding the right bus in Dhaka doesn't have to be complicated.",
    "three_easy_steps": "Three easy steps",
    "less_confusion": "Less confusion.",
    "more_confident_journeys": "More confident journeys.",
    "made_for_dhaka_commuters": "Made for Dhaka commuters",

    // BusSearchForm
    "All buses": "All buses",
    "buses.browseAll": "Browse all {n} buses, A–Z.",
    "search.busPlaceholder": "e.g. Alif, Bikash, Achim...",
    "search.stopPlaceholder": "e.g. Farmgate, Mirpur 10...",

    // BusCard translations
    "busCard.stops": "{n} Stops",
    "busCard.via": "Via {stops}",
    "View Route": "View Route",
  },
  bn: {
    //Header:
    "Dhaka Bus Finder": "ঢাকা বাস ফাইন্ডার",
    "Home": "হোম",
    "Explore": "ঘুরে দেখুন",
    "Directory": "বাসের তালিকা",
    "Saved": "সংরক্ষিত",
    "Find a Bus": "বাস খুঁজুন",

    //Hero:
    "Dhaka City Transit • Dhaka Bus Directory":"ঢাকা সিটি ট্রানজিট • ঢাকা বাস ডিরেক্টরি",
    "hero.titleBefore": " ",
    "hero.titleHighlight": "ঢাকার পথ",
    "hero.titleAfter": "এখন হাতের মুঠোয়",
    "hero.description":"সঠিক বাস, কাছের কাউন্টার আর পথের প্রতিটি স্টপেজ খুঁজে নিন, লোকাল থেকে এসি, পুরো শহর জুড়ে।",
    "All DMP Corridors": "সকল ডিএমপি করিডোর",
    "Verified Stoppages": "যাচাইকৃত বাস স্টপেজ",
    "Showing": "দেখানো হচ্ছে",

    //Homepage:
    "network_intelligence": "নেটওয়ার্ক ইন্টেলিজেন্স",
    "dhaka_at_a_glance": "ঢাকা এক দৃষ্টিতে",
    "discover_numbers": "ঢাকার সংযুক্ত বাস নেটওয়ার্কের পিছনের সংখ্যা খুঁজুন।",
    "dataset_overview": "ডেটাসেট ওভারভিউ",

    //Stats Strip:
    "Bus routes": "বাস রুট",
    "Routes across Dhaka": "ঢাকার মধ্যে রুট",
    "Distinct stops": "ভিন্ন স্টপ",
    "Connected locations": "সংযুক্ত স্থান",
    "Service types": "সার্ভিসের ধরন",
    "Different bus categories": "বিভিন্ন বাসের ধরন",
    "Longest route": "সবচেয়ে দীর্ঘ রুট",
    "Stops on a single route": "একটি রুটে স্টপ",

    //Trip Planner:
    "trip.title": "আপনার যাত্রা পরিকল্পনা করুন",
    "trip.description": "সঠিক বাস খুঁজুন। আপনার রুট আবিষ্কার করুন।",
    "trip.directRoutes": "সরাসরি রুট",
    "trip.findBuses": "বাস খুঁজুন",
    "trip.popularTrips": "পপুলার যাত্রা",

    //How It Works:
    "simple_convenient": "সহজ ও সুবিধাজনক",
    "Your journey": "আপনার যাত্রা",
    "simplified": "সহজীকৃত",
    "finding_right_bus": "ঢাকায় সঠিক বাস খুঁজে বের করা জটিল হতে হবে না।",
    "three_easy_steps": "তিনটি সহজ ধাপ",
    "less_confusion": "কম বিভ্রান্তি।",
    "more_confident_journeys": "আরও আত্মবিশ্বাসী যাত্রা।",
    "made_for_dhaka_commuters": "ঢাকা যাত্রীদের জন্য তৈরি",

    //How It Works steps:

    //step 1
    "Search your route": "আপনার রুট খুঁজুন",
    "Enter where you're starting and where you want to go. We'll find matching stops from our Dhaka bus network.":"আপনি কোথা থেকে শুরু করছেন এবং কোথায় যেতে চান তা লিখুন। আমরা আমাদের ঢাকা বাস নেটওয়ার্ক থেকে মিলিত স্টপ খুঁজে বের করব।",
    "Find your starting point": "আপনার শুরু বিন্দু খুঁজুন",
    
    //step 2
    "Compare your options": "আপনার বিকল্পগুলি তুলনা করুন",
    "Explore buses serving both stops, check the stops along your journey, and discover convenient alternatives.":"উভয় স্টপে পরিবেশন করা বাসগুলি অন্বেষণ করুন, আপনার যাত্রার সাথে সাথে স্টপগুলি পরীক্ষা করুন এবং সুবিধাজনক বিকল্পগুলি আবিষ্কার করুন।",
    "Choose the best bus": "সেরা বাসটি বেছে নিন",
    
    //step 3
    "Save & travel": "সংরক্ষণ করুন এবং ভ্রমণ করুন",
    "Open the complete bus route, check your journey details, and bookmark the routes you use regularly.":"সম্পূর্ণ বাস রুটটি খুলুন, আপনার যাত্রার বিবরণ পরীক্ষা করুন এবং আপনি নিয়মিত যে রুটগুলি ব্যবহার করেন তা বুকমার্ক করুন।",
    "Your journey starts here": "আপনার যাত্রা এখান থেকে শুরু হয়",

    //Service Types:
    "Semi-Sitting": "সেমি-সিটিং",
    "Regular": "সাধারণ",
    "AC services": "এসি সার্ভিস",
    "Local service": "লোকাল সার্ভিস",
    "Circular": "সার্কুলার",
    "bus": "বাস",
    "buses": "বাস",
    "Browse by service type": "সার্ভিসের ধরন অনুযায়ী খুঁজুন",
    "Bars compare each type with the largest one. A bus can list more than one type, so counts overlap.": "বারগুলো প্রতিটি ধরনকে সবচেয়ে বড় ধরনের সঙ্গে তুলনা করে। একটি বাস একাধিক ধরনের হতে পারে, তাই সংখ্যাগুলো একে অপরের সঙ্গে মিলে যেতে পারে।",

    //Hub Stops:
    "Dhaka transit network": "ঢাকার ট্রানজিট নেটওয়ার্ক",
    "Where the city connects.": "যেখানে শহর এক হয়।",
    "Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city.":"ঢাকার সবচেয়ে ব্যস্ত ইন্টারচেঞ্জ পয়েন্টগুলো দেখুন এবং শহরের বিভিন্ন অংশকে যুক্ত করা বাস সার্ভিস খুঁজে নিন।",
    "Explore all routes": "সব রুট দেখুন",
    "Transit hub": "ট্রানজিট হাব",
    "Major bus interchange": "প্রধান বাস ইন্টারচেঞ্জ",
    "Serving this location": "এই স্থানে চলাচলকারী",
    "Available services": "উপলব্ধ সার্ভিস",
    "Explore buses": "বাস দেখুন",
    "hubs.ariaLabel": "{name} এ চলাচলকারী {n}টি বাস দেখুন",
    "hubs.more": "আরও {n}টি",

    //Bus Search Form:
    "All buses": "সব বাস",
    "buses.browseAll": "সব বাস দেখুন, বর্ণানুক্রমে।",
    "Search Bus Name": "বাসের নাম খুঁজুন",
    "Serves Area / Stop": "এলাকা / স্টপেজ",
    "Service Type": "সার্ভিসের ধরন",
    "All service types": "সব ধরনের সার্ভিস",
    "search.busPlaceholder": "যেমন: আলিফ, বিকাশ, আছিম...",
    "search.stopPlaceholder": "যেমন: ফার্মগেট, মিরপুর ১০...",
    "Filter": "ফিল্টার",
    "Clear": "মুছে ফেলুন",

    //Bus Card:
    "busCard.stops": "{n}টি স্টপ",
    "busCard.via": "{stops} হয়ে",
    "View Route": "রুট দেখুন",

    //Pagination:
    "Previous": "আগের",
    "Next": "পরের",
    "Page {currentPage} of {totalPages}": "{totalPages} পৃষ্ঠার মধ্যে {currentPage}",
    "Bus directory pagination": "বাসের তালিকার পৃষ্ঠা নেভিগেশন",

    //Bus Route:
    "Route": "রুট",
    "Stops": "স্টপ",
    "Stop": "স্টপ",
    "Counter": "কাউন্টার",
    "Stoppage": "স্টপেজ",
    "Stoppages": "স্টপেজ",
    "Route map": "রুট মানচিত্র",
    "Route map of {bus}": "{bus} এর রুট মানচিত্র",

    //Bus Stops:
    "Bus stop": "বাস স্টপ",
    "Bus stops": "বাস স্টপ",

    //Counters:
    "Counters": "কাউন্টার",

    //Stoppages:
    "Bus stoppage": "বাস স্টপেজ",

    //Faq:
    "FAQ": "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    "Good to know": "জানা ভালো",
    "What the data does and doesn’t cover.": "ডেটা কি কভার করে এবং কি কভার করে না।",
    "Does each bus run in both directions?": "প্রতিটি বাস কি উভয় দিকে চলে?",
    "The route data lists every bus with a two-way arrow and has no one-way information, so routes are treated as running both ways. Check locally if a service is one-way.": "রুট ডেটা প্রতিটি বাসকে দুই-দিকের তীর দিয়ে তালিকাভুক্ত করে এবং এক-দিকের তথ্য নেই, তাই রুটগুলোকে উভয় দিকেই চলাচলকারী হিসেবে বিবেচনা করা হয়। একটি সার্ভিস এক-দিকের কিনা তা স্থানীয়ভাবে পরীক্ষা করুন।",
    "How reliable are the fares?": "ভাড়া কতটা নির্ভরযোগ্য?",
    "The route spreadsheet has no fares. Any fare shown is approximate and unverified, so confirm with the conductor.": "রুট স্প্রেডশীটে কোনো ভাড়া নেই। প্রদর্শিত যেকোনো ভাড়া আনুমানিক এবং যাচাই করা হয়নি, তাই কনডাক্টরের সঙ্গে নিশ্চিত করুন।",
    "What does “direct” mean?": "“সরাসরি” মানে কি?",
    "A direct result is a single bus that lists both of your stops. Journeys that need a change of bus are shown separately, with the transfer stop.": "একটি সরাসরি ফলাফল হল একটি একক বাস যা উভয় স্টপকে তালিকাভুক্ত করে। যাত্রাগুলো যা বাস পরিবর্তনের প্রয়োজন তা আলাদাভাবে দেখানো হয়, ট্রান্সফার স্টপ সহ।",
    "Are schedules and travel times included?": "সূচি এবং ভ্রমণের সময় অন্তর্ভুক্ত আছে কি?",
    "No. The data has stop sequences only, so there are no timetables, operating hours or travel-time estimates.": "না। ডেটাতে শুধুমাত্র স্টপ ক্রম রয়েছে, তাই কোনো সময়সূচি, কার্যকরী সময় বা ভ্রমণের সময়ের অনুমান নেই।",
    "Why can’t I find my stop?": "কেন আমি আমার স্টপ খুঁজে পাচ্ছি না?",
    "Only stops that appear in the route data can be searched. Try a nearby or better-known stop, or check the spelling.": "শুধুমাত্র সেই স্টপগুলো খুঁজে পাওয়া যায় যা রুট ডেটাতে উপস্থিত। কাছাকাছি বা আরও পরিচিত স্টপ চেষ্টা করুন, অথবা বানান পরীক্ষা করুন।",

    //CTA Band:
    "Saved routes": "সংরক্ষিত রুট",
    "Ride the same routes every day?": "প্রতিদিন একই রুটে যাতায়াত করেন?",
    "Save your regular trips and open them again in one tap.": "আপনার নিয়মিত ট্রিপগুলো সংরক্ষণ করুন এবং এক ট্যাপেই আবার খুলুন।",
    "No account needed": "অ্যাকাউন্টের প্রয়োজন নেই",
    "Saved in this browser": "এই ব্রাউজারে সংরক্ষিত",
    "Open a trip in one tap": "এক ট্যাপেই ট্রিপ খুলুন",
    "Open saved routes": "সংরক্ষিত রুট খুলুন",
    "Browse all buses": "সব বাস দেখুন",


    // Dhaka Locations:
    "Azimpur": "আজিমপুর",
    "Airport": "এয়ারপোর্ট",
    
    "Banani": "বনানী",

    "Dhanmondi": "ধানমন্ডি",
    "Dhanmondi 1": "ধানমন্ডি ১",
    "Dhanmondi 2": "ধানমন্ডি ২",
    "Dhanmondi 3": "ধানমন্ডি ৩",
    "Dhanmondi 4": "ধানমন্ডি ৪",
    "Dhanmondi 5": "ধানমন্ডি ৫",
    "Dhanmondi 6": "ধানমন্ডি ৬",
    "Dhanmondi 7": "ধানমন্ডি ৭",
    "Dhanmondi 8": "ধানমন্ডি ৮",
    "Dhanmondi 9": "ধানমন্ডি ৯",

    "Farmgate": "ফার্মগেট",
    
    "Gabtoli": "গাবতলী",
    "Gulshan": "গুলশান",
    "Gulshan 1": "গুলশান ১",
    "Gulshan 2": "গুলশান ২",
    "Gulshan 3": "গুলশান ৩",
    "Gulshan 4": "গুলশান ৪",
    "Gulshan 5": "গুলশান ৫",
    "Gulshan 6": "গুলশান ৬",
    "Gulshan 7": "গুলশান ৭",
    "Gulshan 8": "গুলশান ৮",
    "Gulshan 9": "গুলশান ৯",
    "Gulistan": "গুলিস্তান",

    "Jatrabari": "যাত্রাবাড়ী",
    
    "Khilkhet": "খিলক্ষেত",
    "Khilgaon": "খিলগাঁও",
    "Kawran Bazar": "কাওরান বাজার",
    "kalshi": "কালশী",
    "Kakoli": "কাকলী",
    "Kuril Bishwa Road": "কুড়িল বিশ্ব রোড",

    "Mohakhali": "মহাখালী",
    "Mohammadpur": "মোহাম্মদপুর",
    
    "Mirpur 10": "মিরপুর ১০",
    "Mirpur 11": "মিরপুর ১১",
    "Mirpur 12": "মিরপুর ১২",
    "Mirpur 13": "মিরপুর ১৩",
    "Mirpur 14": "মিরপুর ১৪",
    "Mirpur 15": "মিরপুর ১৫",
    "Mirpur 1": "মিরপুর ১",
    "Mirpur 2": "মিরপুর ২",
    "Mirpur 3": "মিরপুর ৩",
    "Mirpur 4": "মিরপুর ৪",
    "Mirpur 5": "মিরপুর ৫",
    "Mirpur 6": "মিরপুর ৬",
    "Mirpur 7": "মিরপুর ৭",
    "Mirpur 8": "মিরপুর ৮",
    "Mirpur 9": "মিরপুর ৯",

    "Motijheel": "মতিঝিল",
    
    "Pallabi": "পল্লবী",
    "Paltan": "পল্টন",
    
    "Rampura": "রামপুরা",

    "Shyamoli": "শ্যামলী",
    "Shahbag": "শাহবাগ",
    "Sadarghat": "সদরঘাট",
    "Savar": "সাভার",
    "Shantinagar": "শান্তিনগর",

    "Tejgaon": "তেজগাঁও",
    "Uttara": "উত্তরা",
  },
};

// --------------------------------------------------
// Translation utilities
// --------------------------------------------------

const isSupportedLanguage = (language) =>
  SUPPORTED_LANGUAGES.includes(language);

const getStoredLanguage = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;

  try {
    const savedLanguage = window.localStorage.getItem(STORAGE_KEY);

    return isSupportedLanguage(savedLanguage)
      ? savedLanguage
      : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
};

const interpolate = (text, params) => {
  if (!params) return text;

  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key] ?? match;
  });
};

const translateText = (value, dictionary) => {
  if (!value || !value.trim()) return value;

  const trimmedValue = value.trim();
  const translatedValue = dictionary[trimmedValue];

  if (!translatedValue) return value;

  const start = value.indexOf(trimmedValue);

  return (
    value.slice(0, start) +
    translatedValue +
    value.slice(start + trimmedValue.length)
  );
};

// --------------------------------------------------
// DOM translation utilities
// --------------------------------------------------

const SKIPPED_TAGS = new Set([
  "SCRIPT",
  "STYLE",
  "NOSCRIPT",
  "TEXTAREA",
]);

const TRANSLATABLE_ATTRIBUTES = [
  "placeholder",
  "title",
  "aria-label",
  "alt",
];

const translateDOM = (
  root,
  dictionary,
  textRecords,
  attributeRecords
) => {
  if (!root) return;

  const translateTextNode = (node) => {
    const currentValue = node.nodeValue || "";

    let record = textRecords.get(node);

    if (!record) {
      record = {
        original: currentValue,
        rendered: currentValue,
      };

      textRecords.set(node, record);
    } else if (currentValue !== record.rendered) {
      // React or another script updated the original text.
      record.original = currentValue;
    }

    const nextValue = translateText(
      record.original,
      dictionary
    );

    if (nextValue !== currentValue) {
      record.rendered = nextValue;
      node.nodeValue = nextValue;
    } else {
      record.rendered = currentValue;
    }
  };

  const translateAttributes = (element) => {
    let records = attributeRecords.get(element);

    if (!records) {
      records = new Map();
      attributeRecords.set(element, records);
    }

    TRANSLATABLE_ATTRIBUTES.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;

      const currentValue = element.getAttribute(attribute) || "";

      let record = records.get(attribute);

      if (!record) {
        record = {
          original: currentValue,
          rendered: currentValue,
        };

        records.set(attribute, record);
      } else if (currentValue !== record.rendered) {
        record.original = currentValue;
      }

      const nextValue = translateText(
        record.original,
        dictionary
      );

      if (nextValue !== currentValue) {
        record.rendered = nextValue;
        element.setAttribute(attribute, nextValue);
      } else {
        record.rendered = currentValue;
      }
    });
  };

  const translateNode = (node) => {
    if (!node) return;

    if (node.nodeType === Node.TEXT_NODE) {
      translateTextNode(node);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const element = node;

    if (SKIPPED_TAGS.has(element.tagName)) return;

    translateAttributes(element);

    Array.from(element.childNodes).forEach(translateNode);
  };

  translateNode(root);
};

// --------------------------------------------------
// Language Context
// --------------------------------------------------

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {

  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [ready, setReady] = useState(false);

  // Keep original DOM content between language changes.
  const textRecordsRef = useRef(new WeakMap());
  const attributeRecordsRef = useRef(new WeakMap());

  // Initialize saved language.
  useEffect(() => {
    setLanguage(getStoredLanguage());
    setReady(true);
  }, []);

  // Persist language and update document metadata.
  useEffect(() => {
    if (!ready || typeof window === "undefined") return;

    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Storage may be unavailable.
    }

    document.documentElement.lang = language;
  }, [language, ready]);

  // Automatically translate the entire application.
  useEffect(() => {

    if (!ready || typeof document === "undefined") return;

    const root = document.getElementById("__next") || document.body;
    const dictionary = translations[language] || {};
    const textRecords = textRecordsRef.current;
    const attributeRecords = attributeRecordsRef.current;

    // Translate existing content.
    translateDOM(
      root,
      dictionary,
      textRecords,
      attributeRecords
    );

    // Observe dynamically rendered React content.
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "characterData") {
          translateDOM(
            record.target,
            dictionary,
            textRecords,
            attributeRecords
          );

          return;
        }

        if (record.type === "attributes") {
          translateDOM(
            record.target,
            dictionary,
            textRecords,
            attributeRecords
          );

          return;
        }

        if (record.type === "childList") {
          record.addedNodes.forEach((node) => {
            translateDOM(
              node,
              dictionary,
              textRecords,
              attributeRecords
            );
          });
        }
      });
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATABLE_ATTRIBUTES,
    });

    return () => observer.disconnect();
  }, [language, ready]);

  // Translation function.
  const t = (key, params) => {

    const translatedValue = translations[language]?.[key] ?? key;
    return interpolate(translatedValue, params);
  
  };

  // Toggle between English and Bangla.
  const toggleLanguage = () => {
    setLanguage((currentLanguage) =>
      currentLanguage === "en" ? "bn" : "en"
    );
  };

  const value = useMemo(() => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      ready,
    }),
    [language, ready]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// --------------------------------------------------
// Custom Hook
// --------------------------------------------------

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      "useLanguage must be used inside LanguageProvider"
    );
  }

  return context;
}
