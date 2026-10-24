/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { COMPANY_INFO } from '../../data/companyConfig';
import {
  ShieldCheck,
  Award,
  Flame,
  CheckCircle2,
  FileText,
  Download,
  Building2,
  Globe2,
  Sparkles,
  Zap,
} from 'lucide-react';

interface AboutQualityViewProps {
  onOpenRfq: () => void;
  onExploreCatalogue: () => void;
}

export const AboutQualityView: React.FC<AboutQualityViewProps> = ({
  onOpenRfq,
  onExploreCatalogue,
}) => {
  const [downloadingCert, setDownloadingCert] = useState(false);

  const technicalParameters = [
    {
      param: 'Water Absorption (E)',
      standard: 'ISO 10545-3 / EN 14411',
      marmovaSpec: '≤ 0.05% (Impervious Group BIa)',
      industryBenchmark: '≤ 0.50% standard porcelain',
      status: 'Surpasses Standard by 10x',
    },
    {
      param: 'Modulus of Rupture (Bending)',
      standard: 'ISO 10545-4',
      marmovaSpec: '≥ 48 N/mm²',
      industryBenchmark: '≥ 35 N/mm²',
      status: 'Commercial Heavy Traffic',
    },
    {
      param: 'Breaking Strength (9mm Slab)',
      standard: 'ISO 10545-4',
      marmovaSpec: '≥ 2,400 N to 3,200 N',
      industryBenchmark: '≥ 1,300 N',
      status: 'Exceeds Architectural Load',
    },
    {
      param: 'Breaking Strength (20mm Paver)',
      standard: 'ISO 10545-4',
      marmovaSpec: '≥ 11,000 N Point Load',
      industryBenchmark: '≥ 8,000 N',
      status: 'Vehicular Driveway Rated',
    },
    {
      param: 'Surface Hardness (Mohs Scale)',
      standard: 'EN 101',
      marmovaSpec: 'Mohs 7 to 8 (Scratch Proof)',
      industryBenchmark: 'Mohs 5 to 6',
      status: 'High Quartz Equivalent',
    },
    {
      param: 'Slip Resistance (PTV / Din)',
      standard: 'DIN 51130 / BS 7976-2',
      marmovaSpec: 'R9 (Polished), R10 (Matte), R11 (20mm Paver)',
      industryBenchmark: 'Varies by finish',
      status: 'Wet & Dry Certified',
    },
    {
      param: 'Frost & Thermal Shock Resistance',
      standard: 'ISO 10545-9 / 12',
      marmovaSpec: '100 Freeze-Thaw Cycles: No Damage',
      industryBenchmark: 'Required for exterior',
      status: '100% Frost Proof',
    },
    {
      param: 'Chemical & Stain Resistance',
      standard: 'ISO 10545-13 / 14',
      marmovaSpec: 'Class GA / Class 5 (Zero Stain)',
      industryBenchmark: 'Class GB / Class 3',
      status: 'Impervious to Household Acids',
    },
  ];

  const handleDownloadDossier = () => {
    setDownloadingCert(true);
    const textContent = `
=============================================================================
MARMOVA ARCHITECTURAL SURFACES — QUALITY & COMPLIANCE DOSSIER
=============================================================================
MANUFACTURER: ${COMPANY_INFO.legalName}
LOCATION: ${COMPANY_INFO.plantLocation}
PRIMARY SEAPORT: ${COMPANY_INFO.exportPortOfLoading}
ACCREDITATION: ISO 9001:2015 | ISO 14001:2015 | CE EN 14411 (Group BIa)

MANUFACTURING INFRASTRUCTURE:
1. Hydraulic Compaction: Continuous hydraulic roller pressing generating 7,500 tonnes of uniform force.
2. Sintering Protocol: 1220°C multi-zone roller hearth kiln cycles over 72 minutes.
3. Optical Glazing: High-definition 400 DPI digital inkjet printing with continuous through-body vein alignment.
4. Laser Sizing: Rectification machines calibrate tile edges to ±0.1mm tolerance.

TECHNICAL PERFORMANCE DATA (ISO 10545):
- Water Absorption: < 0.05% (Impervious Group BIa)
- Modulus of Rupture: >= 48 N/mm²
- Surface Hardness: Mohs 7-8
- Thermal Expansion Coefficient: < 7.0 x 10^-6 K^-1
- Deep Abrasion Resistance: < 140 mm³ volume loss
- Non-Combustible: Euroclass A1FL fire rating

ENVIRONMENTAL & LEED CREDITS:
- Zero volatile organic compounds (VOC) emissions.
- Recycled water recovery systems reuse 98% of industrial wastewater.
- Contributes toward LEED v4 Materials and Resources (MR) credits.

EXPORT DESK INQUIRY: export@marmovasurfaces.com | +91 2822 295 800
=============================================================================
    `.trim();

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MARMOVA-Quality-Compliance-Dossier.txt';
    link.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadingCert(false), 2000);
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#0F1424] to-[#0A0E18] border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <ShieldCheck className="w-4 h-4" />
            <span>Manufacturing Engineering & Quality Assurance</span>
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl text-white font-bold tracking-tight">
            Precision Sintered Architecture
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every MARMOVA porcelain slab is born from ultra-refined Italian kaolin clays, quartz minerals, and feldspars, vitrified at 1,220°C to achieve near-zero porosity and lifelong dimensional stability.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={handleDownloadDossier}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20"
            >
              <Download className="w-4 h-4" />
              {downloadingCert ? 'Downloading Dossier...' : 'Download Quality Dossier (.TXT)'}
            </button>

            <button
              onClick={onOpenRfq}
              className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-white/10 transition-colors"
            >
              Request Certified Test Reports
            </button>
          </div>
        </div>
      </div>

      {/* Manufacturing Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-white font-bold">
            7,500-Tonne Compaction
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Continuous hydraulic pressing eliminates micro-voids, delivering a dense, homogeneous structure that resists heavy impacts, structural point loads, and edge chipping.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <Flame className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-white font-bold">
            1,220°C Sintered Vitrification
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Fired in computer-monitored 180-meter kilns where minerals fuse into an impervious glass-like matrix with water absorption below 0.05% (Group BIa).
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-serif-luxury text-xl text-white font-bold">
            Laser Rectification (±0.1mm)
          </h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Diamond squaring machines laser-cut all 4 edges to perfect 90° orthogonality, allowing architects to specify razor-thin 1.0mm to 1.5mm grout joints.
          </p>
        </div>
      </div>

      {/* Technical Standards Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0F1424] border border-white/10 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
            Verified Laboratory Metrics
          </span>
          <h2 className="font-serif-luxury text-2xl text-white font-bold mt-1">
            ISO 10545 Physical & Chemical Properties
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Conducted by accredited testing laboratories in compliance with European Standard EN 14411 Annex G (Group BIa).
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-[10px] uppercase font-mono text-slate-400 border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Technical Property</th>
                <th className="py-3 px-4">Test Standard</th>
                <th className="py-3 px-4">MARMOVA Specification</th>
                <th className="py-3 px-4">Standard Industry Minimum</th>
                <th className="py-3 px-4">Compliance Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {technicalParameters.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">{item.param}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{item.standard}</td>
                  <td className="py-3 px-4 font-semibold text-[#D4AF37]">{item.marmovaSpec}</td>
                  <td className="py-3 px-4 text-slate-400">{item.industryBenchmark}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sustainable Manufacturing Callout */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0F1424] to-slate-900 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <Globe2 className="w-4 h-4" />
            <span>Sustainable Ceramic Engineering</span>
          </div>
          <h3 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold">
            Green Building Council LEED v4 Contributor
          </h3>
          <p className="text-slate-400 text-xs max-w-xl leading-relaxed">
            Our Morbi manufacturing facility recycles 98% of process wastewater and incorporates clean natural gas co-generation, eliminating harmful lead or cadmium glazes.
          </p>
        </div>

        <button
          onClick={onExploreCatalogue}
          className="py-3 px-6 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs uppercase tracking-wider shrink-0 transition-colors"
        >
          Explore Collections
        </button>
      </div>
    </div>
  );
};
