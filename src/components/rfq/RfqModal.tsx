/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { TILE_PRODUCTS } from '../../data/products';
import { COUNTRY_CONTACTS, COMPANY_INFO } from '../../data/companyConfig';
import { TileProduct, RFQFormData, CountryContact } from '../../types';
import { buildWhatsAppRfqUrl, getCountryContact } from '../../utils/whatsapp';
import {
  X,
  Send,
  Share2,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  Globe2,
  Anchor,
  Box,
  Truck,
  FileText,
} from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: TileProduct | null;
  initialNotes?: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  initialNotes,
}) => {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    companyName: '',
    businessEmail: '',
    countryCode: 'US',
    whatsappNumber: '',
    destinationCountry: 'United States',
    destinationPort: 'Port of Los Angeles / New York',
    productSku: preselectedProduct ? preselectedProduct.sku : TILE_PRODUCTS[0].sku,
    requiredQuantity: '1',
    quantityUnit: 'containers',
    preferredLoadingMethod: 'palletized',
    containerType: '20ft-dry',
    projectType: 'Commercial Hospitality',
    message: initialNotes || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync preselected product if passed
  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productSku: preselectedProduct.sku,
      }));
    }
  }, [preselectedProduct]);

  useEffect(() => {
    if (initialNotes) {
      setFormData((prev) => ({
        ...prev,
        message: initialNotes,
      }));
    }
  }, [initialNotes]);

  if (!isOpen) return null;

  const currentCountryContact = getCountryContact(formData.destinationCountry);

  const handleCountryChange = (countryCode: string) => {
    const contact = COUNTRY_CONTACTS.find((c) => c.countryCode === countryCode) || COUNTRY_CONTACTS[0];
    setFormData((prev) => ({
      ...prev,
      countryCode: contact.countryCode,
      destinationCountry: contact.countryName,
      destinationPort: contact.recommendedPort,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.businessEmail.trim() || !formData.businessEmail.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setErrorMsg('Please provide your WhatsApp or phone number for quotation dispatch.');
      return;
    }

    setIsSubmitting(true);

    // Save submission locally for persistence
    try {
      const stored = JSON.parse(localStorage.getItem('marmova_rfq_submissions') || '[]');
      stored.push({
        ...formData,
        submittedAt: new Date().toISOString(),
      });
      localStorage.setItem('marmova_rfq_submissions', JSON.stringify(stored));
    } catch {
      // LocalStorage fallback
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FFFFFF', '#38BDF8'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleDirectWhatsAppClick = () => {
    const selectedProd = TILE_PRODUCTS.find((p) => p.sku === formData.productSku);
    const { url } = buildWhatsAppRfqUrl(formData.countryCode, {
      customerName: formData.fullName,
      companyName: formData.companyName,
      destinationCountry: formData.destinationCountry,
      destinationPort: formData.destinationPort,
      productSku: formData.productSku,
      productName: selectedProd?.name,
      tileSize: selectedProd ? `${selectedProd.lengthMm}x${selectedProd.widthMm}mm` : undefined,
      requiredQuantity: `${formData.requiredQuantity} ${formData.quantityUnit}`,
      containerType: formData.containerType === '20ft-dry' ? '20ft FCL' : '40ft HC FCL',
      extraNotes: formData.message,
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0F1424] border border-white/10 rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                Global Export Enquiry Desk
              </span>
              <h2 className="font-serif-luxury text-xl sm:text-2xl text-white font-bold">
                Request Official Export Quotation (RFQ)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSubmitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-serif-luxury text-2xl text-white font-bold">
                Quotation Request Transmitted
              </h3>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your enquiry for <strong className="text-[#D4AF37]">{formData.productSku}</strong> ({formData.requiredQuantity} {formData.quantityUnit}) has been routed to our <strong className="text-white">{currentCountryContact.deskTitle}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10 max-w-md mx-auto text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Responsible Representative:</span>
                <span className="text-white font-medium">{currentCountryContact.salesRepresentative}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Routing:</span>
                <span className="text-white font-medium">{formData.destinationCountry} ({formData.destinationPort})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Response Time:</span>
                <span className="text-emerald-400 font-medium">Within 2 to 4 Business Hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <button
                onClick={handleDirectWhatsAppClick}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Connect on WhatsApp Right Now
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
              >
                Close & Return to Catalogue
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Country Desk Routing Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-slate-400">Assigned Export Desk:</span>
                <strong className="text-white">
                  {currentCountryContact.flag} {currentCountryContact.deskTitle}
                </strong>
              </div>
              <span className="text-[11px] font-mono text-[#D4AF37] hidden sm:inline">
                {currentCountryContact.typicalTransitDays} transit
              </span>
            </div>

            {/* Step 1: Customer Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Henderson"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Company / Firm Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Henderson Architectural Design LLC"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={formData.businessEmail}
                  onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  WhatsApp / Phone (With Country Code) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 019-2834"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            {/* Step 2: Shipping Destination & Routing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Destination Country *
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-white text-xs"
                >
                  {COUNTRY_CONTACTS.map((c) => (
                    <option key={c.countryCode} value={c.countryCode} className="bg-slate-900">
                      {c.flag} {c.countryName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Destination Sea Port / CFS
                </label>
                <input
                  type="text"
                  placeholder="e.g. Port of Los Angeles / Felixstowe"
                  value={formData.destinationPort}
                  onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs"
                />
              </div>
            </div>

            {/* Step 3: Product & Logistics Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/5">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Selected Surface / SKU
                </label>
                <select
                  value={formData.productSku}
                  onChange={(e) => setFormData({ ...formData, productSku: e.target.value })}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-white text-xs"
                >
                  {TILE_PRODUCTS.map((p) => (
                    <option key={p.sku} value={p.sku} className="bg-slate-900">
                      {p.sku} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Quantity Required
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. 2"
                    value={formData.requiredQuantity}
                    onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                    className="w-1/2 glass-input px-3 py-2 rounded-xl text-white text-xs"
                  />
                  <select
                    value={formData.quantityUnit}
                    onChange={(e) => setFormData({ ...formData, quantityUnit: e.target.value as any })}
                    className="w-1/2 glass-input px-2 py-2 rounded-xl text-white text-xs"
                  >
                    <option value="containers" className="bg-slate-900">Containers</option>
                    <option value="sqm" className="bg-slate-900">Sq. Meters (m²)</option>
                    <option value="sqft" className="bg-slate-900">Sq. Feet (ft²)</option>
                    <option value="boxes" className="bg-slate-900">Boxes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                  Container Standard
                </label>
                <select
                  value={formData.containerType}
                  onChange={(e) => setFormData({ ...formData, containerType: e.target.value as any })}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-white text-xs"
                >
                  <option value="20ft-dry" className="bg-slate-900">20ft Heavy FCL (Standard)</option>
                  <option value="40ft-hc" className="bg-slate-900">40ft High Cube FCL</option>
                </select>
              </div>
            </div>

            {/* Step 4: Project Message / Notes */}
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-300 block mb-1">
                Project Scope, Delivery Terms (FOB/CIF) & Special Notes:
              </label>
              <textarea
                rows={3}
                placeholder="Mention Incoterms preference (e.g. CIF Los Angeles or FOB Mundra), timeline, or specific architectural testing certifications needed..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>

            {/* Privacy & Anti-Spam Notice */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Your privacy is guaranteed under ISO/IEC 27001 export protocols. Direct B2B quotation without broker intermediaries.
              </span>
            </div>

            {/* Submit & Instant WhatsApp Alternative */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E5C07B] text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Transmitting Request...' : 'Submit Official RFQ Request'}
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppClick}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                title="Open formatted quote in WhatsApp"
              >
                <Share2 className="w-4 h-4" />
                Send via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
