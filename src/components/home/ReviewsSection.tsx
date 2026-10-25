/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Star,
  ExternalLink,
  Box,
  Truck,
  Anchor,
  Sparkles,
  Maximize2,
  X,
  FileCheck2,
  MessageSquare,
  Globe2,
  Building2,
  ChevronRight,
  Eye,
} from 'lucide-react';
import {
  ARCHITECTURAL_REVIEWS,
  GLOBAL_EXPORT_STATS,
  ArchitecturalReview,
  ReviewMarket,
} from '../../data/reviews';
import { TILE_PRODUCTS } from '../../data/products';
import { TileProduct } from '../../types';

interface ReviewsSectionProps {
  onOpenProduct: (product: TileProduct) => void;
  onVisualizeTile: (tileId: string) => void;
  onOpenRfq: (product?: TileProduct) => void;
  onSendWhatsApp: (product?: TileProduct) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onOpenProduct,
  onVisualizeTile,
  onOpenRfq,
  onSendWhatsApp,
}) => {
  const [selectedMarket, setSelectedMarket] = useState<ReviewMarket>('all');
  const [activeDossier, setActiveDossier] = useState<ArchitecturalReview | null>(null);

  // Map product ID to actual TileProduct object for reliable inspection & 3D visualization
  const productMap = useMemo(() => {
    const map = new Map<string, TileProduct>();
    TILE_PRODUCTS.forEach((p) => map.set(p.id, p));
    return map;
  }, []);

  const filteredReviews = useMemo(() => {
    if (selectedMarket === 'all') return ARCHITECTURAL_REVIEWS;
    return ARCHITECTURAL_REVIEWS.filter((r) => r.market === selectedMarket);
  }, [selectedMarket]);

  const marketTabs: { id: ReviewMarket; label: string; count: number }[] = [
    { id: 'all', label: 'All Global Markets', count: ARCHITECTURAL_REVIEWS.length },
    {
      id: 'gcc',
      label: 'UAE & Gulf (GCC)',
      count: ARCHITECTURAL_REVIEWS.filter((r) => r.market === 'gcc').length,
    },
    {
      id: 'europe',
      label: 'UK & Europe',
      count: ARCHITECTURAL_REVIEWS.filter((r) => r.market === 'europe').length,
    },
    {
      id: 'americas',
      label: 'North America',
      count: ARCHITECTURAL_REVIEWS.filter((r) => r.market === 'americas').length,
    },
    {
      id: 'asia-pacific',
      label: 'Asia-Pacific',
      count: ARCHITECTURAL_REVIEWS.filter((r) => r.market === 'asia-pacific').length,
    },
  ];

  const handleInspectSlab = (productId: string) => {
    const product = productMap.get(productId);
    if (product) {
      onOpenProduct(product);
    }
  };

  const handleVisualizeSlab = (productId: string) => {
    onVisualizeTile(productId);
  };

  return (
    <section className="space-y-12 py-6 relative" id="reviews-section">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Procurement & Architectural Trust
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl text-white font-bold tracking-tight">
            Architectural Endorsements & Global Projects
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real feedback from commercial developers, facade consultants, and stone distributors across 45+ international export destinations.
          </p>
        </div>

        {/* Global Average Trust Pill */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0F1424] border border-[#D4AF37]/30 shadow-xl self-start md:self-auto">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37]/30 to-[#AA820A]/10 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] font-bold text-lg font-mono">
            5.0
          </div>
          <div>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-white font-semibold mt-0.5">Top-Tier Export Rating</p>
            <p className="text-[11px] text-slate-400">Zero Critical Claims Across 500+ FCL</p>
          </div>
        </div>
      </div>

      {/* 1. TOP GLOBAL EXPORT STATS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {GLOBAL_EXPORT_STATS.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-[#0F1424]/90 border border-white/10 hover:border-[#D4AF37]/40 p-4 sm:p-5 transition-all duration-300 relative overflow-hidden group hover:shadow-lg hover:shadow-[#D4AF37]/5"
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20">
                {stat.badge}
              </span>
              <FileCheck2 className="w-4 h-4 text-slate-500 group-hover:text-[#D4AF37] transition-colors" />
            </div>
            <div className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white group-hover:text-gold-gradient transition-colors">
              {stat.stat}
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">{stat.label}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">{stat.detail}</div>
          </div>
        ))}
      </div>

      {/* 2. REGION FILTER TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {marketTabs.map((tab) => {
          const isActive = selectedMarket === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedMarket(tab.id)}
              className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'text-white bg-slate-900 border border-[#D4AF37]/60 shadow-md shadow-[#D4AF37]/10'
                  : 'text-slate-400 hover:text-white bg-[#0F1424]/60 border border-white/5 hover:border-white/15'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. BENTO REVIEW CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReviews.map((review) => {
            const slabProduct = productMap.get(review.productSlabId);

            return (
              <motion.article
                layout
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-gradient-to-b from-[#111728] to-[#0D1220] border border-white/10 hover:border-[#D4AF37]/50 p-6 sm:p-7 shadow-xl hover:shadow-2xl hover:shadow-[#D4AF37]/5 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden spotlight-card"
              >
                {/* Ambient Top Glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#D4AF37]/10 transition-colors" />

                {/* Card Top: Rating + Destination & FCL Badge */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                      <span className="text-xs font-mono text-slate-300 ml-1.5 font-bold">5.0</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Verified FCL Delivery
                    </div>
                  </div>

                  {/* Destination Port & Cargo Volume Badge */}
                  <div className="p-3 rounded-2xl bg-slate-950/50 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 font-medium">
                        <span className="text-sm">{review.flag}</span>
                        {review.location}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{review.completionYear}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
                      <span className="flex items-center gap-1 font-mono text-slate-300">
                        <Anchor className="w-3 h-3 text-[#D4AF37]" />
                        {review.destinationPort}
                      </span>
                      <span className="font-mono text-[#D4AF37] font-semibold">
                        {review.deliveredVolume}
                      </span>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="space-y-2 pt-1">
                    <p className="text-white text-sm sm:text-base font-serif-luxury font-medium italic leading-relaxed group-hover:text-slate-100 transition-colors">
                      &ldquo;{review.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5">
                        {review.projectTitle}
                      </span>
                      <span className="text-[10px] text-slate-500">•</span>
                      <span className="text-[10px] text-slate-400">{review.projectCategory}</span>
                    </div>
                  </div>
                </div>

                {/* Card Middle: Client Credential */}
                <div className="py-4 my-2 border-y border-white/5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF0BE] p-[1.5px] shrink-0 shadow-md">
                    <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[#D4AF37] font-bold text-xs font-mono">
                      {review.initials}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                      {review.clientName}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate">{review.role}</p>
                    <p className="text-[10px] text-slate-500 font-mono truncate">{review.company}</p>
                  </div>
                </div>

                {/* Card Bottom: Product Slab Link & Actions */}
                <div className="space-y-3">
                  {/* Specified Slab Details */}
                  <div className="p-2.5 rounded-xl bg-[#090D16] border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1 text-[#D4AF37]">
                        <Box className="w-3 h-3 text-[#D4AF37]" />
                        Specified Surface
                      </span>
                      <span className="text-slate-400">{review.productSlabFormat}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {review.productSlabName}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInspectSlab(review.productSlabId)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Inspect technical specs in catalogue"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Inspect Slab</span>
                    </button>

                    <button
                      onClick={() => handleVisualizeSlab(review.productSlabId)}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-[#D4AF37]/20 border border-white/10 hover:border-[#D4AF37]/40 text-slate-200 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Visualize in interactive 3D room"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>3D View</span>
                    </button>
                  </div>

                  {/* Read Dossier Full Button */}
                  <button
                    onClick={() => setActiveDossier(review)}
                    className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] text-slate-300 hover:text-slate-950 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Read Verified Project Dossier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 4. FOOTER TRUST NOTE & INQUIRY PROMPT */}
      <div className="rounded-2xl bg-[#0F1424] border border-[#D4AF37]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            Direct Architectural Project Support
          </div>
          <p className="text-sm text-slate-300">
            Need international reference documentation or verified test reports for your tender?
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenRfq()}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-slate-950 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all cursor-pointer font-serif-luxury"
          >
            Request Project References
          </button>
        </div>
      </div>

      {/* 5. ARCHITECTURAL CASE STUDY DOSSIER MODAL */}
      <AnimatePresence>
        {activeDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl bg-gradient-to-b from-[#121829] to-[#0D1220] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDossier(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 border border-white/10 text-slate-400 hover:text-white hover:border-[#D4AF37] transition-all cursor-pointer z-10"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Dossier Header */}
              <div className="space-y-2 pb-5 border-b border-white/10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-mono">
                  <FileCheck2 className="w-3.5 h-3.5" />
                  Official Project Reference Dossier • {activeDossier.completionYear}
                </div>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-bold">
                  {activeDossier.projectTitle}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>{activeDossier.flag}</span>
                  <span>{activeDossier.location}</span>
                  <span>•</span>
                  <span className="text-slate-400 font-mono">{activeDossier.projectCategory}</span>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto py-5 space-y-6 pr-1">
                {/* Client Quote & Full Testimonial */}
                <div className="space-y-3 bg-[#0A0E18] p-5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#FFF0BE] p-[1.5px]">
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[#D4AF37] font-bold text-xs font-mono">
                        {activeDossier.initials}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{activeDossier.clientName}</div>
                      <div className="text-xs text-slate-400">{activeDossier.role}</div>
                      <div className="text-[11px] text-[#D4AF37] font-mono">{activeDossier.company}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pt-2 border-t border-white/5 font-serif-luxury italic">
                    &ldquo;{activeDossier.fullReview}&rdquo;
                  </p>
                </div>

                {/* Logistics & Shipment Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <Truck className="w-3 h-3 text-[#D4AF37]" />
                      Volume Shipped
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {activeDossier.deliveredVolume}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <Anchor className="w-3 h-3 text-[#D4AF37]" />
                      Destination Port
                    </div>
                    <div className="text-xs font-bold text-white mt-1 truncate">
                      {activeDossier.destinationPort}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/5 col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1">
                      <Globe2 className="w-3 h-3 text-[#D4AF37]" />
                      Loading Port
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {activeDossier.loadingPort}
                    </div>
                  </div>
                </div>

                {/* Lab-Tested Standards Passed */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Technical Test Benchmarks
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeDossier.testedMetrics.map((metric, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specified Surface Card */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="font-mono text-[#D4AF37] uppercase text-[10px]">
                      Specified Porcelain Slab
                    </span>
                    <span className="font-mono text-slate-400">{activeDossier.productSlabFormat}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-base font-bold text-white">
                        {activeDossier.productSlabName}
                      </div>
                      <div className="text-xs text-slate-400">Finish: {activeDossier.productSlabFinish}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          handleInspectSlab(activeDossier.productSlabId);
                          setActiveDossier(null);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-slate-950 transition-all cursor-pointer"
                      >
                        Inspect Product
                      </button>
                      <button
                        onClick={() => {
                          handleVisualizeSlab(activeDossier.productSlabId);
                          setActiveDossier(null);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                      >
                        3D View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dossier Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400 font-mono">
                  ISO 10545 Quality System Certified
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      const product = productMap.get(activeDossier.productSlabId);
                      onSendWhatsApp(product);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Inquire via WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const product = productMap.get(activeDossier.productSlabId);
                      onOpenRfq(product);
                      setActiveDossier(null);
                    }}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-[#D4AF37] to-[#AA820A] text-slate-950 hover:brightness-110 transition-all cursor-pointer font-serif-luxury"
                  >
                    Request Tender Spec
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
