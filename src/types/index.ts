/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TileCategory =
  | 'Porcelain Slabs'
  | 'Marble Look'
  | 'Stone Look'
  | 'Wood Look'
  | 'Large Format'
  | 'Floor Tiles'
  | 'Wall Tiles'
  | 'Outdoor & Pavers'
  | 'Ceramic Glazed';

export type SurfaceFinish =
  | 'High Gloss Polished'
  | 'Silk Matte'
  | 'Carving Matte'
  | 'Honed & Sawn'
  | 'Velvet Lappato'
  | 'Bushhammered R11'
  | 'Natural Wood Grain';

export type TileApplication =
  | 'Living Rooms & Lounges'
  | 'Luxury Bathrooms'
  | 'Chef Kitchens'
  | 'Commercial Lobbies & Hotels'
  | 'Outdoor Terraces & Patios'
  | 'Exterior Facades'
  | 'High Traffic Public Spaces';

export interface TileProduct {
  id: string;
  sku: string;
  name: string;
  collection: string;
  category: TileCategory;
  finish: SurfaceFinish;
  material: 'Full-Body Porcelain' | 'Glazed Vitrified Porcelain' | 'Sintered Compact Stone' | 'Glazed Wall Ceramic';
  lengthMm: number;
  widthMm: number;
  thicknessMm: number;
  tilesPerBox: number;
  coverageSqMPerBox: number;
  coverageSqFtPerBox: number;
  grossWeightKgPerBox: number;
  netWeightKgPerBox: number;
  cartonLengthMm: number;
  cartonWidthMm: number;
  cartonHeightMm: number;
  standardBoxesPerPallet: number;
  slipRating: 'R9' | 'R10' | 'R11 (Outdoor)' | 'PTV 36+' | 'N/A (Wall)';
  waterAbsorption: '< 0.05% (Impervious ISO 13006 Group BIa)' | '< 0.10%' | '< 0.50%' | '< 10% (Wall)';
  breakingStrengthN: number;
  colorTone: string;
  colorHex: string;
  accentVeinColor: string;
  previewImageUrl: string;
  texturePattern: 'marble-vein' | 'onyx-cloud' | 'granite-speckle' | 'wood-linear' | 'terrazzo-aggregate' | 'slate-cleaved';
  applications: TileApplication[];
  isFeatured?: boolean;
  bookmatchedAvailable?: boolean;
  edgeProfile: 'Rectified Laser-Cut' | 'Cushioned Edge';
  origin: string;
  description: string;
}

export type RoomPresetId = 'living-room' | 'luxury-bathroom' | 'hotel-lobby' | 'kitchen-suite' | 'master-bedroom';

export interface RoomPreset {
  id: RoomPresetId;
  name: string;
  subtitle: string;
  cameraPosition: [number, number, number];
  targetPosition: [number, number, number];
  defaultFloorTileId: string;
  defaultWallTileId: string;
  previewImage: string;
}

export type ContainerType = '20ft-dry' | '40ft-hc';
export type LoadingMethod = 'palletized' | 'floor-loaded';

export interface ContainerSpec {
  id: ContainerType;
  name: string;
  internalLengthMm: number;
  internalWidthMm: number;
  internalHeightMm: number;
  doorWidthMm: number;
  doorHeightMm: number;
  maxPayloadKg: number; // e.g. 28,000 kg standard shipping line export limit
  tareWeightKg: number;
  usableVolumeCuM: number;
}

export interface PalletSpec {
  id: string;
  name: string;
  lengthMm: number;
  widthMm: number;
  heightMm: number; // base pallet wooden runner height
  tareWeightKg: number; // wooden pallet weight ~20kg
  maxPalletHeightMm: number; // typical container internal door height constraint e.g. 1500mm or 1800mm
  maxGrossWeightKg: number; // maximum load per pallet e.g. 1500kg
}

export interface ContainerCalcInput {
  selectedSku: string;
  containerType: ContainerType;
  loadingMethod: LoadingMethod;
  customMaxPayloadKg?: number;
  boxesPerPalletOverride?: number;
  palletType: 'euro' | 'industrial';
  isMetric: boolean;
}

export interface ContainerCalcResult {
  containerName: string;
  loadingMethod: LoadingMethod;
  boxesPerLayer: number;
  layersPerPallet: number;
  calculatedBoxesPerPallet: number;
  palletCountInContainer: number;
  totalCartons: number;
  totalTiles: number;
  totalCoverageSqM: number;
  totalCoverageSqFt: number;
  netCargoWeightKg: number;
  grossCargoWeightKg: number;
  grossCargoWeightLbs: number;
  maxContainerPayloadKg: number;
  payloadUtilizationPercent: number;
  volumeUtilizationPercent: number;
  limitingConstraint: 'Payload Cargo Weight' | 'Pallet Floor Footprint' | 'Container Height / Clearance' | 'Pallet Stack Height';
  warnings: string[];
}

export interface QuantityCalcInput {
  roomLength: number;
  roomWidth: number;
  unit: 'meters' | 'feet';
  includeWalls: boolean;
  wallHeight?: number;
  doorWindowDeductionArea?: number;
  wastagePercent: number;
  selectedProductId: string;
}

export interface QuantityCalcResult {
  netFloorAreaSqM: number;
  netWallAreaSqM: number;
  totalNetAreaSqM: number;
  wastageAreaSqM: number;
  grossAreaNeededSqM: number;
  grossAreaNeededSqFt: number;
  boxesRequired: number;
  actualPurchasedAreaSqM: number;
  excessCoverageSqM: number;
  totalTilesRequired: number;
  approxGrossWeightKg: number;
}

export interface CountryContact {
  countryCode: string;
  countryName: string;
  flag: string;
  salesRepresentative: string;
  deskTitle: string;
  whatsappNumber: string; // international digits only, e.g. "919876543210"
  displayPhone: string;
  email: string;
  recommendedPort: string;
  typicalTransitDays: string;
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  businessEmail: string;
  countryCode: string;
  whatsappNumber: string;
  destinationCountry: string;
  destinationPort: string;
  productSku: string;
  requiredQuantity: string;
  quantityUnit: 'sqm' | 'sqft' | 'boxes' | 'containers';
  preferredLoadingMethod: 'palletized' | 'floor-loaded';
  containerType: '20ft-dry' | '40ft-hc';
  projectType: 'Commercial Hospitality' | 'Residential Luxury Villa' | 'Wholesale / Distribution' | 'Architectural Spec';
  message: string;
}
