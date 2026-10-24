/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TILE_PRODUCTS } from '../../data/products';
import { TileProduct } from '../../types';
import {
  Compass,
  ArrowRight,
  Maximize2,
  Sparkles,
  Layers,
  Building,
  Home,
  Waves,
  Briefcase,
} from 'lucide-react';

interface ApplicationsViewProps {
  onVisualizeTile: (tileId: string) => void;
  onOpenProduct: (product: TileProduct) => void;
  onOpenRfq: (product?: TileProduct) => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  onVisualizeTile,
  onOpenProduct,
  onOpenRfq,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const applicationSpaces = [
    {
      id: 'luxury-villas',
      category: 'residential',
      title: 'Grand Residential Living & Salons',
      subtitle: 'Seamless monolithic floor expanses with minimal 1mm laser-cut joints',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      featuredTileId: 'marmova-statuario-imperial',
      accentTileId: 'marmova-nero-marquina-gold',
      description:
        'Large format 1200×600mm and 1200×1200mm slabs reflect ambient natural illumination across open living plans. Sintered porcelain ensures zero maintenance compared to porous natural marble.',
      specs: ['1200×600mm Statuario Imperial', 'Rectified Laser-Cut Edges', 'Underfloor Heating Safe'],
    },
    {
      id: 'spa-bathrooms',
      category: 'residential',
      title: 'Presidential Spa Bathrooms & En-Suites',
      subtitle: 'Zero water absorption (< 0.05%) for wet rooms, showers, and steam suites',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      featuredTileId: 'marmova-calacatta-oro-extra',
      accentTileId: 'marmova-onice-smeraldo',
      description:
        'Continuous bookmatched porcelain wraps floor-to-ceiling surfaces. Eliminates grout mold vulnerabilities while providing tactile silk matte footing.',
      specs: ['Calacatta Oro Extra', 'Onice Smeraldo Emerald Onyx', 'Stain & Chemical Resistant'],
    },
    {
      id: 'commercial-lobbies',
      category: 'commercial',
      title: '5-Star Hospitality Lobbies & Atriums',
      subtitle: 'Engineered for high-traffic civic and hospitality headquarters (Mohs 7+)',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      featuredTileId: 'marmova-ceppo-di-gre',
      accentTileId: 'marmova-grigio-orobico',
      description:
        'Ceppo Di Gré terrazzo and Alpine Grigio Orobico withstand millions of footfalls annually. Fully compliant with European CE EN 14411 heavy commercial ratings.',
      specs: ['3100N Breaking Strength', 'Class GA Chemical Resistance', 'Heavy Foot Traffic Rated'],
    },
    {
      id: 'outdoor-terraces',
      category: 'outdoor',
      title: '20mm Monolithic Outdoor Terraces & Pools',
      subtitle: 'Unrivaled R11 wet slip resistance and 11,000N point load tolerance',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      featuredTileId: 'marmova-pietra-piasentina-outdoor',
      accentTileId: 'marmova-titanium-basalt',
      description:
        'Full-body 20mm thick pavers installed on dry gravel, pedestals, or vehicular mortars. Immune to salt-water pool splashing, sub-zero frost cycles, and UV fading.',
      specs: ['20mm Solid Porcelain Body', 'R11 Anti-Slip Wet Pendulum', 'Thermal Shock Immune'],
    },
    {
      id: 'architectural-facades',
      category: 'commercial',
      title: 'Ventilated Exterior Curtain Facades',
      subtitle: 'Ultra-lightweight porcelain envelope shielding buildings against extreme climates',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      featuredTileId: 'marmova-titanium-basalt',
      accentTileId: 'marmova-travertino-romano',
      description:
        'Precision clip-fixed facade panels that reduce HVAC solar heat loads. Acid rain and smog impervious with lifelong colorfast integrity.',
      specs: ['LEED v4 Facade Contributor', 'Class A1 Fireproof Non-Combustible', 'Laser Calibrated Caliber'],
    },
  ];

  const filteredSpaces =
    activeCategory === 'all'
      ? applicationSpaces
      : applicationSpaces.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* View Header */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0F1424] to-[#0A0E18] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Layers className="w-4 h-4" />
            <span>Architectural Portfolio & Interior Inspiration</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-bold tracking-tight">
            Designed for Monumental Spaces
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From private seaside estates to premier luxury hotel developments, MARMOVA architectural surfaces unite timeless mineral aesthetics with aerospace-grade sintered density.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Applications' },
              { id: 'residential', label: 'Luxury Residences' },
              { id: 'commercial', label: 'Commercial & Hotels' },
              { id: 'outdoor', label: '20mm Outdoor Terraces' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`py-2 px-4 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === tab.id
                    ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/20'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Cards List */}
      <div className="space-y-12">
        {filteredSpaces.map((space, index) => {
          const featuredTile = TILE_PRODUCTS.find((p) => p.id === space.featuredTileId);
          const isEven = index % 2 === 0;

          return (
            <div
              key={space.id}
              className="rounded-3xl bg-[#0F1424] border border-white/10 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              {/* Media Image (7 cols) */}
              <div
                className={`lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1424] via-black/20 to-transparent" />

                {/* Hotspot Floating Pill */}
                {featuredTile && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="glass-panel p-4 rounded-2xl flex items-center justify-between gap-4 backdrop-blur-md">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block">
                          Featured Surface Specification
                        </span>
                        <div className="text-white font-medium text-sm">{featuredTile.name}</div>
                        <div className="text-xs text-slate-400">
                          {featuredTile.lengthMm}×{featuredTile.widthMm}mm · {featuredTile.finish}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onVisualizeTile(featuredTile.id)}
                          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-white/10 flex items-center gap-1.5 transition-colors"
                          title="Preview in 3D"
                        >
                          <Compass className="w-4 h-4 text-[#D4AF37]" />
                          <span className="hidden sm:inline">3D View</span>
                        </button>

                        <button
                          onClick={() => onOpenProduct(featuredTile)}
                          className="py-2.5 px-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C07B] text-slate-950 font-bold text-xs transition-colors"
                        >
                          Specs
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Description & Engineering Criteria (5 cols) */}
              <div
                className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
                    {space.subtitle}
                  </span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold leading-tight">
                    {space.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {space.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    {space.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-3">
                  {featuredTile && (
                    <button
                      onClick={() => onOpenRfq(featuredTile)}
                      className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Request Scope Quote
                    </button>
                  )}

                  {featuredTile && (
                    <button
                      onClick={() => onVisualizeTile(featuredTile.id)}
                      className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium flex items-center gap-2 transition-colors"
                    >
                      <Compass className="w-4 h-4 text-[#D4AF37]" />
                      Open 3D Visualizer
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
