/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { TILE_PRODUCTS } from '../../data/products';
import { TileProduct, TileCategory, SurfaceFinish } from '../../types';
import { ProductModal } from './ProductModal';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  Sparkles,
  Compass,
  Calculator,
  Truck,
  Share2,
  ChevronDown,
  LayoutGrid,
  List,
  Eye,
  Check,
} from 'lucide-react';

interface ProductCatalogueProps {
  onVisualize: (productId: string) => void;
  onCalculateQuantity: (productId: string) => void;
  onCalculateContainer: (sku: string) => void;
  onOpenRfq: (product: TileProduct) => void;
  onSendWhatsApp: (product: TileProduct) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onVisualize,
  onCalculateQuantity,
  onCalculateContainer,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFinish, setSelectedFinish] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedThickness, setSelectedThickness] = useState<string>('All');
  const [selectedSlipRating, setSelectedSlipRating] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'size-desc' | 'weight-desc'>('featured');
  const [viewLayout, setViewLayout] = useState<'grid' | 'compact'>('grid');
  const [activeModalProduct, setActiveModalProduct] = useState<TileProduct | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  const categories: string[] = [
    'All',
    'Marble Look',
    'Porcelain Slabs',
    'Stone Look',
    'Large Format',
    'Wood Look',
    'Outdoor & Pavers',
    'Wall Tiles',
  ];

  const finishes: string[] = [
    'All',
    'High Gloss Polished',
    'Silk Matte',
    'Carving Matte',
    'Honed & Sawn',
    'Velvet Lappato',
    'Bushhammered R11',
    'Natural Wood Grain',
  ];

  const thicknesses: string[] = ['All', '8.5', '9', '9.5', '20'];

  const filteredProducts = useMemo(() => {
    let list = [...TILE_PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.colorTone.toLowerCase().includes(q) ||
          p.applications.some((app) => app.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedFinish !== 'All') {
      list = list.filter((p) => p.finish === selectedFinish);
    }

    if (selectedMaterial !== 'All') {
      list = list.filter((p) => p.material === selectedMaterial);
    }

    if (selectedThickness !== 'All') {
      list = list.filter((p) => p.thicknessMm === parseFloat(selectedThickness));
    }

    if (selectedSlipRating !== 'All') {
      list = list.filter((p) => p.slipRating === selectedSlipRating);
    }

    // Sorting
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'size-desc') {
      list.sort((a, b) => b.lengthMm * b.widthMm - a.lengthMm * a.widthMm);
    } else if (sortBy === 'weight-desc') {
      list.sort((a, b) => b.grossWeightKgPerBox - a.grossWeightKgPerBox);
    } else {
      // featured
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [
    searchQuery,
    selectedCategory,
    selectedFinish,
    selectedMaterial,
    selectedThickness,
    selectedSlipRating,
    sortBy,
  ]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedFinish !== 'All' ||
    selectedMaterial !== 'All' ||
    selectedThickness !== 'All' ||
    selectedSlipRating !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFinish('All');
    setSelectedMaterial('All');
    setSelectedThickness('All');
    setSelectedSlipRating('All');
    setSortBy('featured');
  };

  return (
    <div className="w-full space-y-8">
      {/* Product Detail Modal */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onVisualize={onVisualize}
        onCalculateQuantity={onCalculateQuantity}
        onCalculateContainer={onCalculateContainer}
        onOpenRfq={onOpenRfq}
        onSendWhatsApp={onSendWhatsApp}
      />

      {/* Catalogue Header & Search Bar */}
      <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-[#0F1424] to-[#0A0E18] border border-white/10 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#D4AF37] font-mono uppercase tracking-widest">
              <span>Direct Manufacturer Catalogue</span>
              <span>·</span>
              <span>ISO & CE Certified Slabs</span>
            </div>
            <h2 className="font-serif-luxury text-3xl md:text-4xl text-white font-bold tracking-tight">
              Architectural Vitrified Surfaces
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Engineered large-format porcelain slabs, sintered compact stone, and Mediterranean marble reproductions for international commercial developments and luxury residences.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10">
              <span className="text-[#D4AF37] font-bold">{TILE_PRODUCTS.length}</span> Active Slabs
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10">
              <span className="text-[#D4AF37] font-bold">100%</span> Laser Rectified
            </div>
          </div>
        </div>

        {/* Search & Sort Controls Bar */}
        <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by collection, marble vein, SKU code (e.g. MV-STAT, 1200x600, bathroom)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass-input pl-10 pr-4 py-2.5 rounded-xl text-white text-sm placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="glass-input px-3.5 py-2.5 rounded-xl text-white text-xs font-medium cursor-pointer"
            >
              <option value="featured" className="bg-slate-900">Sort: Featured First</option>
              <option value="size-desc" className="bg-slate-900">Sort: Largest Format</option>
              <option value="weight-desc" className="bg-slate-900">Sort: Heavy Duty / Pavers</option>
              <option value="name" className="bg-slate-900">Sort: Alphabetical (A-Z)</option>
            </select>

            {/* Filter Toggle Mobile/Desktop */}
            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1.5 ${
                showFilterDrawer || hasActiveFilters
                  ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] font-semibold'
                  : 'bg-slate-900 text-slate-300 border-white/10 hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {hasActiveFilters ? '(Active)' : ''}</span>
            </button>

            {/* View Layout Toggle */}
            <div className="hidden sm:flex items-center bg-slate-900 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewLayout('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'grid' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewLayout('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewLayout === 'compact' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
                title="Compact List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Functional Filter Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-slate-950 font-semibold shadow-md shadow-[#D4AF37]/20'
                  : 'bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Collapsible Advanced Filters Drawer */}
        {showFilterDrawer && (
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-slate-950/40 p-4 rounded-xl">
            {/* Surface Finish */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Surface Finish
              </label>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="w-full glass-input px-3 py-1.5 rounded-lg text-white text-xs"
              >
                {finishes.map((f) => (
                  <option key={f} value={f} className="bg-slate-900">
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Thickness */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Thickness (mm)
              </label>
              <select
                value={selectedThickness}
                onChange={(e) => setSelectedThickness(e.target.value)}
                className="w-full glass-input px-3 py-1.5 rounded-lg text-white text-xs"
              >
                {thicknesses.map((t) => (
                  <option key={t} value={t} className="bg-slate-900">
                    {t === 'All' ? 'All Thicknesses' : `${t} mm`}
                  </option>
                ))}
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Body Material
              </label>
              <select
                value={selectedMaterial}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="w-full glass-input px-3 py-1.5 rounded-lg text-white text-xs"
              >
                <option value="All" className="bg-slate-900">All Materials</option>
                <option value="Full-Body Porcelain" className="bg-slate-900">Full-Body Porcelain</option>
                <option value="Glazed Vitrified Porcelain" className="bg-slate-900">Glazed Vitrified</option>
                <option value="Sintered Compact Stone" className="bg-slate-900">Sintered Stone Slabs</option>
                <option value="Glazed Wall Ceramic" className="bg-slate-900">Wall Ceramic</option>
              </select>
            </div>

            {/* Reset Actions */}
            <div className="flex items-end">
              <button
                onClick={resetFilters}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-white/10 transition-colors flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Active Results Count & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-2">
        <div>
          Showing <span className="text-white font-bold">{filteredProducts.length}</span> verified tile collections
          {hasActiveFilters && <span> (filtered)</span>}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>Reset filters</span>
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0F1424] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-[#D4AF37] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-white">No Matching Tile Surfaces Found</h3>
          <p className="text-slate-400 text-xs max-w-md mx-auto">
            We couldn't find any surfaces matching your exact filter criteria. Try clearing search filters or selecting "All".
          </p>
          <button
            onClick={resetFilters}
            className="py-2 px-4 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {filteredProducts.map((tile) => {
            if (viewLayout === 'compact') {
              // Compact Row List View
              return (
                <div
                  key={tile.id}
                  className="p-4 rounded-xl bg-[#0F1424] border border-white/10 hover:border-[#D4AF37]/50 transition-all flex flex-col md:flex-row items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img
                      src={tile.previewImageUrl}
                      alt={tile.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0 cursor-pointer"
                      onClick={() => setActiveModalProduct(tile)}
                    />
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#D4AF37]">
                        <span>{tile.sku}</span>
                        <span>·</span>
                        <span>{tile.finish}</span>
                      </div>
                      <h4
                        onClick={() => setActiveModalProduct(tile)}
                        className="text-white font-serif-luxury text-lg font-semibold hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        {tile.name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {tile.lengthMm}×{tile.widthMm}mm ({tile.thicknessMm}mm) · {tile.coverageSqMPerBox} m²/box · {tile.grossWeightKgPerBox} kg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                    <button
                      onClick={() => onVisualize(tile.id)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-white/10"
                      title="Visualize in 3D"
                    >
                      <Compass className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                    <button
                      onClick={() => onCalculateContainer(tile.sku)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs border border-white/10"
                      title="Calculate Container Load"
                    >
                      <Truck className="w-4 h-4 text-[#D4AF37]" />
                    </button>
                    <button
                      onClick={() => setActiveModalProduct(tile)}
                      className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10"
                    >
                      Specs
                    </button>
                    <button
                      onClick={() => onOpenRfq(tile)}
                      className="px-3.5 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C07B] text-slate-950 font-bold text-xs"
                    >
                      Quote
                    </button>
                  </div>
                </div>
              );
            }

            // High-End Bento Grid Card
            return (
              <div
                key={tile.id}
                className="rounded-2xl bg-[#0F1424] border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-lg hover:shadow-2xl spotlight-card"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden bg-black/60">
                  <img
                    src={tile.previewImageUrl}
                    alt={tile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1424] via-black/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                      {tile.sku}
                    </span>

                    {tile.isFeatured && (
                      <span className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-slate-950 text-[10px] font-bold uppercase tracking-wider shadow">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Quick Action Overlay Icon */}
                  <button
                    onClick={() => setActiveModalProduct(tile)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]"
                  >
                    <span className="px-4 py-2 rounded-xl bg-slate-900/90 text-white text-xs font-medium border border-white/20 flex items-center gap-1.5 shadow-xl">
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      View Technical Specs
                    </span>
                  </button>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      {tile.collection}
                    </span>
                    <h3
                      onClick={() => setActiveModalProduct(tile)}
                      className="font-serif-luxury text-xl text-white font-bold tracking-wide hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      {tile.name}
                    </h3>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-mono block">Size</span>
                        <span className="font-semibold text-white">
                          {tile.lengthMm}×{tile.widthMm} mm
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-mono block">Thickness</span>
                        <span className="font-semibold text-white">{tile.thicknessMm} mm</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-mono block">Finish</span>
                        <span className="text-slate-200 truncate block">{tile.finish}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-mono block">Coverage / Box</span>
                        <span className="text-[#D4AF37] font-semibold">{tile.coverageSqMPerBox} m²</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    {/* Secondary Tools */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onVisualize(tile.id)}
                        className="py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/5 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>3D Preview</span>
                      </button>

                      <button
                        onClick={() => onCalculateContainer(tile.sku)}
                        className="py-1.5 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-white/5 text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Container Calc</span>
                      </button>
                    </div>

                    {/* Primary Quote CTA */}
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onOpenRfq(tile)}
                        className="shimmer-gold-button py-2 px-3 rounded-xl text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md shadow-[#D4AF37]/20 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                        <span>Quote</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => onSendWhatsApp(tile)}
                        className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-sm"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
