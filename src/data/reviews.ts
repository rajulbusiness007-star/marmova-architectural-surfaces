/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ReviewMarket = 'all' | 'gcc' | 'europe' | 'americas' | 'asia-pacific';

export interface ArchitecturalReview {
  id: string;
  clientName: string;
  initials: string;
  role: string;
  company: string;
  projectTitle: string;
  projectCategory: 'Luxury Villa' | 'Commercial Facade' | 'Hospitality Resort' | 'Distributorship' | 'Corporate Tower';
  location: string;
  flag: string;
  market: ReviewMarket;
  rating: number;
  quote: string;
  fullReview: string;
  deliveredVolume: string;
  destinationPort: string;
  loadingPort: string;
  completionYear: string;
  productSlabId: string;
  productSlabName: string;
  productSlabFormat: string;
  productSlabFinish: string;
  isoStandardVerified: boolean;
  testedMetrics: string[];
}

export interface ExportTrustStat {
  stat: string;
  label: string;
  detail: string;
  badge: string;
}

export const GLOBAL_EXPORT_STATS: ExportTrustStat[] = [
  {
    stat: '99.8%',
    label: 'On-Time Container Dispatch',
    detail: 'Mundra & Pipavav deepwater ports',
    badge: 'Logistics Verified',
  },
  {
    stat: '0.02%',
    label: 'In-Transit Breakage Rate',
    detail: 'Heavy-duty steel-banded timber crates',
    badge: 'Transit Guaranteed',
  },
  {
    stat: '45+',
    label: 'Export Destinations',
    detail: 'GCC, UK, EU, North America, APAC',
    badge: 'Global Footprint',
  },
  {
    stat: '100%',
    label: 'ISO 10545 Lab Compliant',
    detail: 'Batch test certificate per container',
    badge: 'Group BIa Impervious',
  },
];

export const ARCHITECTURAL_REVIEWS: ArchitecturalReview[] = [
  {
    id: 'rev-dubai-palm-mansions',
    clientName: 'Tariq Al-Mansoor',
    initials: 'TA',
    role: 'Principal Facade & Interior Architect',
    company: 'Al-Mansoor Design Studio & Luxury Developments',
    projectTitle: 'Palm Jumeirah Private Beachfront Mansions',
    projectCategory: 'Luxury Villa',
    location: 'Dubai, United Arab Emirates',
    flag: '🇦🇪',
    market: 'gcc',
    rating: 5,
    quote: 'Marmova\'s continuous bookmatched vein precision exceeded our Italian slab benchmarks. Zero transit breakage across 18 containers into Jebel Ali.',
    fullReview: 'Specifying large-format porcelain slabs for ultra-luxury beachfront villas on the Palm Jumeirah leaves zero margin for dimensional variance or warpage. Marmova delivered 1200x1200mm and sintered bookmatched slabs with absolute vein continuity. The optical clarity of the silk matte finish under harsh desert sunlight is exceptional, and their heavy-duty fumigated wooden crates ensured zero in-transit chips across 18 forty-foot containers.',
    deliveredVolume: '18 FCL (40ft HC Containers)',
    destinationPort: 'Port of Jebel Ali, Dubai',
    loadingPort: 'Mundra Port, India',
    completionYear: '2025',
    productSlabId: 'marmova-calacatta-oro-extra',
    productSlabName: 'Calacatta Oro Silk Slabs',
    productSlabFormat: '1200 x 1200 x 9 mm',
    productSlabFinish: 'Silk Matte',
    isoStandardVerified: true,
    testedMetrics: ['Water Absorption < 0.05%', 'Stain Resistance Class 5', 'Laser Rectified ±0.1%'],
  },
  {
    id: 'rev-london-canary-wharf',
    clientName: 'Arthur Kensington, RIBA',
    initials: 'AK',
    role: 'Technical Procurement Director',
    company: 'Kensington & Partners Architects',
    projectTitle: 'Canary Wharf Financial Atrium & Executive Suites',
    projectCategory: 'Corporate Tower',
    location: 'London, United Kingdom',
    flag: '🇬🇧',
    market: 'europe',
    rating: 5,
    quote: 'Sub-0.05% water absorption tested in UK labs with certified R10 slip rating. The cleanest laser-rectified edges we have inspected.',
    fullReview: 'For a high-footfall commercial headquarters in Canary Wharf, pendulum slip resistance (PTV 36+) and chemical stain resistance were statutory procurement prerequisites. Marmova provided certified UKAS-traceable ISO 10545 test reports prior to container dispatch from Mundra. The laser-rectified Statuario Imperial slabs laid with 1mm hairline joints seamlessly across 4,200 sq.m.',
    deliveredVolume: '9 FCL (20ft Heavy Containers)',
    destinationPort: 'Port of Felixstowe, UK',
    loadingPort: 'Mundra Port, India',
    completionYear: '2025',
    productSlabId: 'marmova-statuario-imperial',
    productSlabName: 'Statuario Imperial Polished',
    productSlabFormat: '1200 x 600 x 9 mm',
    productSlabFinish: 'High Gloss Polished',
    isoStandardVerified: true,
    testedMetrics: ['Breaking Strength 2,400 N', 'Mohs Hardness 7', 'PTV 36+ Wet Slip'],
  },
  {
    id: 'rev-ny-manhattan-penthouse',
    clientName: 'Elena Rostova',
    initials: 'ER',
    role: 'VP of Material Sourcing & Architecture',
    company: 'Apex Architectural Surfaces & Distributorship',
    projectTitle: 'Manhattan Penthouse Collection & Hudson Yards',
    projectCategory: 'Distributorship',
    location: 'New York, United States',
    flag: '🇺🇸',
    market: 'americas',
    rating: 5,
    quote: 'Unrivaled pallet packaging and direct container FOB pricing. Our US fabrication clients prefer Marmova over European quarried stone.',
    fullReview: 'Distributing porcelain slabs into the North American architectural market demands strict axle load optimization and dependable vessel dispatch schedules. Marmova\'s technical team calculated payload distributions perfectly to comply with US DOT 80,000 lbs road freight limits. The gold vein depth on their Nero Marquina slabs is breathtaking and has become our top distributor reorder.',
    deliveredVolume: '24 FCL (40ft HC Containers / Year)',
    destinationPort: 'Port of New York & New Jersey',
    loadingPort: 'Pipavav Port, India',
    completionYear: '2025',
    productSlabId: 'marmova-nero-marquina-gold',
    productSlabName: 'Nero Marquina Gold Vein',
    productSlabFormat: '1200 x 600 x 9 mm',
    productSlabFinish: 'High Gloss Polished',
    isoStandardVerified: true,
    testedMetrics: ['Payload Optimized 21,800 kg', 'DOT Compliant', 'Zero Warpage Calibrated'],
  },
  {
    id: 'rev-riyadh-diplomatic-resort',
    clientName: 'Eng. Fahad Al-Zahrani',
    initials: 'FZ',
    role: 'Senior Project Director',
    company: 'Red Sea Luxury Developments & Hospitality',
    projectTitle: 'Diplomatic Quarter 5-Star Boutique Resort',
    projectCategory: 'Hospitality Resort',
    location: 'Riyadh, Kingdom of Saudi Arabia',
    flag: '🇸🇦',
    market: 'gcc',
    rating: 5,
    quote: 'Thermal shock tested up to 55°C ambient temperatures. The classic Roman vein texture gave our resort monolithic desert permanence.',
    fullReview: 'Extreme temperature swings in the Riyadh plateau degrade lesser vitrified tiles rapidly. Marmova\'s high-density compact sintered slabs exhibited zero micro-fissuring under cyclic thermal testing. Coordinating 32 containers directly with customs clearance and SASO documentation made our project milestones run three weeks ahead of schedule.',
    deliveredVolume: '32 FCL (40ft HC Containers)',
    destinationPort: 'Riyadh Dry Port / Dammam Port',
    loadingPort: 'Mundra Port, India',
    completionYear: '2026',
    productSlabId: 'marmova-travertino-romano',
    productSlabName: 'Travertino Romano Vein Cut',
    productSlabFormat: '1200 x 600 x 9 mm',
    productSlabFinish: 'Carving Matte',
    isoStandardVerified: true,
    testedMetrics: ['SASO Quality Mark Certified', 'Thermal Shock ISO 10545-9 Pass', 'Frost Resistance Pass'],
  },
  {
    id: 'rev-frankfurt-tech-campus',
    clientName: 'Markus Weber, BDA',
    initials: 'MW',
    role: 'Lead Exterior Facade Consultant',
    company: 'BauArt Architectural Engineering GmbH',
    projectTitle: 'Frankfurt High-Tech Campus & Monolithic Plaza',
    projectCategory: 'Commercial Facade',
    location: 'Frankfurt, Germany',
    flag: '🇩🇪',
    market: 'europe',
    rating: 5,
    quote: 'Certified R11 Bushhammered 20mm outdoor monolithic pavers. Surpassed DIN 51130 anti-slip standards with 13,500 N breaking load.',
    fullReview: 'German public plaza and ventilated facade regulations demand stringent frost-thaw resistance down to -25°C and severe static load tolerances. The Pietra Piasentina 20mm monolithic pavers from Marmova passed all MPA Stuttgart mechanical trials effortlessly. The raised pedestal installation showed zero corner deflection.',
    deliveredVolume: '15 FCL (20ft Heavy Containers)',
    destinationPort: 'Port of Hamburg, Germany',
    loadingPort: 'Mundra Port, India',
    completionYear: '2025',
    productSlabId: 'marmova-pietra-piasentina-outdoor',
    productSlabName: 'Pietra Piasentina 20mm Paver',
    productSlabFormat: '600 x 600 x 20 mm',
    productSlabFinish: 'Bushhammered R11',
    isoStandardVerified: true,
    testedMetrics: ['DIN 51130 R11 Anti-Slip', 'Breaking Strength 13,500 N', 'Frost Proof DIN EN ISO 10545-12'],
  },
  {
    id: 'rev-sydney-watsons-bay',
    clientName: 'Chloe Sutherland, AIA',
    initials: 'CS',
    role: 'Design Principal',
    company: 'Sutherland Coastal Architecture & Interiors',
    projectTitle: 'Watsons Bay Oceanfront Residential Sanctuary',
    projectCategory: 'Luxury Villa',
    location: 'Sydney, Australia',
    flag: '🇦🇺',
    market: 'asia-pacific',
    rating: 5,
    quote: 'Salt-mist impervious, UV non-fading surface in harsh coastal exposure. The honed matte tactile feel is pure barefoot luxury.',
    fullReview: 'Cliffside coastal architecture in Sydney exposes exterior and indoor-outdoor transition slabs to aggressive salt-laden winds and high UV radiation. Marmova\'s full-body sintered Grigio Orobico slabs retain rich geological contrast without fading or surface etching. The honed tactile finish feels silky underfoot while maintaining safe slip resistance.',
    deliveredVolume: '8 FCL (20ft Containers)',
    destinationPort: 'Port Botany, Sydney, Australia',
    loadingPort: 'Mundra Port, India',
    completionYear: '2025',
    productSlabId: 'marmova-grigio-orobico',
    productSlabName: 'Grigio Orobico Honed Stone',
    productSlabFormat: '1600 x 800 x 9 mm',
    productSlabFinish: 'Honed & Sawn',
    isoStandardVerified: true,
    testedMetrics: ['AS 4586 Slip Resistance Compliant', 'UV Non-Fading DIN 51094', 'Chemical Resistance Class A'],
  },
];
