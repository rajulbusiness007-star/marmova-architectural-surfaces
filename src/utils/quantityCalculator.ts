/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuantityCalcInput, QuantityCalcResult, TileProduct } from '../types';

/**
 * Calculates required tile boxes, wastage, and excess coverage.
 */
export function calculateTileQuantity(
  product: TileProduct,
  input: QuantityCalcInput
): QuantityCalcResult {
  // Convert inputs to metric (sq meters) for standardized calculation
  let lengthM = input.roomLength;
  let widthM = input.roomWidth;

  if (input.unit === 'feet') {
    lengthM = lengthM * 0.3048;
    widthM = widthM * 0.3048;
  }

  const netFloorAreaSqM = Math.max(0, lengthM * widthM);

  let netWallAreaSqM = 0;
  if (input.includeWalls && input.wallHeight && input.wallHeight > 0) {
    let wallHeightM = input.wallHeight;
    if (input.unit === 'feet') {
      wallHeightM = wallHeightM * 0.3048;
    }
    // Perimeter * wall height
    const perimeterM = 2 * (lengthM + widthM);
    const grossWallAreaM2 = perimeterM * wallHeightM;

    let deductionSqM = 0;
    if (input.doorWindowDeductionArea && input.doorWindowDeductionArea > 0) {
      deductionSqM = input.unit === 'feet'
        ? input.doorWindowDeductionArea * 0.092903
        : input.doorWindowDeductionArea;
    }

    netWallAreaSqM = Math.max(0, grossWallAreaM2 - deductionSqM);
  }

  const totalNetAreaSqM = netFloorAreaSqM + netWallAreaSqM;
  const wastageRatio = Math.max(0, input.wastagePercent) / 100;
  const wastageAreaSqM = totalNetAreaSqM * wastageRatio;
  const grossAreaNeededSqM = totalNetAreaSqM + wastageAreaSqM;
  const grossAreaNeededSqFt = grossAreaNeededSqM * 10.7639;

  // Rounding up to complete cartons
  const coveragePerBox = product.coverageSqMPerBox > 0 ? product.coverageSqMPerBox : 1.44;
  const boxesRequired = Math.ceil(grossAreaNeededSqM / coveragePerBox);

  const actualPurchasedAreaSqM = Math.round(boxesRequired * coveragePerBox * 100) / 100;
  const excessCoverageSqM = Math.max(0, Math.round((actualPurchasedAreaSqM - grossAreaNeededSqM) * 100) / 100);
  const totalTilesRequired = boxesRequired * product.tilesPerBox;
  const approxGrossWeightKg = Math.round(boxesRequired * product.grossWeightKgPerBox);

  return {
    netFloorAreaSqM: Math.round(netFloorAreaSqM * 100) / 100,
    netWallAreaSqM: Math.round(netWallAreaSqM * 100) / 100,
    totalNetAreaSqM: Math.round(totalNetAreaSqM * 100) / 100,
    wastageAreaSqM: Math.round(wastageAreaSqM * 100) / 100,
    grossAreaNeededSqM: Math.round(grossAreaNeededSqM * 100) / 100,
    grossAreaNeededSqFt: Math.round(grossAreaNeededSqFt * 10) / 10,
    boxesRequired,
    actualPurchasedAreaSqM,
    excessCoverageSqM,
    totalTilesRequired,
    approxGrossWeightKg,
  };
}
