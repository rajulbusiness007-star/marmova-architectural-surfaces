/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COUNTRY_CONTACTS, COMPANY_INFO } from '../data/companyConfig';
import { CountryContact } from '../types';

export interface WhatsAppMessagePayload {
  productSku?: string;
  productName?: string;
  tileSize?: string;
  requiredQuantity?: string;
  destinationCountry?: string;
  destinationPort?: string;
  containerType?: string;
  estimatedCartons?: number | string;
  estimatedCoverage?: string;
  estimatedCargoWeight?: string;
  companyName?: string;
  customerName?: string;
  roomPresetName?: string;
  extraNotes?: string;
}

/**
 * Finds the configured sales representative for a destination country.
 * Defaults cleanly to global export desk if country is unmapped.
 */
export function getCountryContact(countryCodeOrName?: string): CountryContact {
  if (!countryCodeOrName) {
    return COUNTRY_CONTACTS.find((c) => c.countryCode === 'GLOBAL') || COUNTRY_CONTACTS[0];
  }

  const query = countryCodeOrName.trim().toLowerCase();
  const match = COUNTRY_CONTACTS.find(
    (c) =>
      c.countryCode.toLowerCase() === query ||
      c.countryName.toLowerCase().includes(query) ||
      query.includes(c.countryName.toLowerCase())
  );

  return match || COUNTRY_CONTACTS.find((c) => c.countryCode === 'GLOBAL') || COUNTRY_CONTACTS[0];
}

/**
 * Formats a clean international WhatsApp number: strips +, spaces, dashes.
 */
export function sanitizeWhatsAppNumber(num: string): string {
  return num.replace(/[^0-9]/g, '');
}

/**
 * Builds the official URL-encoded WhatsApp click-to-chat link.
 */
export function buildWhatsAppRfqUrl(
  destinationCountryCode: string,
  payload: WhatsAppMessagePayload
): { url: string; contact: CountryContact; rawMessage: string } {
  const contact = getCountryContact(destinationCountryCode);
  const targetNumber = sanitizeWhatsAppNumber(contact.whatsappNumber || COMPANY_INFO.defaultWhatsApp);

  const lines: string[] = [
    'Hello MARMOVA Export Team, I would like to request an official quotation for your architectural vitrified tiles.',
    '',
  ];

  if (payload.customerName) lines.push(`*Customer Name:* ${payload.customerName.trim()}`);
  if (payload.companyName) lines.push(`*Company Name:* ${payload.companyName.trim()}`);
  if (payload.destinationCountry) lines.push(`*Destination Country:* ${payload.destinationCountry.trim()}`);
  if (payload.destinationPort) lines.push(`*Destination Port:* ${payload.destinationPort.trim()}`);
  if (payload.productName || payload.productSku) {
    lines.push(`*Product / SKU:* ${payload.productName ? `${payload.productName} (${payload.productSku || ''})` : payload.productSku}`);
  }
  if (payload.tileSize) lines.push(`*Tile Size:* ${payload.tileSize}`);
  if (payload.requiredQuantity) lines.push(`*Required Quantity:* ${payload.requiredQuantity}`);
  if (payload.containerType) lines.push(`*Container Type:* ${payload.containerType}`);
  if (payload.estimatedCartons) lines.push(`*Estimated Cartons:* ${payload.estimatedCartons}`);
  if (payload.estimatedCoverage) lines.push(`*Estimated Coverage:* ${payload.estimatedCoverage}`);
  if (payload.estimatedCargoWeight) lines.push(`*Estimated Cargo Weight:* ${payload.estimatedCargoWeight}`);
  if (payload.roomPresetName) lines.push(`*3D Visualized In:* ${payload.roomPresetName}`);
  if (payload.extraNotes) lines.push(`*Notes / Requirements:* ${payload.extraNotes}`);

  lines.push('');
  lines.push('Please share FOB/CIF quotation, technical spec sheets, carton packaging details, and current export shipping lead times.');
  lines.push('Thank you.');

  const rawMessage = lines.join('\n');
  const encoded = encodeURIComponent(rawMessage);
  const url = `https://wa.me/${targetNumber}?text=${encoded}`;

  return { url, contact, rawMessage };
}
