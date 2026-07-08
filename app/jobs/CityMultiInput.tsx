"use client";

import { useState, useRef } from "react";

export function CityMultiInput({ defaultValue }: { defaultValue?: string }) {
  const [cities, setCities] = useState<string[]>(
    (defaultValue ?? "").split(",").map((c) => c.trim()).filter(Boolean)
  );
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addCity() {
    const value = text.trim();
    if (value && !cities.includes(value)) {
      setCities([...cities, value]);
    }
    setText("");
    inputRef.current?.focus();
  }

  function removeCity(city: string) {
    setCities(cities.filter((c) => c !== city));
  }

  return (
    <div className="border border-slate-200 rounded-lg px-2 py-1.5 focus-within:ring-2 focus-within:ring-brand-500">
      <input type="hidden" name="city" value={cities.join(",")} />
      <div className="flex flex-wrap items-center gap-1.5">
        {cities.map((city) => (
          <span key={city} className="inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-medium rounded-full pl-2.5 pr-1 py-1">
            {city}
            <button
              type="button"
              onClick={() => removeCity(city)}
              className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-brand-100"
              aria-label={`${city}を削除`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              addCity();
            } else if (e.key === "Backspace" && text === "" && cities.length > 0) {
              removeCity(cities[cities.length - 1]);
            }
          }}
          onBlur={addCity}
          placeholder={cities.length === 0 ? "市区町村を入力してEnter（複数可）" : "追加..."}
          className="flex-1 min-w-[8rem] text-sm py-1 focus:outline-none"
        />
      </div>
    </div>
  );
}
