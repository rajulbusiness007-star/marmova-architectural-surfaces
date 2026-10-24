/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { TILE_PRODUCTS } from '../../data/products';
import { CONTAINER_SPECS, PALLET_SPECS } from '../../data/companyConfig';
import { calculateContainerLoadability } from '../../utils/containerCalculator';
import { ContainerCalcInput, ContainerType, LoadingMethod, TileProduct } from '../../types';
import {
  Boxes,
  Truck,
  Weight,
  Maximize,
  AlertTriangle,
  Download,
  Share2,
  Sparkles,
  Info,
  CheckCircle2,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ContainerCalculatorProps {
  initialSku?: string;
  onOpenRfq?: (product: TileProduct, loadingNotes: string) => void;
  onSendWhatsApp?: (product: TileProduct, loadingNotes: string) => void;
}

export const ContainerCalculator: React.FC<ContainerCalculatorProps> = ({
  initialSku,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const [selectedSku, setSelectedSku] = useState<string>(
    initialSku || TILE_PRODUCTS[0].sku
  );
  const [containerType, setContainerType] = useState<ContainerType>('20ft-dry');
  const [loadingMethod, setLoadingMethod] = useState<LoadingMethod>('palletized');
  const [palletType, setPalletType] = useState<'euro' | 'industrial'>('euro');
  const [customMaxPayloadKg, setCustomMaxPayloadKg] = useState<number>(28000);
  const [boxesPerPalletOverride, setBoxesPerPalletOverride] = useState<number | undefined>(undefined);
  const [isMetric, setIsMetric] = useState<boolean>(true);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const selectedProduct = useMemo(
    () => TILE_PRODUCTS.find((p) => p.sku === selectedSku) || TILE_PRODUCTS[0],
    [selectedSku]
  );

  const calcInput: ContainerCalcInput = useMemo(
    () => ({
      selectedSku,
      containerType,
      loadingMethod,
      customMaxPayloadKg,
      boxesPerPalletOverride,
      palletType,
      isMetric,
    }),
    [selectedSku, containerType, loadingMethod, customMaxPayloadKg, boxesPerPalletOverride, palletType, isMetric]
  );

  const results = useMemo(
    () => calculateContainerLoadability(selectedProduct, calcInput),
    [selectedProduct, calcInput]
  );

  const activePalletSpec = PALLET_SPECS[palletType];
  const activeContainerSpec = CONTAINER_SPECS[containerType];

  // Download Manifest text
  const handleDownloadEstimate = () => {
    const textContent = `
=====================================================
MARMOVA ARCHITECTURAL SURFACES — CONTAINER LOAD ESTIMATE
=====================================================
Generated: ${new Date().toUTCString()}
Product: ${selectedProduct.name}
SKU: ${selectedProduct.sku}
Tile Dimensions: ${selectedProduct.lengthMm} x ${selectedProduct.widthMm} x ${selectedProduct.thicknessMm} mm
Carton Dimensions: ${selectedProduct.cartonLengthMm} x ${selectedProduct.cartonWidthMm} x ${selectedProduct.cartonHeightMm} mm
Gross Weight / Box: ${selectedProduct.grossWeightKgPerBox} kg

CONTAINER CONFIGURATION:
- Container: ${results.containerName}
- Loading Mode: ${results.loadingMethod.toUpperCase()}
- Pallet Standard: ${activePalletSpec.name}
- Max Permissible Payload: ${results.maxContainerPayloadKg.toLocaleString()} kg

CALCULATED LOADABILITY:
- Boxes per Pallet: ${results.calculatedBoxesPerPallet} boxes
- Pallets in Container: ${results.palletCountInContainer} units
- Total Estimated Cartons: ${results.totalCartons.toLocaleString()} boxes
- Total Tiles: ${results.totalTiles.toLocaleString()} pieces
- Total Coverage: ${results.totalCoverageSqM.toLocaleString()} sq.m (${results.totalCoverageSqFt.toLocaleString()} sq.ft)
- Estimated Net Tile Weight: ${results.netCargoWeightKg.toLocaleString()} kg
- Estimated Gross Cargo Weight: ${results.grossCargoWeightKg.toLocaleString()} kg (${results.grossCargoWeightLbs.toLocaleString()} lbs)
- Payload Weight Utilization: ${results.payloadUtilizationPercent}%
- Volume Utilization: ${results.volumeUtilizationPercent}%
- Active Limiting Constraint: ${results.limitingConstraint}

DISCLAIMER:
This load plan is an engineered mathematical estimate. Exact physical loading is subject to road gross vehicle weight regulations in the destination country, maritime vessel limitations, wooden fumigation clearances, and customs clearance protocols.
=====================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MARMOVA-Container-Load-Estimate-${selectedProduct.sku}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const formattedNotes = `Container: ${results.containerName} | Mode: ${results.loadingMethod} | Cartons: ${results.totalCartons} | Coverage: ${results.totalCoverageSqM} m² | Gross Weight: ${results.grossCargoWeightKg} kg | Constraint: ${results.limitingConstraint}`;

  return (
    <div className="w-full bg-[#090D16] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
              International Logistics Engine
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Strict Physics & Payload Constrained</span>
          </div>
          <h3 className="font-serif-luxury text-xl md:text-2xl text-white">
            Container Loadability & FCL Calculator
          </h3>
        </div>

        {/* Metric / Imperial toggle */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setIsMetric(true)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              isMetric ? 'bg-[#D4AF37] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Metric (kg / m²)
          </button>
          <button
            onClick={() => setIsMetric(false)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              !isMetric ? 'bg-[#D4AF37] text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Imperial (lbs / sq.ft)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Input Parameters Column (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-[#0E1322] border-b lg:border-b-0 lg:border-r border-white/10 space-y-6">
          {/* Tile Selection */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2 flex items-center justify-between">
              <span>Select Tile SKU:</span>
              <span className="text-[#D4AF37] lowercase font-normal">{selectedProduct.category}</span>
            </label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-sm focus:ring-1 focus:ring-[#D4AF37]"
            >
              {TILE_PRODUCTS.map((p) => (
                <option key={p.sku} value={p.sku} className="bg-slate-900 text-white">
                  {p.sku} — {p.name} ({p.lengthMm}×{p.widthMm}mm)
                </option>
              ))}
            </select>

            {/* Selected Product Spec Capsule */}
            <div className="mt-3 p-3 rounded-xl bg-slate-900/60 border border-white/5 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Box Weight (Gross)</span>
                <span className="font-semibold text-white">
                  {isMetric
                    ? `${selectedProduct.grossWeightKgPerBox} kg`
                    : `${(selectedProduct.grossWeightKgPerBox * 2.20462).toFixed(1)} lbs`}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Box Coverage</span>
                <span className="font-semibold text-white">
                  {isMetric
                    ? `${selectedProduct.coverageSqMPerBox} m²`
                    : `${selectedProduct.coverageSqFtPerBox} sq.ft`}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Carton Dimensions</span>
                <span className="font-medium text-slate-200">
                  {selectedProduct.cartonLengthMm}×{selectedProduct.cartonWidthMm}×{selectedProduct.cartonHeightMm}mm
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Tiles per Carton</span>
                <span className="font-medium text-slate-200">{selectedProduct.tilesPerBox} pcs</span>
              </div>
            </div>
          </div>

          {/* Container Type */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Container Specification:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setContainerType('20ft-dry')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  containerType === '20ft-dry'
                    ? 'bg-slate-800 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-semibold text-white">20ft Heavy FCL</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Payload up to 28,000 kg</div>
                <div className="text-[10px] text-[#D4AF37] mt-1 font-mono">Standard Export Workhorse</div>
              </button>

              <button
                onClick={() => setContainerType('40ft-hc')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  containerType === '40ft-hc'
                    ? 'bg-slate-800 border-[#D4AF37] ring-1 ring-[#D4AF37]'
                    : 'bg-slate-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="text-xs font-semibold text-white">40ft High Cube FCL</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Volumetric 76.4 m³</div>
                <div className="text-[10px] text-slate-400 mt-1 font-mono">Weight limited ~28.6t</div>
              </button>
            </div>
          </div>

          {/* Loading Method */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-slate-300 block mb-2">
              Loading Arrangement:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setLoadingMethod('palletized')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  loadingMethod === 'palletized'
                    ? 'bg-[#D4AF37] text-slate-950 font-semibold'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                Palletized (Fumigated)
              </button>

              <button
                onClick={() => setLoadingMethod('floor-loaded')}
                className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                  loadingMethod === 'floor-loaded'
                    ? 'bg-[#D4AF37] text-slate-950 font-semibold'
                    : 'bg-slate-900/60 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                Floor-Loaded (Loose Manual)
              </button>
            </div>
          </div>

          {/* Pallet Configuration (if Palletized) */}
          {loadingMethod === 'palletized' && (
            <div className="p-4 rounded-xl bg-slate-900/40 border border-white/5 space-y-3">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                Pallet Standard & Dimensions:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setPalletType('euro')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-colors ${
                    palletType === 'euro'
                      ? 'bg-slate-800 border-[#D4AF37] text-white'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>Euro Standard</div>
                  <div className="text-[10px] text-slate-500">1200 × 800 mm</div>
                </button>

                <button
                  onClick={() => setPalletType('industrial')}
                  className={`py-2 px-2.5 rounded-lg border text-center transition-colors ${
                    palletType === 'industrial'
                      ? 'bg-slate-800 border-[#D4AF37] text-white'
                      : 'border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div>Industrial Standard</div>
                  <div className="text-[10px] text-slate-500">1200 × 1000 mm</div>
                </button>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 flex items-center justify-between mb-1">
                  <span>Cartons per Pallet Override (Optional):</span>
                  <span className="text-[#D4AF37]">
                    Default: {selectedProduct.standardBoxesPerPallet}
                  </span>
                </label>
                <input
                  type="number"
                  placeholder={`Calculated auto: ${selectedProduct.standardBoxesPerPallet}`}
                  value={boxesPerPalletOverride ?? ''}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setBoxesPerPalletOverride(isNaN(val) ? undefined : val);
                  }}
                  className="w-full glass-input px-3 py-1.5 rounded-lg text-white text-xs"
                />
              </div>
            </div>
          )}

          {/* Maximum Permissible Payload Limit */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                Max Allowed Cargo Weight (Payload):
              </label>
              <span className="text-xs font-semibold text-[#D4AF37]">
                {customMaxPayloadKg.toLocaleString()} kg
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="29000"
              step="500"
              value={customMaxPayloadKg}
              onChange={(e) => setCustomMaxPayloadKg(parseInt(e.target.value, 10))}
              className="w-full accent-[#D4AF37] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>20,000 kg (Strict Port Limit)</span>
              <span>28,000 kg (Global Standard)</span>
              <span>29,000 kg (Max)</span>
            </div>
          </div>
        </div>

        {/* Real-Time Calculation Results Dashboard (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-[#090D16] space-y-6 flex flex-col justify-between">
          <div>
            {/* Visual Container Loading Gauge */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Weight className="w-4 h-4 text-[#D4AF37]" />
                  Payload Weight Capacity Utilization
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  {results.payloadUtilizationPercent}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    results.payloadUtilizationPercent > 95
                      ? 'bg-gradient-to-r from-amber-500 to-emerald-400'
                      : 'bg-gradient-to-r from-[#D4AF37] to-amber-400'
                  }`}
                  style={{ width: `${Math.min(100, results.payloadUtilizationPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                <span>
                  Gross Cargo: <strong className="text-white">{results.grossCargoWeightKg.toLocaleString()} kg</strong>
                </span>
                <span>
                  Limit: <strong className="text-slate-300">{results.maxContainerPayloadKg.toLocaleString()} kg</strong>
                </span>
              </div>
            </div>

            {/* Primary KPI Metrics Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Total Cartons
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {results.totalCartons.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">
                  {results.totalTiles.toLocaleString()} individual tiles
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Total Coverage
                </span>
                <div className="text-2xl font-bold font-mono text-[#D4AF37]">
                  {isMetric
                    ? `${results.totalCoverageSqM.toLocaleString()} m²`
                    : `${results.totalCoverageSqFt.toLocaleString()} ft²`}
                </div>
                <span className="text-[11px] text-slate-500">
                  {isMetric
                    ? `${results.totalCoverageSqFt.toLocaleString()} sq.ft equivalent`
                    : `${results.totalCoverageSqM.toLocaleString()} m² equivalent`}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5">
                  Estimated Pallets
                </span>
                <div className="text-2xl font-bold font-mono text-white">
                  {results.loadingMethod === 'palletized' ? results.palletCountInContainer : 'Floor-Loaded'}
                </div>
                <span className="text-[11px] text-slate-500">
                  {results.loadingMethod === 'palletized'
                    ? `${results.calculatedBoxesPerPallet} boxes / pallet`
                    : 'Packed carton-by-carton'}
                </span>
              </div>
            </div>

            {/* Pallet Layer Breakdown (If Palletized) */}
            {results.loadingMethod === 'palletized' && (
              <div className="mt-4 p-4 rounded-xl bg-slate-900/40 border border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Boxes / Layer</span>
                  <span className="font-semibold text-white">{results.boxesPerLayer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Layers / Pallet</span>
                  <span className="font-semibold text-white">{results.layersPerPallet} tiers</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Volume Utilized</span>
                  <span className="font-semibold text-white">{results.volumeUtilizationPercent}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-mono">Limiting Factor</span>
                  <span className="font-semibold text-amber-400 truncate block">
                    {results.limitingConstraint}
                  </span>
                </div>
              </div>
            )}

            {/* Warnings and Realistic Logistics Disclaimers */}
            <div className="mt-4 space-y-2">
              {results.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{warn}</span>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-slate-900/30 border border-white/5 text-[11px] text-slate-400 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Logistics Note:</strong> Actual stuffed cargo is governed by heavy-haul road weight limits in the importing destination (e.g. US 44,000 lbs road limit, EU 24-tonne tractor trailer limit, or Gulf GCC 28-tonne allowance).
                </span>
              </div>
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
                Request Official Loading Plan
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
                Send Results via WhatsApp
              </button>
            </div>

            <button
              onClick={handleDownloadEstimate}
              className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {downloadSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-slate-400" />}
              {downloadSuccess ? 'Estimate Manifest Downloaded' : 'Download Complete Packing & Weight Estimate (.TXT)'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
