/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Lovable Luxury Architecture Hero Component — Ultra-Bright & Clean Edition
 * Powered by Marmova Design System & Modern Web Architecture
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Move3d,
  FileText,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { NavigationTab } from '../layout/Navbar';
import { TileProduct } from '../../types';

interface Hotspot {
  top: string;
  left: string;
  title: string;
  subtitle: string;
  lines: string[];
  ctaLabel: string;
  ctaAction: '3d' | 'rfq' | 'calculator' | 'whatsapp';
  targetTileId?: string;
}

interface HeroPerspectiveView {
  id: string;
  index: string;
  label: string;
  subtitle: string;
  image: string;
  alt: string;
  hotspots: Hotspot[];
}

const PERSPECTIVE_VIEWS: HeroPerspectiveView[] = [
  {
    id: 'villa',
    index: '01',
    label: 'Twilight Villa Residence',
    subtitle: 'Continuous Living · Handcrafted Botanical Bas-Relief',
    image: '/assets/hero-villa-bright.jpg',
    alt: 'Bright Mediterranean terrace villa with architect holding handcrafted botanical porcelain slab at golden sunset',
    hotspots: [
      {
        top: '60%',
        left: '55%',
        title: 'Botanical Bas-Relief Slab',
        subtitle: '1200 × 2400 × 9 mm Vitrified Slab',
        lines: [
          'Handcrafted organic leaf relief with 40 GU satin honed finish',
          'Bookmatched sequencing across full architectural planes',
          '< 0.05% water absorption · Certified EN ISO 10545-3',
        ],
        ctaLabel: 'Test in 3D Visualizer',
        ctaAction: '3d',
        targetTileId: 'marmova-statuario-imperial',
      },
      {
        top: '78%',
        left: '38%',
        title: 'Travertine Porcelain Pavers',
        subtitle: 'Monolithic Continuous Floor',
        lines: [
          'Large-format vitrified floor pavers with zero visible grout lines',
          'Flexural strength > 48 N/mm² · High traffic endurance',
          'Frost-proof, stain-proof, and UV color-fast',
        ],
        ctaLabel: 'Calculate Container Load',
        ctaAction: 'calculator',
      },
      {
        top: '68%',
        left: '22%',
        title: 'Terrace Threshold Transition',
        subtitle: 'Indoor–Outdoor Architecture',
        lines: [
          'R10 interior & R11 exterior high-traction grip',
          'Thermal shock resistant for all weather climates',
          'Precision rectified edges with 1mm micro-grout capability',
        ],
        ctaLabel: 'Request Architectural Spec Sheet',
        ctaAction: 'rfq',
      },
    ],
  },
  {
    id: 'showroom',
    index: '02',
    label: 'Experience Center Gallery',
    subtitle: 'Flagship Sunlit Gallery · Large-Format Sintered Slabs',
    image: '/assets/hero-showroom-bright.jpg',
    alt: 'Bright sunlit flagship showroom gallery with architects inspecting large-format Calacatta Gold sintered slabs',
    hotspots: [
      {
        top: '48%',
        left: '25%',
        title: 'Calacatta Gold Sintered Slab',
        subtitle: 'Flagship Monolithic Display',
        lines: [
          '1200 × 2400 mm sintered slabs in 9 mm & 20 mm gauges',
          'Calibrated mirror polish measured at > 95 GU gloss units',
          'Continuous golden veining and bookmatched pair alignment',
        ],
        ctaLabel: 'Test in 3D Visualizer',
        ctaAction: '3d',
        targetTileId: 'marmova-calacatta-gold',
      },
      {
        top: '75%',
        left: '48%',
        title: 'High-Gloss Polished Flooring',
        subtitle: 'Crystalline Depth Surface',
        lines: [
          'Ultra-hard vitrified body with crystal glaze protection',
          'Scratch hardness MOHS 7 · Class 5 stain cleanability',
          'Perfect geometric flatness for mirror-grade reflections',
        ],
        ctaLabel: 'Request Global Export Quote',
        ctaAction: 'rfq',
      },
      {
        top: '46%',
        left: '72%',
        title: 'Marmova Export Pavilion',
        subtitle: 'Global Port Dispatch',
        lines: [
          'Direct seaport container dispatch from Mundra & Pipavav',
          'Express sample kits shipped worldwide via DHL & FedEx',
          'Factory-direct pricing on FOB and CIF container terms',
        ],
        ctaLabel: 'Request Export RFQ',
        ctaAction: 'rfq',
      },
    ],
  },
];

interface LovableHeroProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenRfq: (product?: TileProduct) => void;
  onVisualizeTile: (tileId: string) => void;
  onSendWhatsApp: (product?: TileProduct) => void;
}

export const LovableHero: React.FC<LovableHeroProps> = ({
  onNavigate,
  onOpenRfq,
  onVisualizeTile,
  onSendWhatsApp,
}) => {
  const [viewIndex, setViewIndex] = useState(0);
  const [openHotspot, setOpenHotspot] = useState<number | null>(null);

  const activeView = PERSPECTIVE_VIEWS[viewIndex];

  const handleCtaClick = (hotspot: Hotspot) => {
    setOpenHotspot(null);
    if (hotspot.ctaAction === '3d') {
      if (hotspot.targetTileId) {
        onVisualizeTile(hotspot.targetTileId);
      } else {
        onNavigate('3d');
      }
    } else if (hotspot.ctaAction === 'rfq') {
      onOpenRfq();
    } else if (hotspot.ctaAction === 'calculator') {
      onNavigate('calculator');
    } else if (hotspot.ctaAction === 'whatsapp') {
      onSendWhatsApp();
    }
  };

  return (
    <section className="relative min-h-[82vh] lg:min-h-[88vh] overflow-hidden rounded-3xl border border-white/15 shadow-2xl bg-[#090D16]">
      {/* 1. DUAL-PERSPECTIVE ULTRA-BRIGHT BACKGROUND IMAGERY WITH SMOOTH CROSSFADE */}
      {PERSPECTIVE_VIEWS.map((view, index) => (
        <div
          key={view.id}
          aria-hidden={index !== viewIndex}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out z-0"
          style={{ opacity: index === viewIndex ? 1 : 0 }}
        >
          <img
            src={view.image}
            alt={view.alt}
            className="h-full w-full object-cover object-center brightness-105 contrast-[1.03]"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* 2. REFINED SUBTLE GRADIENT OVERLAYS — MAINTAINS MAXIMUM BRIGHTNESS & ZERO FADING */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#090D16]/90 via-[#090D16]/25 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#090D16]/80 via-transparent to-transparent pointer-events-none max-w-2xl" />

      {/* 3. HERO CONTENT MATRIX — CRISP, CONCISE, ZERO WORD OVERLAPPING */}
      <div className="relative z-20 mx-auto flex min-h-[82vh] lg:min-h-[88vh] max-w-7xl flex-col justify-end px-6 sm:px-10 pb-12 sm:pb-16 pt-28">
        {/* Concise Origin Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/80 border border-[#D4AF37]/50 text-[#F3E5AB] text-[11px] font-mono uppercase tracking-[0.2em] w-fit shadow-lg mb-3.5 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>MARMOVA ARCHITECTURAL SURFACES · GLOBAL EXPORT</span>
        </motion.div>

        {/* Clean Main Headline — Generous line-height, zero overlapping words */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight sm:leading-snug mb-6 drop-shadow-md"
        >
          Where{' '}
          <span className="text-gold-gradient italic">
            Nature’s Imprint
          </span>{' '}
          Meets{' '}
          <span className="text-gold-gradient italic">
            Timeless Luxury
          </span>
        </motion.h1>

        {/* Interactive Bar: 2 Primary Actions + Dual Perspective View Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-3 sm:gap-4"
        >
          {/* Primary Action 1 (Magic UI Shimmer CTA) */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate('3d')}
            className="shimmer-gold-button flex items-center gap-2 px-6 py-3 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider transition-shadow shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <Move3d className="w-4 h-4 text-slate-950" />
            <span>Launch 3D Visualizer</span>
          </motion.button>

          {/* Primary Action 2 */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenRfq()}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950/80 hover:bg-slate-900 text-white font-semibold text-xs tracking-wider uppercase border border-white/20 hover:border-[#D4AF37] transition-all cursor-pointer backdrop-blur-md shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Request Quote</span>
          </motion.button>

          {/* Perspective Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/15 backdrop-blur-md">
            {PERSPECTIVE_VIEWS.map((view, i) => (
              <button
                key={view.id}
                onClick={() => {
                  setViewIndex(i);
                  setOpenHotspot(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  i === viewIndex
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px]">{view.index}</span>
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 4. INTERACTIVE ARCHITECTURAL HOTSPOTS */}
      {activeView.hotspots.map((spot, i) => (
        <div
          key={`${activeView.id}-${spot.title}`}
          className="absolute z-30"
          style={{ top: spot.top, left: spot.left }}
        >
          {/* Pulsing Target Marker */}
          <button
            aria-label={spot.title}
            onClick={() => setOpenHotspot(openHotspot === i ? null : i)}
            className={`animate-pulse-ring relative flex items-center justify-center w-7 h-7 rounded-full border-2 border-white shadow-xl transition-transform hover:scale-125 cursor-pointer ${
              openHotspot === i ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/90 hover:bg-[#F3E5AB]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-950" />
          </button>

          {/* Specification Card with AnimatePresence */}
          <AnimatePresence>
            {openHotspot === i && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="glass-panel-gold-glow absolute top-10 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 z-40 w-76 sm:w-88 rounded-2xl p-4 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border border-[#D4AF37]/50"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                  <span className="eyebrow flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    {activeView.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#F3E5AB] px-2 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40">
                    ISO 10545 Verified
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {spot.title}
                </h4>
                <p className="text-[11px] text-[#F3E5AB] font-mono mt-0.5 mb-3">
                  {spot.subtitle}
                </p>

                <ul className="space-y-2 mb-4">
                  {spot.lines.map((line, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCtaClick(spot)}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA820A] hover:from-[#F3E5AB] hover:to-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20 hover:scale-[1.01]"
                >
                  <span>{spot.ctaLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      {/* 5. ARCHITECTURAL EXPORT SPECIFICATION TICKER RIBBON */}
      <div className="relative z-20 border-t border-white/10 bg-slate-950/80 backdrop-blur-md px-6 sm:px-10 py-3 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#D4AF37] font-semibold">DIRECT SEAPORT DISPATCH ACTIVE</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">Mundra (INMUN1) & Pipavav (INPAV1)</span>
        </div>
        <div className="hidden lg:flex items-center gap-4 text-slate-400">
          <span>SACMI 7,500T Compaction</span>
          <span>·</span>
          <span>Flexural ≥ 48 N/mm²</span>
          <span>·</span>
          <span>Absorption &lt; 0.05%</span>
          <span>·</span>
          <span className="text-emerald-400 font-semibold">ISPM-15 Compliant</span>
        </div>
      </div>
    </section>
  );
};
