/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COUNTRY_CONTACTS } from '../../data/companyConfig';
import { CountryContact } from '../../types';
import { X, Globe2, Check, ArrowRight } from 'lucide-react';

interface CountrySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCountryCode: string;
  onSelectCountry: (contact: CountryContact) => void;
}

export const CountrySelectorModal: React.FC<CountrySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCountryCode,
  onSelectCountry,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#0F1424] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 text-[#D4AF37]">
          <Globe2 className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-wider">
            Destination Routing Configuration
          </span>
        </div>

        <div>
          <h2 className="font-serif-luxury text-2xl text-white font-bold">
            Select Your Destination Market
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            We automatically route your WhatsApp and RFQ quotations to the designated regional export director with accurate port transit schedules.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {COUNTRY_CONTACTS.map((country) => {
            const isSelected = country.countryCode === selectedCountryCode;
            return (
              <button
                key={country.countryCode}
                onClick={() => {
                  onSelectCountry(country);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-xl text-left border transition-all flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-slate-900/40 border-white/5 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className="text-white text-xs font-semibold flex items-center gap-2">
                      <span>{country.countryName}</span>
                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] font-mono">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Rep: {country.salesRepresentative} · {country.recommendedPort}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-[#D4AF37] block">
                    {country.typicalTransitDays}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {country.displayPhone}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
