/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TILE_PRODUCTS } from './data/products';
import { COUNTRY_CONTACTS, COMPANY_INFO } from './data/companyConfig';
import { TileProduct, CountryContact } from './types';
import { buildWhatsAppRfqUrl } from './utils/whatsapp';

// Layout Components
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar, NavigationTab } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { StickyWhatsApp } from './components/layout/StickyWhatsApp';

// View Components
import { HomeView } from './components/home/HomeView';
import { ProductCatalogue } from './components/catalogue/ProductCatalogue';
import { RoomVisualizer } from './components/3d/RoomVisualizer';
import { ContainerCalculator } from './components/calculator/ContainerCalculator';
import { TileQuantityCalculator } from './components/calculator/TileQuantityCalculator';
import { ApplicationsView } from './components/views/ApplicationsView';
import { ExportLogisticsView } from './components/views/ExportLogisticsView';
import { AboutQualityView } from './components/views/AboutQualityView';

// Modals
import { ProductModal } from './components/catalogue/ProductModal';
import { RfqModal } from './components/rfq/RfqModal';
import { CountrySelectorModal } from './components/common/CountrySelectorModal';
import { LegalModal } from './components/common/LegalModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Country Configuration State (Defaults to USA architectural accounts, easily switched)
  const [currentCountry, setCurrentCountry] = useState<CountryContact>(COUNTRY_CONTACTS[0]);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);

  // RFQ Modal State
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState<TileProduct | null>(null);
  const [rfqNotes, setRfqNotes] = useState<string>('');

  // Product Spec Modal State
  const [activeSpecProduct, setActiveSpecProduct] = useState<TileProduct | null>(null);

  // Legal Modal State ('privacy' | 'terms' | null)
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  // Pre-selected IDs for 3D Visualizer & Calculators
  const [visualizerTileId, setVisualizerTileId] = useState<string>(TILE_PRODUCTS[0].id);
  const [calcSku, setCalcSku] = useState<string>(TILE_PRODUCTS[0].sku);
  const [quantityCalcProductId, setQuantityCalcProductId] = useState<string>(TILE_PRODUCTS[0].id);

  // Handlers
  const handleOpenRfq = (product?: TileProduct, notes?: string) => {
    setRfqProduct(product || null);
    setRfqNotes(notes || '');
    setIsRfqOpen(true);
  };

  const handleSendWhatsApp = (product?: TileProduct, notes?: string) => {
    const targetProduct = product || TILE_PRODUCTS[0];
    const { url } = buildWhatsAppRfqUrl(currentCountry.countryCode, {
      productSku: targetProduct.sku,
      productName: targetProduct.name,
      tileSize: `${targetProduct.lengthMm}x${targetProduct.widthMm}mm`,
      destinationCountry: currentCountry.countryName,
      destinationPort: currentCountry.recommendedPort,
      extraNotes: notes,
    });
    window.open(url, '_blank');
  };

  const handleVisualizeTile = (tileId: string) => {
    setVisualizerTileId(tileId);
    setActiveTab('visualizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculateContainer = (sku: string) => {
    setCalcSku(sku);
    setActiveTab('container-calc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCalculateQuantity = (productId: string) => {
    setQuantityCalcProductId(productId);
    setActiveTab('quantity-calc');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-sans-main selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Top International Announcement Bar */}
      <AnnouncementBar
        onOpenRfq={() => handleOpenRfq()}
        onSelectCountry={() => setIsCountryModalOpen(true)}
        currentCountryName={currentCountry.countryName}
        currentFlag={currentCountry.flag}
      />

      {/* Main Glassmorphic Navigation */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRfq={() => handleOpenRfq()}
        onOpenWhatsApp={() => handleSendWhatsApp()}
        countryName={currentCountry.countryName}
        countryFlag={currentCountry.flag}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenProduct={(p) => setActiveSpecProduct(p)}
            onVisualizeTile={handleVisualizeTile}
            onOpenRfq={handleOpenRfq}
            onSendWhatsApp={handleSendWhatsApp}
            currentCountryName={currentCountry.countryName}
            currentFlag={currentCountry.flag}
          />
        )}

        {activeTab === 'catalogue' && (
          <ProductCatalogue
            onVisualize={handleVisualizeTile}
            onCalculateQuantity={handleCalculateQuantity}
            onCalculateContainer={handleCalculateContainer}
            onOpenRfq={handleOpenRfq}
            onSendWhatsApp={handleSendWhatsApp}
          />
        )}

        {activeTab === 'visualizer' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                WebGL Real-Time Lighting & Surface Shader
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Studio 3D Room Visualizer
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Pair different luxury porcelain slabs across floors and walls. Inspect genuine marble veins, adjust architectural lighting, and capture high-res snapshots.
              </p>
            </div>

            <RoomVisualizer
              initialTileId={visualizerTileId}
              onOpenRfq={handleOpenRfq}
              onSendWhatsApp={handleSendWhatsApp}
            />
          </div>
        )}

        {activeTab === 'container-calc' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Ocean Freight Payload Calculator
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Container Loadability Engine
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Calculate real boxes per pallet, total FCL cargo weight, and limiting constraints (payload capacity vs pallet floor footprint).
              </p>
            </div>

            <ContainerCalculator
              initialSku={calcSku}
              onOpenRfq={handleOpenRfq}
              onSendWhatsApp={handleSendWhatsApp}
            />
          </div>
        )}

        {activeTab === 'quantity-calc' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Area Estimation & Cut Wastage
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Room Tile Quantity Planner
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Enter room dimensions, wall heights, and door/window deductions. Calculate required whole cartons and spare attic stock.
              </p>
            </div>

            <TileQuantityCalculator
              initialProductId={quantityCalcProductId}
              onOpenRfq={handleOpenRfq}
              onSendWhatsApp={handleSendWhatsApp}
            />
          </div>
        )}

        {activeTab === 'applications' && (
          <ApplicationsView
            onVisualizeTile={handleVisualizeTile}
            onOpenProduct={(p) => setActiveSpecProduct(p)}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {activeTab === 'export' && (
          <ExportLogisticsView
            onOpenCalculator={() => {
              setActiveTab('container-calc');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRfq={() => handleOpenRfq()}
            onSelectCountry={() => setIsCountryModalOpen(true)}
            currentCountryName={currentCountry.countryName}
          />
        )}

        {activeTab === 'about' && (
          <AboutQualityView
            onOpenRfq={() => handleOpenRfq()}
            onExploreCatalogue={() => {
              setActiveTab('catalogue');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRfq={() => handleOpenRfq()}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
      />

      {/* Floating Sticky WhatsApp Button */}
      <StickyWhatsApp
        currentContact={currentCountry}
        onOpenWhatsApp={() => handleSendWhatsApp()}
      />

      {/* RFQ Quotation Modal */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        preselectedProduct={rfqProduct}
        initialNotes={rfqNotes}
      />

      {/* Product Spec Sheet Modal */}
      <ProductModal
        product={activeSpecProduct}
        onClose={() => setActiveSpecProduct(null)}
        onVisualize={handleVisualizeTile}
        onCalculateQuantity={handleCalculateQuantity}
        onCalculateContainer={handleCalculateContainer}
        onOpenRfq={(p) => handleOpenRfq(p)}
        onSendWhatsApp={(p) => handleSendWhatsApp(p)}
      />

      {/* Destination Country Switcher Modal */}
      <CountrySelectorModal
        isOpen={isCountryModalOpen}
        onClose={() => setIsCountryModalOpen(false)}
        selectedCountryCode={currentCountry.countryCode}
        onSelectCountry={(c) => setCurrentCountry(c)}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
