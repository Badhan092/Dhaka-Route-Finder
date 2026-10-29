"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, Trash2, ArrowRight } from "lucide-react";
import { getSaved, toggleSaved } from "@/lib/storage";

export default function SavedPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getSaved());
  }, []);

  const handleRemove = (item) => {
    toggleSaved(item);
    setItems(getSaved());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="w-6 h-6 text-emerald-600" />
          <h1 className="text-2xl font-extrabold text-slate-900">Saved Routes & Buses</h1>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"
              >
                <div>
                  <Link
                    href={item.href}
                    className="font-bold text-slate-900 hover:text-emerald-600 transition-colors block text-sm"
                  >
                    {item.label}
                  </Link>
                  <span className="text-xs text-slate-400">Bookmarked in this browser</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className="p-1.5 text-slate-500 hover:text-emerald-600"
                    title="Open"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleRemove(item)}
                    className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center shadow-sm">
            <p className="text-slate-700 font-semibold mb-1">Nothing saved yet</p>
            <p className="text-xs text-slate-500 mb-4">
              Click the "Save" button on any bus or route result to bookmark it here for quick
              access.
            </p>
            <Link
              href="/"
              className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
            >
              Search Buses
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
