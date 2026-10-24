/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../../data/companyConfig';
import {
  Compass,
  Truck,
  Calculator,
  Layers,
  Sparkles,
  Menu,
  X,
  Globe2,
  Share2,
  FileCheck,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

export type NavigationTab =
  | 'home'
  | 'catalogue'
  | 'visualizer'
  | 'container-calc'
  | 'quantity-calc'
  | 'applications'
  | 'export'
  | 'about';

interface NavbarProps {
  activeTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  onOpenRfq: () => void;
  onOpenWhatsApp: () => void;
  countryName: string;
  countryFlag: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenRfq,
  onOpenWhatsApp,
  countryName,
  countryFlag,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: NavigationTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'catalogue', label: 'Collections' },
    { id: 'visualizer', label: '3D Visualizer', badge: 'Interactive' },
    { id: 'container-calc', label: 'Container Calc' },
    { id: 'quantity-calc', label: 'Quantity Calc' },
    { id: 'applications', label: 'Applications' },
    { id: 'export', label: 'Export & Logistics' },
    { id: 'about', label: 'Quality Specs' },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#8C6D15] p-0.5 shadow-lg shadow-[#D4AF37]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#090D16] rounded-[10px] flex items-center justify-center">
              <span className="font-serif-luxury text-xl font-bold text-gold-gradient">M</span>
            </div>
          </div>
          <div>
            <div className="font-serif-luxury text-xl font-extrabold tracking-widest text-white flex items-center gap-1.5">
              <span>MARMOVA</span>
              <span className="text-[9px] font-mono font-normal tracking-normal text-[#D4AF37] border border-[#D4AF37]/30 px-1 py-0.2 rounded">
                EXPORT
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              Architectural Vitrified Surfaces
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-[#D4AF37] font-semibold bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-mono uppercase rounded bg-[#D4AF37]/20 text-[#F3E5AB]">
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenWhatsApp}
            className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-white/10 hover:border-emerald-500/40 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            title={`Connect with ${countryName} Export Representative via WhatsApp`}
          >
            <Share2 className="w-4 h-4" />
            <span className="hidden xl:inline">{countryFlag} WhatsApp</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenRfq}
            className="shimmer-gold-button py-2.5 px-4 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>Request Quote</span>
          </motion.button>
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-white/10"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0E18] border-b border-white/10 p-5 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm flex items-center justify-between transition-colors ${
                  activeTab === link.id
                    ? 'bg-slate-800 text-[#D4AF37] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-[#D4AF37]/20 text-[#D4AF37]">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRfq();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Request Export Quote (RFQ)
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsApp();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Chat on WhatsApp ({countryFlag} {countryName})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
