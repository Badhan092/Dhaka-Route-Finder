import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "dhaka-bus-finder-language";

const translations = {
  en: {

    // Header translations
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
  
    // Homepage translations
    "network_intelligence": "Network intelligence",
    "dhaka_at_a_glance": "Dhaka at a glance",
    "discover_numbers": "Discover the numbers behind Dhaka's connected bus network.",
    "dataset_overview": "Dataset overview",

    // TripPlanner translations
    "trip.title": "Plan your trip",
    "trip.description": "Find the right bus. Discover your route.",
    "trip.directRoutes": "Direct routes",
    "trip.findBuses": "Find buses",
    "trip.popularTrips": "Popular trips",


    // HowItWorks translations
    "simple_convenient": "Simple & convenient",
    "your_journey": "Your journey",
    "simplified": "simplified",
    "finding_right_bus": "Finding the right bus in Dhaka doesn't have to be complicated.",
    "three_easy_steps": "Three easy steps",
    "less_confusion": "Less confusion.",
    "more_confident_journeys": "More confident journeys.",
    "made_for_dhaka_commuters": "Made for Dhaka commuters",

    // HowItWorks steps
    "Search your route": "Search your route",
    "Enter where you're starting and where you want to go. We'll find matching stops from our Dhaka bus network.": "Enter where you're starting and where you want to go. We'll find matching stops from our Dhaka bus network.",
    "Find your starting point": "Find your starting point",
    
    "Compare your options": "Compare your options",
    "Explore buses serving both stops, check the stops along your journey, and discover convenient alternatives.": "Explore buses serving both stops, check the stops along your journey, and discover convenient alternatives.",
    "Choose the best bus": "Choose the best bus",
    
    "Save & travel": "Save & travel",
    "Open the complete bus route, check your journey details, and bookmark the routes you use regularly.": "Open the complete bus route, check your journey details, and bookmark the routes you use regularly.",
    "Your journey starts here": "Your journey starts here",


    // ServiceTypes translations
    "Semi-Sitting": "Semi-Sitting",
    "Regular": "Regular",
    "AC services": "AC services",
    "Local service": "Local service",
    "Circular": "Circular",
    "bus": "bus",
    "buses": "buses",
    "Explore": "Explore",
    "Browse by service type": "Browse by service type",
    "Bars compare each type with the largest one. A bus can list more than one type, so counts overlap.": "Bars compare each type with the largest one. A bus can list more than one type, so counts overlap.",


    // HubStops translations
    "Dhaka transit network": "Dhaka transit network",
    "Where the city connects.": "Where the city connects.",
    "Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city.": "Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city.",
    "Explore all routes": "Explore all routes",
    "Transit hub": "Transit hub",
    "Major bus interchange": "Major bus interchange",
    "Serving this location": "Serving this location",
    "Available services": "Available services",
    "Explore buses": "Explore buses",
    "bus": "bus",
    "buses": "buses", 
    "hubs.ariaLabel": "Explore {n} buses serving {name}",
    "hubs.more": "+{n} more",


  },
  bn: {

    // Header translations
    "Dhaka Bus Finder": "ঢাকা বাস ফাইন্ডার",
    "Home": "হোম",
    "Explore": "ঘুরে দেখুন",
    "Directory": "বাসের তালিকা",
    "Saved": "সংরক্ষিত",
    "Find a Bus": "বাস খুঁজুন",


    // HeroBanner translations
    "Dhaka City Transit • Dhaka Bus Directory": "ঢাকা সিটি ট্রানজিট • ঢাকা বাস ডিরেক্টরি",
    "hero.titleBefore": " ",
    "hero.titleHighlight": "ঢাকার পথ",
    "hero.titleAfter": "এখন হাতের মুঠোয়",
    "All DMP Corridors": "সকল ডিএমপি করিডোর",
    "Verified Stoppages": "যাচাইকৃত বাস স্টপেজ",
    "hero.description": "সঠিক বাস, কাছের কাউন্টার আর পথের প্রতিটি স্টপেজ খুঁজে নিন, লোকাল থেকে এসি, পুরো শহর জুড়ে।",
    "Showing": "দেখানো হচ্ছে",
    "buses": "বাস",


    // Homepage translations
    "network_intelligence": "নেটওয়ার্ক ইন্টেলিজেন্স",
    "dhaka_at_a_glance": "ঢাকা এক দৃষ্টিতে",
    "discover_numbers": "ঢাকার সংযুক্ত বাস নেটওয়ার্কের পিছনের সংখ্যা খুঁজুন।",
    "dataset_overview": "ডেটাসেট ওভারভিউ",


    // TripPlanner translations
    "trip.title": "আপনার যাত্রা পরিকল্পনা করুন",
    "trip.description": "সঠিক বাস খুঁজুন। আপনার রুট আবিষ্কার করুন।",
    "trip.directRoutes": "সরাসরি রুট",
    "trip.findBuses": "বাস খুঁজুন",
    "trip.popularTrips": "পপুলার যাত্রা",


    // HowItWorks translations
    "simple_convenient": "সহজ ও সুবিধাজনক",
    "your_journey": "আপনার যাত্রা",
    "simplified": "সহজীকৃত",
    "finding_right_bus": "ঢাকায় সঠিক বাস খুঁজে বের করা জটিল হতে হবে না।",
    "three_easy_steps": "তিনটি সহজ ধাপ",
    "less_confusion": "কম বিভ্রান্তি।",
    "more_confident_journeys": "আরও আত্মবিশ্বাসী যাত্রা।",
    "made_for_dhaka_commuters": "ঢাকা যাত্রীদের জন্য তৈরি",
    

    // HowItWorks steps
    "Search your route": "আপনার রুট খুঁজুন",
    "Enter where you're starting and where you want to go. We'll find matching stops from our Dhaka bus network.": "আপনি কোথা থেকে শুরু করছেন এবং কোথায় যেতে চান তা লিখুন। আমরা আমাদের ঢাকা বাস নেটওয়ার্ক থেকে মিলিত স্টপ খুঁজে বের করব।",
    "Find your starting point": "আপনার শুরু বিন্দু খুঁজুন",
    
    "Compare your options": "আপনার বিকল্পগুলি তুলনা করুন",
    "Explore buses serving both stops, check the stops along your journey, and discover convenient alternatives.": "উভয় স্টপে পরিবেশন করা বাসগুলি অন্বেষণ করুন, আপনার যাত্রার সাথে সাথে স্টপগুলি পরীক্ষা করুন এবং সুবিধাজনক বিকল্পগুলি আবিষ্কার করুন।",
    "Choose the best bus": "সেরা বাসটি বেছে নিন",
    
    "Save & travel": "সংরক্ষণ করুন এবং ভ্রমণ করুন",
    "Open the complete bus route, check your journey details, and bookmark the routes you use regularly.": "সম্পূর্ণ বাস রুটটি খুলুন, আপনার যাত্রার বিবরণ পরীক্ষা করুন এবং আপনি নিয়মিত যে রুটগুলি ব্যবহার করেন তা বুকমার্ক করুন।",
    "Your journey starts here": "আপনার যাত্রা এখান থেকে শুরু হয়",
    


    // ServiceTypes translations
    "Semi-Sitting": "সেমি-সিটিং",
    "Regular": "সাধারণ",
    "AC services": "এসি সার্ভিস",
    "Local service": "লোকাল সার্ভিস",
    "Circular": "সার্কুলার",
    "bus": "বাস",
    "buses": "বাস",
    "Explore": "ঘুরে দেখুন",
    "Browse by service type": "সার্ভিসের ধরন অনুযায়ী খুঁজুন",
    "Bars compare each type with the largest one. A bus can list more than one type, so counts overlap.": "বারগুলো প্রতিটি ধরনকে সবচেয়ে বড় ধরনের সঙ্গে তুলনা করে। একটি বাস একাধিক ধরনের হতে পারে, তাই সংখ্যাগুলো একে অপরের সঙ্গে মিলে যেতে পারে।",
  
    // HubStops translations
    "Dhaka transit network": "ঢাকার ট্রানজিট নেটওয়ার্ক",
    "Where the city connects.": "যেখানে শহর এক হয়।",
    "Explore Dhaka's busiest interchange points and discover the bus services connecting different parts of the city.": "ঢাকার সবচেয়ে ব্যস্ত ইন্টারচেঞ্জ পয়েন্টগুলো দেখুন এবং শহরের বিভিন্ন অংশকে যুক্ত করা বাস সার্ভিস খুঁজে নিন।",
    "Explore all routes": "সব রুট দেখুন",
    "Transit hub": "ট্রানজিট হাব",
    "Major bus interchange": "প্রধান বাস ইন্টারচেঞ্জ",
    "Serving this location": "এই স্থানে চলাচলকারী",
    "Available services": "উপলব্ধ সার্ভিস",
    "Explore buses": "বাস দেখুন",
    "bus": "বাস",
    "buses": "বাস",
    "hubs.ariaLabel": "{name} এ চলাচলকারী {n}টি বাস দেখুন",
    "hubs.more": "আরও {n}টি",
    
    // Bus stop translations

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

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "bn") setLanguage(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {}
    document.documentElement.lang = language === "bn" ? "bn" : "en";
  }, [language, ready]);

  // Translate rendered text and common accessibility/form attributes across every page,
  // including nested components that do not explicitly call t().
  useEffect(() => {
    if (!ready || typeof document === "undefined") return;
    const dictionary = translations[language] || {};
    const translateValue = (value) => {
      const trimmed = value.trim();
      if (!trimmed) return value;
      const translated = dictionary[trimmed];
      if (!translated) return value;
      return value.replace(trimmed, translated);
    };
    const translateNode = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const next = translateValue(node.nodeValue || "");
        if (next !== node.nodeValue) node.nodeValue = next;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const element = node;
      if (["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(element.tagName)) return;
      ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;
        const oldValue = element.getAttribute(attribute);
        const nextValue = translateValue(oldValue || "");
        if (nextValue !== oldValue) element.setAttribute(attribute, nextValue);
      });
      if (element.tagName === "OPTION") {
        const next = translateValue(element.textContent || "");
        if (next !== element.textContent) element.textContent = next;
      }
      Array.from(element.childNodes).forEach(translateNode);
    };
    const root = document.getElementById("__next") || document.body;
    translateNode(root);
    const observer = new MutationObserver((records) => {
      records.forEach((record) => {
        if (record.type === "characterData") translateNode(record.target);
        record.addedNodes?.forEach(translateNode);
        if (record.type === "attributes") translateNode(record.target);
      });
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["placeholder", "title", "aria-label", "alt"] });
    return () => observer.disconnect();
  }, [language, ready]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === "en" ? "bn" : "en"),
    t: (key) => translations[language]?.[key] || key,
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {

  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;

}
