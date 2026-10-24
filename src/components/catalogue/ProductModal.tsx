/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TileProduct } from '../../types';
import {
  X,
  Sparkles,
  Share2,
  Box,
  Truck,
  Layers,
  ShieldCheck,
  Download,
  CheckCircle2,
  Maximize2,
  Calculator,
  Compass,
} from 'lucide-react';

interface ProductModalProps {
  product: TileProduct | null;
  onClose: () => void;
  onVisualize: (productId: string) => void;
  onCalculateQuantity: (productId: string) => void;
  onCalculateContainer: (sku: string) => void;
  onOpenRfq: (product: TileProduct) => void;
  onSendWhatsApp: (product: TileProduct) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onVisualize,
  onCalculateQuantity,
  onCalculateContainer,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);

  if (!product) return null;

  const handleDownloadSpecSheet = () => {
    setDownloadingBrochure(true);
    const specSheetText = `
=============================================================================
MARMOVA ARCHITECTURAL SURFACES — ARCHITECTURAL TECHNICAL SPECIFICATION SHEET
=============================================================================
PRODUCT NAME: ${product.name}
SKU CODE: ${product.sku}
COLLECTION: ${product.collection}
MATERIAL CATEGORY: ${product.material}
SURFACE FINISH: ${product.finish}
EDGE RECTIFICATION: ${product.edgeProfile}
COUNTRY OF MANUFACTURE: ${product.origin}

1. PHYSICAL & DIMENSIONAL SPECIFICATIONS
- Nominal Dimensions: ${product.lengthMm} mm (Length) x ${product.widthMm} mm (Width)
- Nominal Thickness: ${product.thicknessMm} mm
- Color Tone & Aesthetic: ${product.colorTone}
- Slip Resistance Rating: ${product.slipRating}
- Water Absorption: ${product.waterAbsorption}
- Breaking Strength: ${product.breakingStrengthN} Newtons (ISO 10545-4)
- Chemical Resistance: Class GA / GLA (ISO 10545-13)
- Frost & Thermal Shock Resistance: Fully Compliant (ISO 10545-9 / 12)

2. CARTON PACKAGING & LOGISTICS
- Tiles Per Carton: ${product.tilesPerBox} pcs
- Surface Area / Carton: ${product.coverageSqMPerBox} sq.m (${product.coverageSqFtPerBox} sq.ft)
- Gross Weight / Carton: ${product.grossWeightKgPerBox} kg
- Net Weight / Carton: ${product.netWeightKgPerBox} kg
- Outer Carton Dimensions: ${product.cartonLengthMm} x ${product.cartonWidthMm} x ${product.cartonHeightMm} mm
- Standard Boxes / Pallet: ${product.standardBoxesPerPallet} cartons

3. RECOMMENDED ARCHITECTURAL APPLICATIONS
${product.applications.map((app) => `- ${app}`).join('\n')}

EXPORT COMPLIANCE & CERTIFICATIONS:
- ISO 9001:2015 | ISO 14001:2015
- CE EN 14411 (Group BIa Vitrified Porcelain)
- Port of Loading: Mundra / Pipavav Seaport, India
- Export Inquiry: export@marmovasurfaces.com | WhatsApp: +91 98765 43210
=============================================================================
    `.trim();

    const blob = new Blob([specSheetText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MARMOVA-SpecSheet-${product.sku}.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingBrochure(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0F1424] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Product Media Image (5 cols) */}
          <div className="md:col-span-5 relative bg-black/40 min-h-[300px] md:min-h-full">
            <img
              src={product.previewImageUrl}
              alt={product.name}
              className="w-full h-full object-cover min-h-[320px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1424] via-transparent to-transparent md:hidden" />
            <div className="absolute top-4 left-4">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-white/10 text-[10px] font-mono uppercase tracking-wider text-[#D4AF37]">
                {product.sku}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 hidden md:block">
              <div className="glass-panel p-3 rounded-xl text-xs text-slate-300">
                <span className="text-white font-medium block">{product.collection}</span>
                <span className="text-[11px] text-slate-400">{product.origin}</span>
              </div>
            </div>
          </div>

          {/* Product Specifications & CTAs (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono uppercase tracking-wider mb-1">
                <span>{product.category}</span>
                <span>·</span>
                <span>{product.edgeProfile}</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-white/5 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Dimensions</span>
                <span className="font-semibold text-white">
                  {product.lengthMm} × {product.widthMm} mm
                </span>
                <span className="text-[10px] text-slate-400 block">Thickness: {product.thicknessMm}mm</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Coverage / Box</span>
                <span className="font-semibold text-[#D4AF37]">
                  {product.coverageSqMPerBox} m²
                </span>
                <span className="text-[10px] text-slate-400 block">{product.coverageSqFtPerBox} sq.ft</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Box Gross Weight</span>
                <span className="font-semibold text-white">
                  {product.grossWeightKgPerBox} kg
                </span>
                <span className="text-[10px] text-slate-400 block">{product.tilesPerBox} tiles/carton</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Surface Finish</span>
                <span className="font-medium text-slate-200">{product.finish}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Water Absorption</span>
                <span className="font-medium text-slate-200">{product.waterAbsorption}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 font-mono uppercase block">Slip Rating</span>
                <span className="font-medium text-slate-200">{product.slipRating}</span>
              </div>
            </div>

            {/* Applications */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                Engineered For Applications:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 border border-white/5 text-xs"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Tool Shortcuts Row */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
              <button
                onClick={() => {
                  onVisualize(product.id);
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-colors flex flex-col items-center text-center gap-1"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>3D Visualizer</span>
              </button>

              <button
                onClick={() => {
                  onCalculateQuantity(product.id);
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-colors flex flex-col items-center text-center gap-1"
              >
                <Calculator className="w-4 h-4 text-[#D4AF37]" />
                <span>Quantity Calc</span>
              </button>

              <button
                onClick={() => {
                  onCalculateContainer(product.sku);
                  onClose();
                }}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-medium transition-colors flex flex-col items-center text-center gap-1"
              >
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Container Load</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenRfq(product);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Request Export Quotation
                </button>

                <button
                  onClick={() => {
                    onSendWhatsApp(product);
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp Sales Desk
                </button>
              </div>

              <button
                onClick={handleDownloadSpecSheet}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                {downloadingBrochure ? 'Preparing Specification Sheet...' : 'Download Technical Spec Sheet (.TXT)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
