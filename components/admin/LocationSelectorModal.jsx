"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { Country, State, City } from "country-state-city";

function SearchList({ items, selected, onSelect, placeholder, labelKey = "name" }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter((item) => item[labelKey].toLowerCase().includes(q));
  }, [items, search, labelKey]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 border-b border-gray-200 dark:border-slate-700">
        <div className="relative">
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-gray-400 dark:text-slate-500 py-8">No results found</p>
        ) : (
          filtered.map((item) => {
            const isSelected = selected?.isoCode === item.isoCode || selected?.name === item.name;
            return (
              <button
                key={item.isoCode || item.name}
                type="button"
                onClick={() => onSelect(item)}
                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                  isSelected ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium" : "text-gray-700 dark:text-slate-300"
                }`}
              >
                <span className="truncate">{item.flag ? `${item.flag} ` : ""}{item[labelKey]}</span>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}

export default function LocationSelectorModal({ isOpen, onClose, onConfirm, initialValues }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [error, setError] = useState("");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : []),
    [selectedCountry]
  );
  const cities = useMemo(
    () =>
      selectedCountry && selectedState
        ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
        : [],
    [selectedCountry, selectedState]
  );

  useEffect(() => {
    if (isOpen && initialValues) {
      if (initialValues.countryCode) {
        const country = Country.getCountryByCode(initialValues.countryCode);
        if (country) setSelectedCountry(country);
      }
      if (initialValues.stateCode && initialValues.countryCode) {
        const state = State.getStateByCodeAndCountry(initialValues.stateCode, initialValues.countryCode);
        if (state) setSelectedState(state);
      }
      if (initialValues.city && initialValues.countryCode && initialValues.stateCode) {
        const citiesOfState = City.getCitiesOfState(initialValues.countryCode, initialValues.stateCode);
        const city = citiesOfState.find((c) => c.name === initialValues.city);
        if (city) setSelectedCity(city);
      }
    }
  }, [isOpen, initialValues]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setError("");
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
    setError("");
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setError("");
  };

  const handleConfirm = () => {
    if (!selectedCountry || !selectedState || !selectedCity) {
      setError("Please select Country, State, and City to continue.");
      return;
    }
    onConfirm({
      country: selectedCountry.name,
      countryCode: selectedCountry.isoCode,
      state: selectedState.name,
      stateCode: selectedState.isoCode,
      city: selectedCity.name,
    });
    onClose();
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-slate-700 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Select Location</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-slate-400">
              <span className={selectedCountry ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                {selectedCountry ? selectedCountry.name : "Country"}
              </span>
              <span>→</span>
              <span className={selectedState ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                {selectedState ? selectedState.name : "State"}
              </span>
              <span>→</span>
              <span className={selectedCity ? "text-blue-600 dark:text-blue-400 font-medium" : ""}>
                {selectedCity ? selectedCity.name : "City"}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 min-h-0 divide-x divide-gray-200 dark:divide-slate-700">
          <div className="w-1/3 flex flex-col min-h-0">
            <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">Country</p>
            </div>
            <div className="flex-1 min-h-0" style={{ height: 340 }}>
              <SearchList
                items={countries}
                selected={selectedCountry}
                onSelect={handleCountrySelect}
                placeholder="Search country..."
                labelKey="name"
              />
            </div>
          </div>

          <div className="w-1/3 flex flex-col min-h-0">
            <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">State</p>
            </div>
            <div className="flex-1 min-h-0" style={{ height: 340 }}>
              {selectedCountry ? (
                states.length > 0 ? (
                  <SearchList
                    items={states}
                    selected={selectedState}
                    onSelect={handleStateSelect}
                    placeholder="Search state..."
                    labelKey="name"
                  />
                ) : (
                  <p className="text-center text-sm text-gray-400 dark:text-slate-500 py-8 px-3">
                    No states available for this country
                  </p>
                )
              ) : (
                <p className="text-center text-sm text-gray-400 dark:text-slate-500 py-8 px-3">
                  Select a country first
                </p>
              )}
            </div>
          </div>

          <div className="w-1/3 flex flex-col min-h-0">
            <div className="px-3 py-2 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">City</p>
            </div>
            <div className="flex-1 min-h-0" style={{ height: 340 }}>
              {selectedState ? (
                cities.length > 0 ? (
                  <SearchList
                    items={cities}
                    selected={selectedCity}
                    onSelect={handleCitySelect}
                    placeholder="Search city..."
                    labelKey="name"
                  />
                ) : (
                  <p className="text-center text-sm text-gray-400 dark:text-slate-500 py-8 px-3">
                    No cities available for this state
                  </p>
                )
              ) : (
                <p className="text-center text-sm text-gray-400 dark:text-slate-500 py-8 px-3">
                  Select a state first
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-gray-200 dark:border-slate-700 shrink-0">
          <div className="flex-1">
            {error && (
              <p className="text-sm text-red-500 flex items-center gap-1.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            )}
            {selectedCountry && selectedState && selectedCity && (
              <p className="text-xs text-gray-500 dark:text-slate-400">
                Selected: <strong className="text-gray-800 dark:text-white">{selectedCity.name}, {selectedState.name}, {selectedCountry.name}</strong>
              </p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedCountry || !selectedState || !selectedCity}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
