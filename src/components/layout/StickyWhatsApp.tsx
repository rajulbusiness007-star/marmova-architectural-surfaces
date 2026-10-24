/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, X, ArrowUpRight, Share2, Copy, Check } from 'lucide-react';
import { CountryContact } from '../../types';

interface StickyWhatsAppProps {
  currentContact: CountryContact;
  onOpenWhatsApp: () => void;
}

export const StickyWhatsApp: React.FC<StickyWhatsAppProps> = ({
  currentContact,
  onOpenWhatsApp,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    const textToCopy = currentContact.displayPhone || `+${currentContact.whatsappNumber}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const el = document.createElement('textarea');
      el.value = textToCopy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Interactive Tooltip Card on Hover/Touch */}
      {showTooltip && (
        <div className="glass-panel p-3.5 rounded-2xl max-w-xs text-xs text-slate-200 shadow-2xl border border-emerald-500/30 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentContact.flag} {currentContact.countryName} Desk</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-slate-300">
            Rep: <strong className="text-white">{currentContact.salesRepresentative}</strong>
          </p>
          <div className="mt-1 flex items-center justify-between text-[11px] bg-slate-900/80 px-2 py-1 rounded-md border border-white/5 font-mono text-slate-300">
            <span>{currentContact.displayPhone}</span>
            <button
              onClick={handleCopyNumber}
              className="text-[#D4AF37] hover:text-[#F3E5AB] flex items-center gap-1 text-[10px] uppercase font-bold transition-colors cursor-pointer"
              title="Copy phone number to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Avg response time: &lt; 5 mins for CIF quotes & packing specs.
          </p>
          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <button
              onClick={onOpenWhatsApp}
              className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <span>Chat Now</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              onClick={handleCopyNumber}
              className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-medium text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer"
              title="Copy number to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-[#D4AF37]" />
                  <span>Copy Number</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Floating Button with Motion Spring Physics */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpenWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative p-3.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/70 border border-emerald-400/40 flex items-center gap-2.5 transition-all duration-300 cursor-pointer"
        title={`Chat with ${currentContact.salesRepresentative} on WhatsApp`}
      >
        <div className="relative">
          <Share2 className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] border-2 border-[#090D16]" />
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-200 leading-none">
            {currentContact.flag} Export Sales
          </div>
          <div className="text-xs font-bold text-white leading-tight">
            WhatsApp Direct
          </div>
        </div>
      </motion.button>
    </div>
  );
};
