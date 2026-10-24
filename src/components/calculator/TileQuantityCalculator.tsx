/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TILE_PRODUCTS } from '../../data/products';
import { calculateTileQuantity } from '../../utils/quantityCalculator';
import { QuantityCalcInput, TileProduct } from '../../types';
import {
  Calculator,
  Square,
  Sparkles,
  Share2,
  Info,
  CheckCircle2,
  Maximize2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface TileQuantityCalculatorProps {
  initialProductId?: string;
  onOpenRfq?: (product: TileProduct, notes: string) => void;
  onSendWhatsApp?: (product: TileProduct, notes: string) => void;
}

export const TileQuantityCalculator: React.FC<TileQuantityCalculatorProps> = ({
  initialProductId,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    initialProductId || TILE_PRODUCTS[0].id
  );
  const [roomLength, setRoomLength] = useState<number>(6.5);
  const [roomWidth, setRoomWidth] = useState<number>(4.2);
  const [unit, setUnit] = useState<'meters' | 'feet'>('meters');
  const [includeWalls, setIncludeWalls] = useState<boolean>(false);
  const [wallHeight, setWallHeight] = useState<number>(2.8);
  const [doorWindowDeductionArea, setDoorWindowDeductionArea] = useState<number>(4.0);
  const [wastagePercent, setWastagePercent] = useState<number>(10);

  const selectedProduct = useMemo(
    () => TILE_PRODUCTS.find((p) => p.id === selectedProductId) || TILE_PRODUCTS[0],
    [selectedProductId]
  );

  const calcInput: QuantityCalcInput = useMemo(
    () => ({
      roomLength,
      roomWidth,
      unit,
      includeWalls,
      wallHeight,
      doorWindowDeductionArea,
      wastagePercent,
      selectedProductId,
    }),
    [roomLength, roomWidth, unit, includeWalls, wallHeight, doorWindowDeductionArea, wastagePercent, selectedProductId]
  );

  const results = useMemo(
    () => calculateTileQuantity(selectedProduct, calcInput),
    [selectedProduct, calcInput]
  );

  const wastageRecommendation = useMemo(() => {
    if (wastagePercent <= 7) return { label: 'Straight Grid Lay', desc: 'Standard rectangular room with minimal cuts.' };
    if (wastagePercent <= 12) return { label: 'Brick Bond / Offset Lay', desc: 'Moderate cutting for staggered joints.' };
    return { label: 'Diagonal / Herringbone / Columns', desc: 'High cut frequency along perimeters and alcoves.' };
  }, [wastagePercent]);

  const formattedNotes = `Room Size: ${roomLength}×${roomWidth} ${unit} | Cartons: ${results.boxesRequired} boxes | Total Area (with ${wastagePercent}% wastage): ${results.grossAreaNeededSqM} m² (${results.grossAreaNeededSqFt} sq.ft) | Excess: ${results.excessCoverageSqM} m²`;

  return (
    <div className="w-full bg-[#090D16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Top Header */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              Architectural Area Planner
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Carton Round-Up & Cut Wastage</span>
          </div>
          <h3 className="font-serif-luxury text-xl md:text-2xl text-white">
            Tile Quantity & Wastage Calculator
          </h3>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setUnit('meters')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              unit === 'meters' ? 'bg-[#D4AF37] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Meters (m)
          </button>
          <button
            onClick={() => setUnit('feet')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              unit === 'feet' ? 'bg-[#D4AF37] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Feet (ft)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Input Parameters (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-[#0E1322] border-b lg:border-b-0 lg:border-r border-white/10 space-y-5">
          {/* Tile Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Select Surface Tile:
            </label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-sm focus:ring-1 focus:ring-[#D4AF37]"
            >
              {TILE_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id} className="bg-slate-900 text-white">
                  {p.name} — {p.lengthMm}×{p.widthMm}mm ({p.coverageSqMPerBox} m²/box)
                </option>
              ))}
            </select>
          </div>

          {/* Floor Dimensions */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Floor Dimensions ({unit}):
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Room Length</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={roomLength}
                  onChange={(e) => setRoomLength(parseFloat(e.target.value) || 0)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Room Width</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(parseFloat(e.target.value) || 0)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-white text-sm"
                />
              </div>
            </div>
          </div>

          {/* Include Walls Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeWalls}
                  onChange={(e) => setIncludeWalls(e.target.checked)}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37] w-4 h-4 bg-slate-800"
                />
                <span>Include Wall Tiling (Continuous Floor-to-Ceiling)</span>
              </label>
            </div>

            {includeWalls && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                    Ceiling / Wall Height ({unit})
                  </span>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    value={wallHeight}
                    onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-white text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">
                    Door & Window Deductions ({unit === 'meters' ? 'm²' : 'sq.ft'})
                  </span>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={doorWindowDeductionArea}
                    onChange={(e) => setDoorWindowDeductionArea(parseFloat(e.target.value) || 0)}
                    className="w-full glass-input px-3 py-2 rounded-xl text-white text-xs"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Wastage Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Cutting & Layout Wastage Allowance:
              </label>
              <span className="text-sm font-bold text-[#D4AF37] font-mono">{wastagePercent}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={wastagePercent}
              onChange={(e) => setWastagePercent(parseInt(e.target.value, 10))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="mt-2 p-2.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs">
              <span className="text-white font-medium block">{wastageRecommendation.label}</span>
              <span className="text-[11px] text-slate-400">{wastageRecommendation.desc}</span>
            </div>
          </div>
        </div>

        {/* Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-[#090D16] space-y-6 flex flex-col justify-between">
          <div>
            {/* Primary Result Headline Box */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#121829] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block mb-1">
                Order Recommendation
              </span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight">
                  {results.boxesRequired}
                </span>
                <span className="text-lg text-slate-300 font-medium">Cartons Required</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Rounded up to whole cartons. Provides {results.actualPurchasedAreaSqM} m² total coverage, including a {wastagePercent}% ({results.wastageAreaSqM} m²) reserve buffer for cuts and future tile spares.
              </p>
            </div>

            {/* Detailed Area Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Net Floor Area
                </span>
                <div className="text-lg font-bold font-mono text-white">
                  {results.netFloorAreaSqM} m²
                </div>
                <span className="text-[10px] text-slate-500">
                  {(results.netFloorAreaSqM * 10.7639).toFixed(1)} sq.ft
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Wastage Buffer
                </span>
                <div className="text-lg font-bold font-mono text-amber-400">
                  +{results.wastageAreaSqM} m²
                </div>
                <span className="text-[10px] text-slate-500">at {wastagePercent}% allowance</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Total Individual Tiles
                </span>
                <div className="text-lg font-bold font-mono text-white">
                  {results.totalTilesRequired} pcs
                </div>
                <span className="text-[10px] text-slate-500">
                  {selectedProduct.tilesPerBox} pcs / box
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Approx. Order Weight
                </span>
                <div className="text-lg font-bold font-mono text-white">
                  {results.approxGrossWeightKg.toLocaleString()} kg
                </div>
                <span className="text-[10px] text-slate-500">
                  {(results.approxGrossWeightKg * 2.20462).toLocaleString(undefined, { maximumFractionDigits: 0 })} lbs
                </span>
              </div>
            </div>

            {/* Excess Coverage & Guidance */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Total Area Purchased:</span>
                <span className="text-white font-medium">{results.actualPurchasedAreaSqM} m²</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Unused / Spare Attic Stock:</span>
                <span className="text-emerald-400 font-medium">+{results.excessCoverageSqM} m²</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-2 border-t border-white/5">
                <strong>Installer Recommendation:</strong> Always retain 1 to 2 unopened spare boxes from the same manufacturing batch (shade and caliber lot) for unforeseen plumbing repairs or future architectural alterations.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => {
                  if (onOpenRfq) {
                    onOpenRfq(selectedProduct, formattedNotes);
                  }
                }}
                className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
              >
                <Sparkles className="w-4 h-4" />
                Add to Export Quotation
              </button>

              <button
                onClick={() => {
                  if (onSendWhatsApp) {
                    onSendWhatsApp(selectedProduct, formattedNotes);
                  }
                }}
                className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Send Calculation via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
