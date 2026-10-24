/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Globe, ArrowRight, Phone, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyConfig';

interface AnnouncementBarProps {
  onOpenRfq: () => void;
  onSelectCountry?: () => void;
  currentCountryName?: string;
  currentFlag?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  onOpenRfq,
  onSelectCountry,
  currentCountryName = 'United States',
  currentFlag = '🇺🇸',
}) => {
  return (
    <div className="bg-[#070A12] border-b border-white/5 text-slate-300 text-xs py-2 px-4 sm:px-6 relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Global Export Transit Status */}
        <div className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-slate-400 uppercase tracking-wider">FCL Sea Port Dispatch Active</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="hidden sm:inline text-slate-400">Loading Port: {COMPANY_INFO.exportPortOfLoading}</span>
        </div>

        {/* Right: Country Destination Selector & Fast Quote CTA */}
        <div className="flex items-center gap-3 text-xs">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSelectCountry}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/10 hover:border-[#D4AF37]/50 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Switch Destination Export Market"
          >
            <span>{currentFlag}</span>
            <span className="font-medium text-[11px]">{currentCountryName}</span>
            <span className="text-slate-500 text-[10px]">▼</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenRfq}
            className="text-[11px] font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Direct Manufacturer RFQ</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
