# MARMOVA Architectural Surfaces — Luxury Vitrified Porcelain & Slabs Exporter

> A premier, production-grade international tile manufacturer and exporter website featuring luxury dark-mode aesthetics, editorial typography, an interactive WebGL Three.js 3D Room Visualizer, strict physics-based Container Loadability Calculator, Room Quantity & Wastage Planner, and 1-Click Country-Routed WhatsApp RFQ Conversion.

---

## 1. What Has Been Built

- **Visual Brand & Theme**: Dark luxury editorial interface (`#090D16` Obsidian Navy, Champagne Gold `#D4AF37`, Frosted Glass panels, and Cinzel / Plus Jakarta Sans typography) designed according to strict anti-slop principles.
- **Interactive 3D Room Visualizer (WebGL / Three.js)**:
  - 5 realistic room presets: Executive Villa Living Lounge, Presidential Spa Bathroom, 5-Star Hotel Lobby, Kitchen Island Suite, and Master Bedroom Retreat.
  - Interactive orbital camera rotation, zoom, auto-orbit, and camera angle reset.
  - Independent surface selection for floors and walls.
  - Realistic procedural shader textures reflecting true tile dimensions, veining, reflections, and grout colors (Charcoal, Platinum, Alabaster, Sand) with adjustable grout width (1mm to 5mm).
  - High-definition snapshot download (`.PNG`) and 1-click export to WhatsApp / RFQ.
  - Lightweight 2D photo-comparison fallback toggle.
- **Container Loadability Calculator (20ft Dry FCL & 40ft High Cube)**:
  - **No volume-only fake math**: strictly calculates payload weight limits (heavy tile density ~2,400 kg/m³), pallet stacking tiers, carton orientations, and floor footprints.
  - Supports Euro Pallets (1200×800mm) and Industrial Pallets (1200×1000mm), as well as loose floor-loaded manual stuffing.
  - Active limiting constraint badge (*Payload Cargo Weight* vs *Pallet Floor Footprint* vs *Stack Height*).
  - Real-time visual capacity bar, metric/imperial units toggle, 1-click WhatsApp quote generator, and text manifest download.
- **Tile Quantity & Wastage Calculator**:
  - Calculates net floor area and wall heights with door/window subtractions.
  - Dynamic wastage slider (5% to 25%) with layout guidance (straight lay, brick-bond, diagonal/herringbone).
  - Rounds up to complete cartons, calculates attic reserve spare area, tile count, and gross shipping weight.
- **Product Catalogue & Specification Sheets**:
  - Full search by name, SKU code, collection, or application.
  - Multi-filtering by Category, Surface Finish, Body Material, Thickness (8.5mm to 20mm), and Slip Rating (R9 to R11).
  - Detailed product spec modal with downloadable ISO 10545 Technical Data Sheet (`.TXT`).
- **One-Click WhatsApp RFQ with Country Routing**:
  - Dynamic routing to designated regional export directors (United States, United Kingdom, Australia, UAE & GCC, India, Saudi Arabia, Germany, Canada, and Global Export Desk).
  - URL-encoded, professional pre-filled RFQ message with selected SKU, required quantity, container specs, and port of destination.
- **Applications & Room Inspiration**:
  - Architectural project showcase featuring interactive hotspot cards linking directly into the 3D visualizer and product specifications.
- **Export & Logistics Guide**:
  - 6-stage export journey from sample dispatch to ISPM 15 fumigation, container stuffing, and sea-transit schedules across 45+ international ports.
- **Quality & Technical Specifications**:
  - Verified ISO 10545 lab properties: Water absorption < 0.05% (Group BIa), 7,500T compaction, 1,220°C sintering, and laser edge rectification (±0.1mm).
- **Interactive FAQ Accordion**:
  - Comprehensive answers to technical, logistics, and container questions.

---

## 2. How the Two Calculators Work

### A. Container Loadability Calculator (`src/utils/containerCalculator.ts`)
1. **Geometric Footprint**: Analyzes carton length and width against the selected pallet standard (Euro 1200×800mm or Industrial 1200×1000mm) using both parallel and rotated orientations to find maximum boxes per layer.
2. **Height & Weight Stack Ceilings**: Calculates allowable layers constrained by:
   - Max allowable pallet height inside container door openings (e.g. 1100mm minus base pallet height).
   - Max gross weight capacity per wooden pallet (e.g. 1,500 kg).
3. **Container Payload Limit**: Calculates total gross weight of cargo (cartons + wooden pallets tare). If gross cargo hits the road/vessel payload limit (e.g. 28,000 kg), the calculator caps the number of pallets and displays an active warning that the container is payload-limited, rather than claiming false upper volume capacity.

### B. Room Tile Quantity Calculator (`src/utils/quantityCalculator.ts`)
1. Multiplies room length and width in meters or feet.
2. If wall tiling is enabled, calculates perimeter × wall height and subtracts door/window deductions.
3. Applies selected wastage allowance (5% to 25%) depending on room shape and laying pattern.
4. Divides gross required area by verified carton coverage (`coverageSqMPerBox`) and **rounds up to whole cartons (`Math.ceil`)**.
5. Computes exact purchased area, surplus/excess attic spare coverage, and approximate shipping weight.

---

## 3. How to Add or Edit Tile Products

All product specifications are centrally defined in **`src/data/products.ts`**.
To add a new tile, append an object adhering to the `TileProduct` interface:

```typescript
{
  id: 'marmova-unique-id',
  sku: 'MV-NEW-1206-GL',
  name: 'New Collection Name',
  collection: 'Prestige Series',
  category: 'Marble Look',
  finish: 'High Gloss Polished',
  material: 'Full-Body Porcelain',
  lengthMm: 1200,
  widthMm: 600,
  thicknessMm: 9,
  tilesPerBox: 2,
  coverageSqMPerBox: 1.44,
  coverageSqFtPerBox: 15.5,
  grossWeightKgPerBox: 29.5,
  netWeightKgPerBox: 28.8,
  cartonLengthMm: 1215,
  cartonWidthMm: 615,
  cartonHeightMm: 24,
  standardBoxesPerPallet: 34,
  slipRating: 'R9',
  waterAbsorption: '< 0.05% (Impervious ISO 13006 Group BIa)',
  breakingStrengthN: 2500,
  colorTone: 'Alabaster White with Slate Veins',
  colorHex: '#F0F0F2',
  accentVeinColor: '#2B303A',
  previewImageUrl: 'https://images.unsplash.com/...',
  texturePattern: 'marble-vein', // 'marble-vein' | 'onyx-cloud' | 'wood-linear' | 'terrazzo-aggregate' | 'slate-cleaved'
  applications: ['Living Rooms & Lounges', 'Luxury Bathrooms'],
  isFeatured: true,
  edgeProfile: 'Rectified Laser-Cut',
  origin: 'Morbi High-Tech Sintering Facility, India',
  description: 'Product narrative and architectural characteristics...',
}
```

Because of the single source of truth, the product automatically appears in the Catalogue, the 3D Visualizer, both Calculators, and the RFQ dropdowns!

---

## 4. How to Configure WhatsApp Contacts for Each Destination

All sales representatives, phone numbers, and destination mappings are located in **`src/data/companyConfig.ts`**:

```typescript
export const COUNTRY_CONTACTS: CountryContact[] = [
  {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    salesRepresentative: 'Marcus Sterling',
    deskTitle: 'North America Architectural Accounts',
    whatsappNumber: '13025550198', // Clean international digits only without '+' or spaces
    displayPhone: '+1 (302) 555-0198',
    email: 'usa.export@marmovasurfaces.com',
    recommendedPort: 'Port of Los Angeles / New York',
    typicalTransitDays: '28 - 35 days',
  },
  // Add additional countries or update numbers here
];
```

If a visitor comes from an unlisted country, the system automatically routes to the configured **`GLOBAL`** export team fallback.

---

## 5. Environment Secrets & Services

This application does not expose client-side API credentials.
For development or optional Gemini integration, reference `.env.example`:
- `GEMINI_API_KEY`: Configured via AI Studio secrets.
- `APP_URL`: Set dynamically at deployment.

---

## 6. How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (port 3000)
npm run dev

# 3. Build for production
npm run build

# 4. Run type check
npm run lint
```

---

## 7. How to Push to GitHub & Deploy on Vercel

```bash
# 1. Initialize Git repository
git init
git add .
git commit -m "feat: complete luxury tile manufacturer & exporter platform"

# 2. Link your remote GitHub repository
git remote add origin https://github.com/your-username/marmova-tile-exporter.git
git branch -M main
git push -u origin main

# 3. Deploy to Vercel
# Option A: Import repo directly in https://vercel.com/dashboard
# Option B: Using Vercel CLI
npm i -g vercel
vercel
```

---

## 8. Verification & Testing Checklist

- [x] **Desktop, Tablet, and Mobile Layouts**: Clean responsive layouts tested with mobile drawer menu.
- [x] **Navigation & CTAs**: All navigation tabs and action buttons work with real handlers.
- [x] **Catalogue Filters & Search**: Search bar, category tabs, finish filters, thickness filters, and sorting verified.
- [x] **3D WebGL Room Visualizer**: Scene initialization, lighting adjustments, orbital controls, snapshot download, and material swaps tested.
- [x] **Container Calculator Math**: Weight-payload caps vs floor footprint limits calculated without fake volume division.
- [x] **Quantity Calculator**: Wastage %, room dimensions, wall area deductions, and box round-up verified.
- [x] **Country-Based WhatsApp Routing**: Formats valid international URLs with encoded messages.
- [x] **RFQ Form & Local Persistence**: Submissions validated, stored to localStorage, and celebrated with confetti.
- [x] **Technical Spec Sheet Downloads**: Generates and downloads `.TXT` specification sheets on demand.
- [x] **Zero Build / Lint Errors**: Passed `compile_applet` and `lint_applet` with `tsc --noEmit`.
