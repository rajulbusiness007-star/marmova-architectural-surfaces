/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY_INFO } from '../../data/companyConfig';
import { NavigationTab } from './Navbar';
import {
  ShieldCheck,
  Globe2,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenRfq: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenRfq,
  onOpenPrivacy,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#050810] border-t border-white/10 text-slate-400 text-xs mt-24">
      {/* Certifications Banner */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-serif-luxury text-sm font-semibold text-white">
              International Manufacturing & Compliance Standards
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {COMPANY_INFO.certifications.map((cert, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-md bg-slate-900 border border-white/10 text-[11px] font-mono text-slate-300"
                title={cert.label}
              >
                {cert.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Links & Company Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column (2 cols on lg) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D15] p-0.5">
              <div className="w-full h-full bg-[#090D16] rounded-[6px] flex items-center justify-center">
                <span className="font-serif-luxury text-sm font-bold text-[#D4AF37]">M</span>
              </div>
            </div>
            <span className="font-serif-luxury text-lg font-bold text-white tracking-widest">
              MARMOVA
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            {COMPANY_INFO.legalName}. Global manufacturer, technological innovator, and sea-freight exporter of large-format vitrified porcelain slabs, sintered stone surfaces, and Mediterranean architectural monoliths.
          </p>

          <div className="space-y-1.5 text-xs text-slate-300 pt-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>Plant: {COMPANY_INFO.plantLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>Primary Sea Port of Loading: {COMPANY_INFO.exportPortOfLoading}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span>{COMPANY_INFO.contactEmail}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Architectural Products */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
            Tile Collections
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('catalogue')}
                className="hover:text-white transition-colors"
              >
                Porcelain Slabs (1200×600)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalogue')}
                className="hover:text-white transition-colors"
              >
                Monolithic 1200×1200 Slabs
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalogue')}
                className="hover:text-white transition-colors"
              >
                Marble & Onyx Reproductions
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalogue')}
                className="hover:text-white transition-colors"
              >
                20mm Heavy Outdoor Pavers (R11)
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('catalogue')}
                className="hover:text-white transition-colors"
              >
                Nordic Wood Grain Planks
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Interactive Engineering Tools */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
            Engineering Tools
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('visualizer')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <span>3D Room Visualizer</span>
                <span className="text-[9px] text-[#D4AF37] font-mono">WebGL</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('container-calc')}
                className="hover:text-white transition-colors"
              >
                20ft FCL Container Calculator
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('quantity-calc')}
                className="hover:text-white transition-colors"
              >
                Tile Quantity & Wastage Planner
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('export')}
                className="hover:text-white transition-colors"
              >
                Pallet & Strapping Standards
              </button>
            </li>
            <li>
              <button
                onClick={onOpenRfq}
                className="hover:text-white transition-colors text-[#D4AF37] font-medium"
              >
                Direct Manufacturer RFQ
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Global Desks & Socials */}
        <div className="space-y-3">
          <h4 className="font-mono text-[11px] uppercase tracking-widest text-white">
            Export Desks
          </h4>
          <div className="space-y-1.5 text-xs">
            <p className="text-slate-300">USA & Canada Architectural Accounts</p>
            <p className="text-slate-300">UK & European Union Distributors</p>
            <p className="text-slate-300">Australia & Pacific Wholesale</p>
            <p className="text-slate-300">Gulf GCC & Saudi Mega Projects</p>
          </div>

          <div className="pt-3 border-t border-white/5">
            <h5 className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-2">
              Social Profiles
            </h5>
            <div className="flex items-center gap-2">
              {Object.entries(COMPANY_INFO.socialLinks).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 flex items-center justify-center capitalize transition-colors text-[10px]"
                  title={name}
                >
                  {name.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors">
              Terms & Conditions
            </button>
            <span>·</span>
            <span className="text-slate-600">Export Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
