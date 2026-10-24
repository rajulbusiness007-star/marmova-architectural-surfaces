/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { COMPANY_INFO, CONTAINER_SPECS, PALLET_SPECS, COUNTRY_CONTACTS } from '../../data/companyConfig';
import {
  Ship,
  Truck,
  Box,
  Layers,
  ShieldCheck,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Globe2,
} from 'lucide-react';

interface ExportLogisticsViewProps {
  onOpenCalculator: () => void;
  onOpenRfq: () => void;
  onSelectCountry: () => void;
  currentCountryName: string;
}

export const ExportLogisticsView: React.FC<ExportLogisticsViewProps> = ({
  onOpenCalculator,
  onOpenRfq,
  onSelectCountry,
  currentCountryName,
}) => {
  const steps = [
    {
      num: '01',
      title: 'Architectural Selection & Samples',
      desc: 'Confirm tile SKUs, surface finishes, and request courier sample pieces delivered via DHL/FedEx within 4-6 business days.',
    },
    {
      num: '02',
      title: 'Proforma Invoice & Incoterms',
      desc: 'Receive transparent FOB Mundra / Pipavav or CIF destination port pricing with exact carton, pallet, and payload weight schedules.',
    },
    {
      num: '03',
      title: 'Production & Single-Lot Caliber Firing',
      desc: 'All tiles fired in single-batch calibrated kilns to ensure uniform tonal shade (tonality lot) and 0.1mm dimensional precision.',
    },
    {
      num: '04',
      title: 'ISPM 15 Fumigated Wooden Packing',
      desc: 'Heavy-duty pine pallets treated to IPPC heat standards, secured with polypropylene cross-straps, edge guards, and waterproof stretch film.',
    },
    {
      num: '05',
      title: 'Container Stuffing & Port Weighbridge',
      desc: 'Expert container stuffing adhering to strict payload distribution guidelines, complete with photo/video loading reports and seal numbers.',
    },
    {
      num: '06',
      title: 'Original Bill of Lading & Sea Transit',
      desc: 'Surrender or Express B/L, Certificate of Origin, Packing List, and Commercial Invoice dispatched for seamless customs clearance.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* View Header */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0F1424] to-[#0A0E18] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Ship className="w-4 h-4" />
            <span>International Sea Freight & Palletizing Protocol</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-bold tracking-tight">
            Global Export & Logistics Architecture
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Delivering full container loads (FCL) of premium vitrified porcelain tiles to premier architectural distributors, contractors, and developers across 45+ international seaports.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onOpenCalculator}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
            >
              <Truck className="w-4 h-4" />
              Launch Container Calculator
            </button>

            <button
              onClick={onOpenRfq}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 transition-colors"
            >
              Request FOB / CIF Quotation
            </button>
          </div>
        </div>
      </div>

      {/* Six Step Export Workflow */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
              End-to-End Supply Chain
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold">
              The 6-Stage Export Journey
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="p-6 rounded-2xl bg-[#0F1424] border border-white/10 hover:border-[#D4AF37]/40 transition-colors space-y-3 relative overflow-hidden group"
            >
              <div className="text-3xl font-extrabold font-mono text-[#D4AF37]/30 group-hover:text-[#D4AF37]/60 transition-colors">
                {st.num}
              </div>
              <h3 className="font-serif-luxury text-lg text-white font-semibold">
                {st.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Container Specifications & Pallet Packaging Standards Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Container Loading Standards (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Truck className="w-4 h-4" />
            <span>Verified Container Standards</span>
          </div>
          <h3 className="font-serif-luxury text-2xl text-white font-bold">
            Standard 20ft vs 40ft High Cube
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Because vitrified porcelain tiles have a high physical density (~2,400 kg/m³), ocean shipments are governed primarily by weight payload caps rather than volumetric space.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">20ft Dry Cargo FCL (Export Preferred)</span>
                <span className="text-[#D4AF37] font-mono">Max 28,000 kg</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Internal dims: 5,898 × 2,352 × 2,393 mm. Accommodates 10-11 heavy Euro pallets or 9-10 Industrial pallets. Minimizes sea-freight deadweight costs.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">40ft High Cube FCL</span>
                <span className="text-slate-300 font-mono">Max 28,600 kg</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Internal dims: 12,032 × 2,352 × 2,698 mm. Ideal for mixed shipments containing lighter ceramic wall tiles, or where destination road laws allow standard tractor gross weights.
              </p>
            </div>
          </div>
        </div>

        {/* Palletizing & Strapping Protocols (6 cols) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-5">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            <Box className="w-4 h-4" />
            <span>Pallet & Safety Standards</span>
          </div>
          <h3 className="font-serif-luxury text-2xl text-white font-bold">
            Zero-Breakage Packaging Protocol
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Every shipment is prepared to survive rough high-seas conditions, container shunting, and multi-modal inland transport.
          </p>

          <div className="space-y-3 pt-2">
            {[
              {
                title: 'ISPM 15 Fumigated Timber',
                desc: 'All wooden pallets undergo certified heat treatment with official IPPC stamps accepted across US, EU, and Australasian customs.',
              },
              {
                title: 'High-Tension Polypropylene Strapping',
                desc: 'Cartons are secured with 4 longitudinal and 2 transverse straps to prevent pallet shift during rough ocean swells.',
              },
              {
                title: 'Thermo-Retractable Shrink Wrapping',
                desc: 'Heavy 120-micron polyethylene hood completely seals against sea spray, humidity, and dust ingress.',
              },
              {
                title: 'Rigid Heavy-Duty Corner Protectors',
                desc: 'L-shaped compressed cardboard angles protect carton edges from fork-tine impacts during stuffing and unstuffing.',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">{item.title}</strong>
                  <span className="text-slate-400 text-[11px]">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transit Times Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
              Sea Route Transit Schedules
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold">
              Port-to-Port Typical Transit Durations
            </h3>
          </div>
          <button
            onClick={onSelectCountry}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
          >
            <span>Change Your Destination ({currentCountryName})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[10px] uppercase font-mono text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Destination Market</th>
                <th className="py-3 px-4">Primary Sea Terminals</th>
                <th className="py-3 px-4">Transit Time (Port-to-Port)</th>
                <th className="py-3 px-4">Assigned Sales Desk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COUNTRY_CONTACTS.filter((c) => c.countryCode !== 'GLOBAL').map((c) => (
                <tr key={c.countryCode} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white flex items-center gap-2">
                    <span className="text-base">{c.flag}</span>
                    <span>{c.countryName}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{c.recommendedPort}</td>
                  <td className="py-3 px-4 font-mono text-[#D4AF37]">{c.typicalTransitDays}</td>
                  <td className="py-3 px-4 text-slate-400">{c.salesRepresentative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
