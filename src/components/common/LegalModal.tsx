/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyConfig';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0F1424] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 text-slate-300 text-xs my-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-[#D4AF37]">
          <ShieldCheck className="w-5 h-5" />
          <span className="font-mono text-xs uppercase tracking-wider">
            {type === 'privacy' ? 'Privacy & Data Protection Notice' : 'International Export Terms & Conditions'}
          </span>
        </div>

        <h2 className="font-serif-luxury text-2xl text-white font-bold">
          {type === 'privacy' ? 'Privacy Policy & Data Security' : 'Commercial Export Terms & Conditions'}
        </h2>

        {type === 'privacy' ? (
          <div className="space-y-4 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p>
              <strong>1. Data Governance:</strong> {COMPANY_INFO.legalName} respects the confidentiality of international architectural practices, tile wholesalers, and contractors. We collect customer names, business emails, project locations, and WhatsApp contacts solely for quoting and logistics coordination.
            </p>
            <p>
              <strong>2. No Intermediary Data Sharing:</strong> Your contact credentials and technical project specifications are never traded or shared with outside commercial brokers.
            </p>
            <p>
              <strong>3. WhatsApp Communication:</strong> When you initiate contact via WhatsApp or our RFQ portal, conversations are handled directly by our designated regional export directors.
            </p>
            <p>
              <strong>4. Cookies & Analytics:</strong> This application utilizes privacy-friendly local storage to preserve your selected tile comparisons and calculator preferences without third-party surveillance cookies.
            </p>
          </div>
        ) : (
          <div className="space-y-4 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <p>
              <strong>1. Incoterms 2020:</strong> Standard export quotations are furnished on FOB (Free on Board, Mundra Port/Pipavav Port, India) or CIF/CFR (Cost, Insurance, and Freight to designated worldwide discharge seaport) bases.
            </p>
            <p>
              <strong>2. Packaging & Fumigation:</strong> All goods are strapped and shrink-wrapped onto heat-treated, ISPM 15 fumigated wooden pallets with corner board protectors.
            </p>
            <p>
              <strong>3. Caliber & Shade Lot Consistency:</strong> Large-format vitrified porcelain tiles are inspected and packed with uniform calibration codes and tone lots. We recommend factoring 5% to 15% cutting wastage per architectural space.
            </p>
            <p>
              <strong>4. Calculations Disclaimer:</strong> Container loadability and quantity estimates provided by our interactive tools are calculated based on standard dry cargo shipping container capacities and road vehicle weight limits. Final billing and bill of lading (B/L) weights conform to certified port weighbridge scales.
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
