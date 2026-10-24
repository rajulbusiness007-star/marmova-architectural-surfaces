/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContainerCalcInput, ContainerCalcResult, TileProduct } from '../types';
import { CONTAINER_SPECS, PALLET_SPECS } from '../data/companyConfig';

/**
 * Calculates genuine container loadability for tile cartons.
 * Avoids simple volume division — tiles are dense and heavy, so cargo weight (payload)
 * or pallet stacking geometry is almost always the active binding constraint.
 */
export function calculateContainerLoadability(
  product: TileProduct,
  input: ContainerCalcInput
): ContainerCalcResult {
  const container = CONTAINER_SPECS[input.containerType] || CONTAINER_SPECS['20ft-dry'];
  const pallet = PALLET_SPECS[input.palletType] || PALLET_SPECS['euro'];
  const maxPayloadKg = input.customMaxPayloadKg && input.customMaxPayloadKg > 0 
    ? input.customMaxPayloadKg 
    : container.maxPayloadKg;

  const warnings: string[] = [];

  let boxesPerLayer = 0;
  let layersPerPallet = 0;
  let calculatedBoxesPerPallet = 0;
  let palletCountInContainer = 0;
  let totalCartons = 0;
  let limitingConstraint: ContainerCalcResult['limitingConstraint'] = 'Payload Cargo Weight';

  const cartonL = product.cartonLengthMm;
  const cartonW = product.cartonWidthMm;
  const cartonH = product.cartonHeightMm;
  const grossBoxKg = product.grossWeightKgPerBox;
  const netBoxKg = product.netWeightKgPerBox;

  if (input.loadingMethod === 'palletized') {
    // 1. Boxes per layer: Calculate how cartons fit on the pallet footprint
    // Option A: cartons aligned length-to-length
    const fitA1 = Math.floor(pallet.lengthMm / cartonL);
    const fitA2 = Math.floor(pallet.widthMm / cartonW);
    const patternA = fitA1 * fitA2;

    // Option B: cartons rotated 90 degrees
    const fitB1 = Math.floor(pallet.lengthMm / cartonW);
    const fitB2 = Math.floor(pallet.widthMm / cartonL);
    const patternB = fitB1 * fitB2;

    boxesPerLayer = Math.max(patternA, patternB);
    if (boxesPerLayer < 1) {
      // Large format slab where carton exceeds pallet dimensions: carton sits flat 1 per layer with slight overhang or custom A-frame
      boxesPerLayer = 1;
    }

    // 2. Permitted layers based on height:
    // Pallet max height constraint e.g. 1100mm minus wooden pallet base height (e.g. 144mm)
    const availableStackHeight = Math.max(200, pallet.maxPalletHeightMm - pallet.heightMm);
    const layersByHeight = Math.floor(availableStackHeight / cartonH);

    // 3. Permitted layers based on pallet weight limit:
    const availableWeightForCartons = Math.max(200, pallet.maxGrossWeightKg - pallet.tareWeightKg);
    const maxBoxesByPalletWeight = Math.floor(availableWeightForCartons / grossBoxKg);
    const layersByWeight = boxesPerLayer > 0 ? Math.floor(maxBoxesByPalletWeight / boxesPerLayer) : 1;

    layersPerPallet = Math.max(1, Math.min(layersByHeight, layersByWeight));

    // If user provided a verified override or catalog has standardBoxesPerPallet
    if (input.boxesPerPalletOverride && input.boxesPerPalletOverride > 0) {
      calculatedBoxesPerPallet = input.boxesPerPalletOverride;
    } else if (product.standardBoxesPerPallet > 0) {
      calculatedBoxesPerPallet = product.standardBoxesPerPallet;
    } else {
      calculatedBoxesPerPallet = boxesPerLayer * layersPerPallet;
    }

    // Weight of one packed pallet
    const singlePalletGrossWeight = pallet.tareWeightKg + (calculatedBoxesPerPallet * grossBoxKg);

    // 4. Pallet capacity inside the container:
    // Standard 20ft container footprint: length 5898mm, width 2352mm
    // Euro pallets (1200x800) in 20ft: standard 11 pallets (or 10 with ease of unloading).
    // Industrial pallets (1200x1000) in 20ft: standard 9 or 10 pallets.
    // 40ft container: 24 Euro pallets or 21 Industrial pallets.
    let maxPalletsByFloor = 0;
    if (input.containerType === '20ft-dry') {
      maxPalletsByFloor = input.palletType === 'euro' ? 11 : 10;
    } else {
      maxPalletsByFloor = input.palletType === 'euro' ? 24 : 21;
    }

    // Pallets limited by total container payload:
    const maxPalletsByContainerWeight = Math.floor(maxPayloadKg / singlePalletGrossWeight);

    if (maxPalletsByContainerWeight < maxPalletsByFloor) {
      palletCountInContainer = maxPalletsByContainerWeight;
      limitingConstraint = 'Payload Cargo Weight';
      warnings.push(`Container is strictly payload weight-limited (${maxPayloadKg.toLocaleString()} kg). Tiles are high-density vitrified porcelain.`);
    } else {
      palletCountInContainer = maxPalletsByFloor;
      limitingConstraint = 'Pallet Floor Footprint';
      warnings.push(`Container floor footprint fully utilized (${palletCountInContainer} pallets). Space remaining in upper volume cannot be loaded due to single-tier pallet safety.`);
    }

    totalCartons = palletCountInContainer * calculatedBoxesPerPallet;

  } else {
    // FLOOR-LOADED (loose manual box stuffing)
    // Common in high-capacity bulk export destinations where port labor manually unloads
    boxesPerLayer = 0;
    layersPerPallet = 0;
    calculatedBoxesPerPallet = 0;
    palletCountInContainer = 0;

    // Weight limit constraint:
    const maxCartonsByWeight = Math.floor(maxPayloadKg / grossBoxKg);

    // Volume & geometric stack height constraint:
    // Safe stack height in container (approx 1800mm to prevent bottom carton crushing)
    const safeStackHeight = Math.min(container.internalHeightMm - 300, 1800);
    const safeVerticalLayers = Math.floor(safeStackHeight / cartonH);
    const fitLengthwise = Math.floor(container.internalLengthMm / cartonL);
    const fitWidthwise = Math.floor(container.internalWidthMm / cartonW);
    const geometricVolumeCapacity = fitLengthwise * fitWidthwise * safeVerticalLayers;

    if (maxCartonsByWeight <= geometricVolumeCapacity) {
      totalCartons = maxCartonsByWeight;
      limitingConstraint = 'Payload Cargo Weight';
      warnings.push(`Floor-loading capacity capped at ${totalCartons.toLocaleString()} cartons to strictly observe road and maritime vessel payload limits.`);
    } else {
      totalCartons = geometricVolumeCapacity;
      limitingConstraint = 'Container Height / Clearance';
      warnings.push(`Cartons capped by safe stacking height (${safeVerticalLayers} tiers) to prevent lower carton edge crushing.`);
    }
  }

  const totalTiles = totalCartons * product.tilesPerBox;
  const totalCoverageSqM = Math.round(totalCartons * product.coverageSqMPerBox * 100) / 100;
  const totalCoverageSqFt = Math.round(totalCoverageSqM * 10.7639 * 10) / 10;
  const netCargoWeightKg = Math.round(totalCartons * netBoxKg);
  const palletTareTotal = input.loadingMethod === 'palletized' ? palletCountInContainer * pallet.tareWeightKg : 0;
  const grossCargoWeightKg = Math.round((totalCartons * grossBoxKg) + palletTareTotal);
  const grossCargoWeightLbs = Math.round(grossCargoWeightKg * 2.20462);

  const payloadUtilizationPercent = Math.min(100, Math.round((grossCargoWeightKg / maxPayloadKg) * 1000) / 10);

  // Volume utilization calculation
  const totalCartonVolCuM = (totalCartons * (cartonL * cartonW * cartonH)) / 1_000_000_000;
  const palletVolCuM = input.loadingMethod === 'palletized' ? (palletCountInContainer * (pallet.lengthMm * pallet.widthMm * pallet.heightMm)) / 1_000_000_000 : 0;
  const totalCargoVolCuM = totalCartonVolCuM + palletVolCuM;
  const volumeUtilizationPercent = Math.min(100, Math.round((totalCargoVolCuM / container.usableVolumeCuM) * 1000) / 10);

  return {
    containerName: container.name,
    loadingMethod: input.loadingMethod,
    boxesPerLayer,
    layersPerPallet,
    calculatedBoxesPerPallet,
    palletCountInContainer,
    totalCartons,
    totalTiles,
    totalCoverageSqM,
    totalCoverageSqFt,
    netCargoWeightKg,
    grossCargoWeightKg,
    grossCargoWeightLbs,
    maxContainerPayloadKg: maxPayloadKg,
    payloadUtilizationPercent,
    volumeUtilizationPercent,
    limitingConstraint,
    warnings,
  };
}
