/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TILE_PRODUCTS, ROOM_PRESETS } from '../../data/products';
import { COMPANY_INFO, COUNTRY_CONTACTS } from '../../data/companyConfig';
import { NavigationTab } from '../layout/Navbar';
import { TileProduct } from '../../types';
import { LovableHero } from './LovableHero';
import { ReviewsSection } from './ReviewsSection';
import {
  Compass,
  Truck,
  Calculator,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Globe2,
  Share2,
  Eye,
  Award,
  Maximize2,
  Flame,
  Zap,
  Box,
  Scale,
  Anchor,
  SlidersHorizontal,
  Check,
  PackageCheck,
  X,
  Building,
  ExternalLink,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenProduct: (product: TileProduct) => void;
  onVisualizeTile: (tileId: string) => void;
  onOpenRfq: (product?: TileProduct) => void;
  onSendWhatsApp: (product?: TileProduct) => void;
  currentCountryName: string;
  currentFlag: string;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenProduct,
  onVisualizeTile,
  onOpenRfq,
  onSendWhatsApp,
  currentCountryName,
  currentFlag,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);



  // Bento Interactive Mini-Simulator State
  const [bentoContainerType, setBentoContainerType] = useState<'20ft' | '40ft'>('20ft');
  const [bentoTileFormat, setBentoTileFormat] = useState<'1200x600' | '1200x1200' | '600x600_20mm'>('1200x600');
  
  // Bento 3D WebGL Shader Swatch Preview State
  const [bentoSelectedTileId, setBentoSelectedTileId] = useState<string>('marmova-statuario-imperial');

  // Real-time FCL Container Simulation Engine
  const getContainerSimData = () => {
    if (bentoContainerType === '20ft') {
      if (bentoTileFormat === '1200x600') {
        return {
          grossKg: 27140,
          maxKg: 28000,
          utilizationPercent: 96.9,
          pallets: 11,
          palletType: 'Euro 1200×800 mm (ISPM-15)',
          sqMeters: 1425.6,
          boxes: 990,
          portDispatch: 'Mundra Seaport (INMUN1)',
        };
      } else if (bentoTileFormat === '1200x1200') {
        return {
          grossKg: 26880,
          maxKg: 28000,
          utilizationPercent: 96.0,
          pallets: 10,
          palletType: 'Industrial 1200×1200 mm (ISPM-15)',
          sqMeters: 1209.6,
          boxes: 420,
          portDispatch: 'Mundra Seaport (INMUN1)',
        };
      } else {
        return {
          grossKg: 27500,
          maxKg: 28000,
          utilizationPercent: 98.2,
          pallets: 12,
          palletType: 'Heavy-Duty Timber (ISPM-15)',
          sqMeters: 604.8,
          boxes: 840,
          portDispatch: 'Pipavav Seaport (INPAV1)',
        };
      }
    } else {
      if (bentoTileFormat === '1200x600') {
        return {
          grossKg: 28200,
          maxKg: 28500,
          utilizationPercent: 98.9,
          pallets: 22,
          palletType: 'Euro 1200×800 mm (ISPM-15)',
          sqMeters: 2160.0,
          boxes: 1500,
          portDispatch: 'Mundra Seaport (INMUN1)',
        };
      } else if (bentoTileFormat === '1200x1200') {
        return {
          grossKg: 28100,
          maxKg: 28500,
          utilizationPercent: 98.6,
          pallets: 20,
          palletType: 'Industrial 1200×1200 mm (ISPM-15)',
          sqMeters: 1843.2,
          boxes: 640,
          portDispatch: 'Mundra Seaport (INMUN1)',
        };
      } else {
        return {
          grossKg: 28400,
          maxKg: 28500,
          utilizationPercent: 99.6,
          pallets: 24,
          palletType: 'Heavy-Duty Timber (ISPM-15)',
          sqMeters: 1008.0,
          boxes: 1400,
          portDispatch: 'Pipavav Seaport (INPAV1)',
        };
      }
    }
  };

  const simData = getContainerSimData();
  const currentBentoTile = TILE_PRODUCTS.find((t) => t.id === bentoSelectedTileId) || TILE_PRODUCTS[0];

  const faqs = [
    {
      q: 'How can I choose the correct tile format and thickness for my project?',
      a: 'For interior residential and commercial flooring, our standard 9.0mm to 9.5mm vitrified porcelain slabs (e.g. 1200×600mm and 1200×1200mm) deliver optimum flexural strength (> 48 N/mm²) while keeping deadweight efficient for container sea shipping. For exterior terraces, raised access pedestals, and vehicular driveways, our monolithic 20mm pavers (R11 rated, 11kN point load) should be selected.',
    },
    {
      q: 'How is 20-foot FCL container loadability calculated for porcelain tiles?',
      a: 'Vitrified porcelain has a dense specific gravity (~2.40 g/cm³), making ocean shipments strictly weight payload-limited rather than volume-limited. A standard 20ft container can safely carry up to 28,000 kg gross cargo weight. Depending on carton weight and pallet standard (Euro 1200×800 vs Industrial 1200×1000), a 20ft FCL typically holds 10 to 11 packed pallets, yielding between 1,200 m² and 1,500 m² of 9mm porcelain tiles.',
    },
    {
      q: 'What is the recommended wastage allowance when calculating tile orders?',
      a: 'We recommend factoring 5% to 8% wastage for standard straight-grid layouts in simple rectangular rooms. For brick-bond or staggered patterns, 10% is customary. For diagonal, herringbone, or complex architectural layouts with curved walls and alcoves, 15% wastage is recommended to account for perimeter cuts and maintain attic reserve spares.',
    },
    {
      q: 'How does your interactive 3D room visualizer assist with specification?',
      a: 'Our Studio 3D Visualizer runs real WebGL shaders that simulate true aspect ratios, surface reflections (high gloss vs silk matte), and realistic grout joints (1mm to 5mm). Architects and buyers can test floor and wall tile pairings in real time, adjust daylight or evening spotlights, and capture high-resolution snapshots to attach to their RFQ.',
    },
    {
      q: 'Can international buyers request architectural physical samples before bulk ordering?',
      a: 'Yes. We supply 150×150mm cut tile chips or full-format presentation binder swatches dispatched via DHL or FedEx Express directly to architectural studios and corporate offices worldwide within 4 to 6 business days.',
    },
    {
      q: 'Which Incoterms and international seaports do you support for dispatch?',
      a: 'All quotations can be prepared on FOB terms from Mundra Seaport or Pipavav Seaport (Gujarat, India), or on CIF / CFR terms delivered directly to your designated seaport (e.g. Port of Los Angeles, New York, Felixstowe, Hamburg, Jebel Ali, Sydney, or Melbourne).',
    },
  ];

  const featuredTiles = TILE_PRODUCTS.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-24">
      {/* 1. DUAL-PERSPECTIVE ARCHITECTURAL HERO (LOVABLE DESIGN SYSTEM) */}
      <LovableHero
        onNavigate={onNavigate}
        onOpenRfq={onOpenRfq}
        onVisualizeTile={onVisualizeTile}
        onSendWhatsApp={onSendWhatsApp}
      />

      {/* 2. CATEGORY ARCHITECTURAL SHOWCASE BENTO */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
              <span>Modular Bento Architecture · Sintered Formats</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Architectural Surface Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-slate-900/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer shadow-lg"
          >
            <span>Explore Complete Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Modular 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: Flagship Marble Masterworks (Large 8-col hero bento card) */}
          <div className="bento-card spotlight-card md:col-span-12 lg:col-span-8 relative min-h-[440px] lg:min-h-[500px] flex flex-col justify-between p-6 sm:p-8 group overflow-hidden">
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-marble.jpg"
              alt="Marble Masterworks"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            {/* Top Bar Badges */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-[#D4AF37] text-slate-950 font-bold tracking-wide shadow-md">
                  Flagship Prestige
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase bg-slate-900/90 text-[#F3E5AB] border border-white/10 backdrop-blur-md">
                  1200×600 & 1200×1200 mm
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                95° GU High Gloss
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 space-y-4 pt-20">
              <div className="space-y-1.5">
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                  Marble Masterworks
                </h3>
              </div>

              {/* Specs Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Water Absorption</span>
                  <span className="text-xs font-bold text-[#D4AF37]">&lt; 0.05% Impervious</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Edge Rectification</span>
                  <span className="text-xs font-bold text-slate-200">1.0mm Micro-Grout</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">Bending Strength</span>
                  <span className="text-xs font-bold text-emerald-400">≥ 48 N/mm²</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onVisualizeTile('marmova-statuario-imperial')}
                  className="shimmer-gold-button py-2.5 px-5 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] transition-transform shadow-lg shadow-[#D4AF37]/30 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Launch in 3D Room</span>
                </button>
                <button
                  onClick={() => onOpenRfq(TILE_PRODUCTS[0])}
                  className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <span>Request RFQ Spec</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Sintered Monolith Slabs (4-col top bento card) */}
          <div
            onClick={() => onVisualizeTile('marmova-calacatta-oro-extra')}
            className="bento-card spotlight-card md:col-span-6 lg:col-span-4 relative min-h-[260px] flex flex-col justify-between p-6 group cursor-pointer overflow-hidden"
          >
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-sintered.jpg"
              alt="Sintered Monolith Slabs"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900/90 text-[#D4AF37] border border-white/10">
                1600×800 & 1200×1200 mm
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:rotate-45 transition-transform">
                <Compass className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                Sintered Monolith Slabs
              </h3>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>3D Shader Preview</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bento Card 3: 20mm Outdoor Pavers (4-col mid bento card) */}
          <div
            onClick={() => onVisualizeTile('marmova-pietra-piasentina-outdoor')}
            className="bento-card spotlight-card md:col-span-6 lg:col-span-4 relative min-h-[260px] flex flex-col justify-between p-6 group cursor-pointer overflow-hidden"
          >
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-pavers.jpg"
              alt="20mm Monolithic Outdoor Pavers"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900/90 text-emerald-400 border border-emerald-500/30">
                20mm Monolithic · R11
              </span>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
                11,000 N Point Load
              </span>
            </div>

            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                20mm Monolithic Outdoor Pavers
              </h3>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>Visualize in 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bento Card 4: Translucent Onyx Vitrified (4-col bottom-left) */}
          <div
            onClick={() => onVisualizeTile('marmova-onice-smeraldo')}
            className="bento-card spotlight-card md:col-span-6 lg:col-span-4 relative min-h-[260px] flex flex-col justify-between p-6 group cursor-pointer overflow-hidden"
          >
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-onyx.jpg"
              alt="Translucent Onyx Vitrified"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900/90 text-[#F3E5AB] border border-white/10">
                Translucent Onyx · High Gloss
              </span>
              <div className="w-7 h-7 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:rotate-45 transition-transform">
                <Compass className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                Translucent Onyx Vitrified
              </h3>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>Visualize in 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bento Card 5: Alpine Geological Stone (4-col bottom-mid) */}
          <div
            onClick={() => onVisualizeTile('marmova-ceppo-di-gre')}
            className="bento-card spotlight-card md:col-span-6 lg:col-span-4 relative min-h-[260px] flex flex-col justify-between p-6 group cursor-pointer overflow-hidden"
          >
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-ceppo.jpg"
              alt="Alpine Geological Stone"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900/90 text-slate-300 border border-white/10">
                1600×800 & 800×800 mm
              </span>
              <span className="text-[10px] font-mono text-[#D4AF37] bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
                Tactile 3D Relief
              </span>
            </div>

            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                Alpine Geological Stone
              </h3>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>Visualize in 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bento Card 6: Nordic Wood Grain Planks (4-col bottom-right) */}
          <div
            onClick={() => onVisualizeTile('marmova-rovere-scuro-oak')}
            className="bento-card spotlight-card md:col-span-12 lg:col-span-4 relative min-h-[260px] flex flex-col justify-between p-6 group cursor-pointer overflow-hidden"
          >
            {/* Real Photorealistic Architectural Material Imagery from Lovable — Full-Bleed & Bright */}
            <img
              src="/assets/card-wood.jpg"
              alt="Nordic Wood Grain Planks"
              className="absolute inset-0 z-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/50 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900/90 text-amber-300 border border-amber-400/20">
                1200×200 mm Planks
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-slate-900/80 px-2 py-0.5 rounded border border-white/10">
                Zero Warp / Waterproof
              </span>
            </div>

            <div className="relative z-10 space-y-2 pt-16">
              <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                Nordic Wood Grain Planks
              </h3>
              <div className="flex items-center justify-between text-xs text-[#D4AF37] font-semibold">
                <span>Visualize in 3D</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. FEATURED PRODUCTS COLLECTION GRID */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Flagship Specifications
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight mt-1">
              Featured Vitrified Slabs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalogue')}
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>See All Slabs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTiles.map((tile) => (
            <div
              key={tile.id}
              className="rounded-2xl bg-[#0F1424] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-[#D4AF37]/10 spotlight-card"
            >
              <div className="relative aspect-square overflow-hidden rounded-t-2xl border-b border-white/10 bg-slate-950">
                <img
                  src={tile.previewImageUrl}
                  alt={tile.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/20 pointer-events-none" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono uppercase bg-slate-950/90 text-[#D4AF37] border border-white/10 backdrop-blur-md font-semibold">
                    {tile.sku}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-slate-950/90 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    {tile.slipRating || 'ISO BIa'}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-300 bg-slate-950/80 backdrop-blur-md border border-white/10">
                    {tile.lengthMm}×{tile.widthMm}mm
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 block">
                    {tile.category}
                  </span>
                  <h3
                    onClick={() => onOpenProduct(tile)}
                    className="font-serif-luxury text-base text-white font-bold hover:text-[#D4AF37] transition-colors cursor-pointer mt-0.5"
                  >
                    {tile.name}
                  </h3>
                  <div className="text-xs text-slate-300 mt-1">
                    {tile.lengthMm}×{tile.widthMm}mm · {tile.finish}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onVisualizeTile(tile.id)}
                    className="py-2 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 hover:border-[#D4AF37]/50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>3D Room</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onOpenRfq(tile)}
                    className="shimmer-gold-button py-2 px-2.5 rounded-xl text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-slate-950" />
                    <span>Quote</span>
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE 3D ROOM PREVIEW PROMO BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-[#0F1424] via-[#141A2E] to-[#0F1424] border border-[#D4AF37]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <Compass className="w-4 h-4" />
              <span>Interactive Architectural Tool</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold leading-tight">
              Visualize Any Surface in Real 3D Space
            </h2>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('visualizer')}
                className="shimmer-gold-button py-3 px-6 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/30 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Compass className="w-4 h-4" />
                Launch 3D Room Visualizer
              </button>

              <button
                onClick={() => onNavigate('container-calc')}
                className="py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 transition-colors cursor-pointer"
              >
                Calculate Container Loading
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-br from-[#121829] via-[#0B0F19] to-[#070A10] p-6 shadow-2xl relative group h-64 flex flex-col justify-between">
              {/* Subtle 3D perspective grid lines */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(212, 175, 55, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(212, 175, 55, 0.15) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  transform: 'perspective(400px) rotateX(25deg)',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-transparent" />

              <div className="relative z-10 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  WebGL 2.0 Shader Engine
                </span>
                <span className="font-mono text-[#D4AF37] text-[10px]">60 FPS Realtime</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                <button
                  onClick={() => onNavigate('visualizer')}
                  className="w-14 h-14 rounded-full bg-[#D4AF37] hover:bg-[#E5C07B] text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer"
                  title="Open 3D Visualizer"
                >
                  <Compass className="w-7 h-7" />
                </button>
                <span className="text-white text-xs font-semibold mt-2 group-hover:text-[#D4AF37] transition-colors">
                  Click to Launch Interactive 3D Room
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2 font-mono">
                <span>Format: 1200×600mm</span>
                <span>Grout: 1.5mm Rectified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SAAS-STYLE TECHNICAL & MANUFACTURING PROWESS BENTO GRID */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest mb-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>SaaS-Grade Technical & Logistics Matrix</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
              Manufacturing Prowess & Global Freight Bento
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Real-time ocean container payload simulator, interactive 3D WebGL shader controls, sub-millimeter laser orthogonality, and verified laboratory certifications.
            </p>
          </div>
          <button
            onClick={() => onNavigate('container-calc')}
            className="text-xs font-bold text-[#D4AF37] hover:text-[#F3E5AB] flex items-center gap-1.5 py-2.5 px-5 rounded-xl bg-slate-900/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all cursor-pointer shadow-lg shrink-0"
          >
            <Truck className="w-4 h-4" />
            <span>Launch Container Optimizer</span>
          </button>
        </div>

        {/* 12-Column SaaS Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card A: Interactive 20ft/40ft Ocean Container Loadability Simulator (7 cols) */}
          <div className="bento-card md:col-span-12 lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                      FCL Sea Freight Simulator
                    </span>
                    <h3 className="font-serif-luxury text-lg text-white font-bold">
                      Container Loadability & Payload Optimizer
                    </h3>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{simData.portDispatch}</span>
                </div>
              </div>
              <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                Porcelain tiles are payload-limited by ocean weight regulations (max 28,000 kg). Test container formats and tile dimensions to view dynamic payload utilization.
              </p>
            </div>

            {/* Interactive Controls */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Container Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">
                    Ocean Container Standard
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/10">
                    <button
                      onClick={() => setBentoContainerType('20ft')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        bentoContainerType === '20ft'
                          ? 'bg-[#D4AF37] text-slate-950 shadow-md font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      20ft Standard
                    </button>
                    <button
                      onClick={() => setBentoContainerType('40ft')}
                      className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        bentoContainerType === '40ft'
                          ? 'bg-[#D4AF37] text-slate-950 shadow-md font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      40ft High Cube
                    </button>
                  </div>
                </div>

                {/* Tile Format Selector */}
                <div>
                  <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1.5">
                    Slab Specification Format
                  </label>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-950/80 border border-white/10 text-[11px]">
                    <button
                      onClick={() => setBentoTileFormat('1200x600')}
                      className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                        bentoTileFormat === '1200x600'
                          ? 'bg-[#D4AF37] text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="1200×600 mm (9mm)"
                    >
                      1200×600
                    </button>
                    <button
                      onClick={() => setBentoTileFormat('1200x1200')}
                      className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                        bentoTileFormat === '1200x1200'
                          ? 'bg-[#D4AF37] text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="1200×1200 mm (9mm)"
                    >
                      1200×1200
                    </button>
                    <button
                      onClick={() => setBentoTileFormat('600x600_20mm')}
                      className={`py-1.5 px-1.5 rounded-lg text-center transition-all cursor-pointer truncate ${
                        bentoTileFormat === '600x600_20mm'
                          ? 'bg-[#D4AF37] text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="600×600 mm (20mm Paver)"
                    >
                      20mm Paver
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Utilization Gauge Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Payload Weight Utilization</span>
                  <span className="text-emerald-400 font-bold">
                    {simData.grossKg.toLocaleString()} / {simData.maxKg.toLocaleString()} kg ({simData.utilizationPercent}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-950 border border-white/10 overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C07B] to-emerald-400 transition-all duration-500 shadow-sm"
                    style={{ width: `${Math.min(100, simData.utilizationPercent)}%` }}
                  />
                </div>
              </div>

              {/* 4 Live Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Area Coverage</span>
                  <strong className="text-white font-mono text-xs sm:text-sm">
                    {simData.sqMeters.toFixed(1)} m²
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Cartons Packed</span>
                  <strong className="text-white font-mono text-xs sm:text-sm">
                    {simData.boxes} boxes
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Pallets</span>
                  <strong className="text-[#D4AF37] font-mono text-xs sm:text-sm">
                    {simData.pallets} Pallets
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase">Safety Margin</span>
                  <strong className="text-emerald-400 font-mono text-xs sm:text-sm">
                    ISPM-15 Hooded
                  </strong>
                </div>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('container-calc')}
                className="py-2.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Open Advanced Calculator</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenRfq()}
                className="py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Request FCL Quotation</span>
              </motion.button>
            </div>
          </div>

          {/* Card B: Interactive 3D WebGL Shader Laboratory Preview (5 cols) */}
          <div className="bento-card md:col-span-12 lg:col-span-5 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                      WebGL Shader Lab
                    </span>
                    <h3 className="font-serif-luxury text-lg text-white font-bold">
                      Interactive Surface Preview
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-[10px] font-mono text-[#D4AF37]">
                  Three.js Engine
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                Test surface sheen, dynamic daylight reflections, and 1mm micro-grout pairings before launching into the full 3D room.
              </p>
            </div>

            {/* Interactive Swatch Switcher */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Select Architectural Swatch:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'marmova-statuario-imperial', label: 'Statuario' },
                  { id: 'marmova-nero-marquina-gold', label: 'Nero Noir' },
                  { id: 'marmova-calacatta-oro-extra', label: 'Calacatta' },
                  { id: 'marmova-onice-smeraldo', label: 'Onyx' },
                ].map((s) => {
                  const isSelected = bentoSelectedTileId === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setBentoSelectedTileId(s.id)}
                      className={`py-2 px-1 rounded-xl text-xs font-mono transition-all cursor-pointer border text-center ${
                        isSelected
                          ? 'bg-[#D4AF37] text-slate-950 font-bold border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 scale-102'
                          : 'bg-slate-900/80 text-slate-300 border-white/10 hover:border-[#D4AF37]/40'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tile Details Box (Photo-Free Architectural Swatch) */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-white/10 flex items-center gap-3.5">
                <div
                  className="w-14 h-14 rounded-xl border border-white/20 shadow-md shrink-0 flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor: currentBentoTile.colorHex || '#1E2433',
                    backgroundImage: `radial-gradient(circle at 75% 25%, ${currentBentoTile.accentVeinColor || 'rgba(212,175,55,0.25)'} 0%, transparent 60%)`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20" />
                  <span className="font-mono text-[9px] font-bold text-slate-900 bg-white/75 px-1 py-0.5 rounded backdrop-blur-sm z-10">
                    {currentBentoTile.finish.split(' ')[0]}
                  </span>
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="text-xs font-bold text-white truncate font-serif-luxury">
                    {currentBentoTile.name}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span>{currentBentoTile.lengthMm}×{currentBentoTile.widthMm}mm</span>
                    <span>·</span>
                    <span className="text-[#D4AF37]">{currentBentoTile.finish}</span>
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Laser Rectified · Micro-Grout 1.0mm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Launch Visualizer Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onVisualizeTile(bentoSelectedTileId)}
              className="shimmer-gold-button w-full py-3 px-4 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/30 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>Launch 3D Visualizer With This Surface</span>
            </motion.button>
          </div>

          {/* Card C: Extreme Hydraulic Compaction (4 cols) */}
          <div className="bento-card md:col-span-6 lg:col-span-4 p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
                <Zap className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 text-emerald-400 border border-emerald-500/20">
                ISO 10545-4 Verified
              </span>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white tracking-tight">
                7,500 Tonnes
              </div>
              <h4 className="font-semibold text-sm text-[#D4AF37] mt-0.5">
                SACMI Hydraulic Compaction
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Extreme mechanical pressure expels internal micro-voids, guaranteeing flexural modulus of rupture ≥ 48 N/mm² (surpassing the standard 35 N/mm² by 1.37x).
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Bending Load:</span>
              <span className="text-white font-bold">&gt; 2,400 N</span>
            </div>
          </div>

          {/* Card D: Impervious Water Absorption (4 cols) */}
          <div className="bento-card md:col-span-6 lg:col-span-4 p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
                <Flame className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 text-[#D4AF37] border border-[#D4AF37]/30">
                Group BIa Impervious
              </span>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white tracking-tight">
                &lt; 0.05%
              </div>
              <h4 className="font-semibold text-sm text-[#D4AF37] mt-0.5">
                Water Absorption Benchmark
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Sintered mineral fusion yields an impervious porcelain body completely immune to moisture penetration, frost spalling down to -40°C, and efflorescence.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Standard Comparison:</span>
              <span className="text-emerald-400 font-bold">10x Lower than ISO standard</span>
            </div>
          </div>

          {/* Card E: Laser Orthogonality & Micro-Grout (4 cols) */}
          <div className="bento-card md:col-span-12 lg:col-span-4 p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center border border-[#D4AF37]/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-900 text-slate-300 border border-white/10">
                EN 14411 Annex G
              </span>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-white tracking-tight">
                ± 0.1 mm
              </div>
              <h4 className="font-semibold text-sm text-[#D4AF37] mt-0.5">
                Laser Orthogonality Precision
              </h4>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Diamond-wheel squaring technology guarantees sharp 90° corners and planar flatness (≤ 0.08% deviation), allowing continuous 1.0mm micro-grout installations.
            </p>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Allowable Joint:</span>
              <span className="text-white font-bold">1.0mm to 2.0mm</span>
            </div>
          </div>

          {/* Card F: Global Seaport Desk & Live WhatsApp RFQ (12 cols full width bento strip) */}
          <div className="bento-card md:col-span-12 p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900/90 via-[#0F172A] to-slate-900/90 border border-[#D4AF37]/30">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg">
                <Globe2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Active Sea Freight Loading · 45+ Seaports
                  </span>
                </div>
                <h4 className="font-serif-luxury text-base sm:text-lg text-white font-bold">
                  Direct International Export Desk: {currentFlag} {currentCountryName}
                </h4>
                <p className="text-slate-300 text-xs max-w-xl">
                  Connect immediately with our dedicated regional export director. Instant proforma invoices, FOB/CIF schedules, and ISPM-15 packaging compliance.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSendWhatsApp()}
                className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-emerald-900/30"
              >
                <Share2 className="w-4 h-4" />
                <span>Direct WhatsApp</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onOpenRfq()}
                className="flex-1 md:flex-initial py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Submit RFQ</span>
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED ARCHITECTURAL REVIEWS & GLOBAL PROJECT ENDORSEMENTS */}
      <ReviewsSection
        onOpenProduct={onOpenProduct}
        onVisualizeTile={onVisualizeTile}
        onOpenRfq={onOpenRfq}
        onSendWhatsApp={onSendWhatsApp}
      />

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            Technical & Procurement FAQ
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Direct clarity on tile dimensions, container calculations, export documentation, and sample deliveries.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl bg-[#0F1424] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-[#D4AF37]/50 shadow-lg shadow-[#D4AF37]/5'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury">{faq.q}</span>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'bg-[#D4AF37]/20 text-[#D4AF37]' : 'bg-slate-800 text-slate-400'}`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CONVERSION BANNER & ONE-CLICK WHATSAPP RFQ */}
      <section className="rounded-3xl bg-gradient-to-br from-[#121829] via-[#0F1424] to-[#0A0E18] border border-[#D4AF37]/40 p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden animated-border-gold">
        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            Direct Manufacturer Procurement
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-white font-bold tracking-tight">
            Begin Your Export Quotation
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Connect directly with our {currentFlag} {currentCountryName} export director. Receive official proforma invoices, FOB/CIF shipping schedules, and certified laboratory test certificates.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenRfq()}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl shimmer-gold-button text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#D4AF37]/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Project RFQ</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSendWhatsApp()}
              className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Share2 className="w-4 h-4" />
              <span>Connect via WhatsApp</span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
};
