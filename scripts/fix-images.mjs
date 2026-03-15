#!/usr/bin/env node
/**
 * Fix ALL images with verified, real Paraguay photos.
 * Phase 1: Global find-and-replace of clearly wrong images.
 * Phase 2: Context-specific replacements for images used in mixed contexts.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "../src");

// ===== PHASE 1: Global replacements =====
// These photo IDs are ALWAYS wrong regardless of context.
const globalReplacements = [
  // 1. Filipino festival → Real Jesuit Mission ruins (Trinidad, Paraguay)
  ["1579957023433-7fad5b83efae", "1620736663824-18f7d3a79d54"],

  // 2. SE Asian waterfall → Salto Karapá (Reserva Natural Mbaracayú, Paraguay)
  ["1723784037687-edb3a4959c22", "1613338962230-46fde73d3d00"],

  // 3. Tereré cup (wrong for tax blog) → AYFRA Tower (Asunción business district)
  ["1709133706829-c9c526d6b740", "1588013112692-1e33c3ccf8a4"],

  // 4. City aerial (not beach) → River beach aerial (Ciudad del Este, Paraguay)
  ["1649275579015-5092d2ffcf2b", "1575377606545-7a8d394925e8"],

  // 5. Church (wrong for wildlife) → Blue-and-yellow macaw (Asunción, Paraguay)
  ["1585318822320-300abf39f65d", "1717634546865-d5be86225c4a"],
];

// ===== PHASE 2: File-specific replacements =====
// For photo-1655425541685-c3d9b0672d9f (Asunción aerial used for both CDE and Asunción tours)
// CDE contexts → Bridge over Paraná River
// Asunción contexts → Palacio de López or Mercado 4 vendor
const CDE_BRIDGE = "1645008404857-92b275775ef8";
const PALACIO_LOPEZ = "1708007736300-89c16fa57b40";
const MERCADO4_VENDOR = "1743807059772-4b4a70148d62";
const OLD_ASU_AERIAL = "1655425541685-c3d9b0672d9f";

// Phase 2 file-specific rules
// format: [filename_pattern, old_id_fragment, new_id]
const fileSpecificReplacements = [
  // CDE contexts → Bridge
  ["gallery/page.tsx", OLD_ASU_AERIAL, CDE_BRIDGE],
  ["destinations/[slug]/page.tsx", OLD_ASU_AERIAL, CDE_BRIDGE],
  ["destination-grid.tsx", OLD_ASU_AERIAL, CDE_BRIDGE],

  // Asuncion Gastronomy Tour → Mercado 4 vendor
  ["leisure/[slug]/page.tsx", OLD_ASU_AERIAL, MERCADO4_VENDOR],

  // tours/page.tsx: "asuncion-food-tour" → Palacio de López
  ["tours/page.tsx", OLD_ASU_AERIAL, PALACIO_LOPEZ],
  // tours/[slug]/page.tsx: "asuncion-food-tour" → Palacio de López
  ["tours/[slug]/page.tsx", OLD_ASU_AERIAL, PALACIO_LOPEZ],
];

// ===== PHASE 3: Additional context improvements =====
// Guarani Culture Immersion uses Asunción aerial — change to Mercado 4 vendor
const GUARANI_CULTURE_FIXES = [
  // In culture/[slug]/page.tsx, tours/[slug]/page.tsx, tours/page.tsx
  // The Guarani Culture Immersion tour uses photo-1655775130609-642423db9ff9 (Asunción aerial)
  // Only replace in lines that are within the Guarani Culture Immersion context
];

// ===== Walk directory =====
function walkDir(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (fullPath.endsWith(".tsx") || fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }
  return files;
}

const files = walkDir(srcDir);
let totalReplacements = 0;

// ===== Execute Phase 1: Global replacements =====
console.log("=== PHASE 1: Global replacements ===");
for (const filePath of files) {
  let content = readFileSync(filePath, "utf-8");
  let modified = false;

  for (const [oldId, newId] of globalReplacements) {
    if (content.includes(oldId)) {
      content = content.replaceAll(oldId, newId);
      modified = true;
      totalReplacements++;
      console.log(`  [GLOBAL] ${filePath.replace(srcDir, "src")}: ${oldId.slice(0, 15)}... → ${newId.slice(0, 15)}...`);
    }
  }

  if (modified) {
    writeFileSync(filePath, content, "utf-8");
  }
}

// ===== Execute Phase 2: File-specific replacements =====
console.log("\n=== PHASE 2: File-specific replacements ===");
for (const filePath of files) {
  const relPath = filePath.replace(srcDir, "");

  for (const [pattern, oldId, newId] of fileSpecificReplacements) {
    if (relPath.includes(pattern)) {
      let content = readFileSync(filePath, "utf-8");
      if (content.includes(oldId)) {
        content = content.replaceAll(oldId, newId);
        writeFileSync(filePath, content, "utf-8");
        totalReplacements++;
        console.log(`  [SPECIFIC] ${relPath}: ${oldId.slice(0, 15)}... → ${newId.slice(0, 15)}...`);
      }
    }
  }
}

// ===== Execute Phase 3: Guarani Culture Immersion fix =====
console.log("\n=== PHASE 3: Guarani Culture Immersion fixes ===");
const ASUNCION_AERIAL = "1655775130609-642423db9ff9";

// Fix in culture/[slug]/page.tsx
for (const filePath of files) {
  const relPath = filePath.replace(srcDir, "");

  if (relPath.includes("culture/[slug]/page.tsx")) {
    let content = readFileSync(filePath, "utf-8");
    // The Guarani Culture Immersion is the 2nd tour — replace its specific image line
    // It's the only tour using the Asunción aerial in this file
    if (content.includes(ASUNCION_AERIAL)) {
      content = content.replace(
        `photo-${ASUNCION_AERIAL}`,
        `photo-${MERCADO4_VENDOR}`
      );
      writeFileSync(filePath, content, "utf-8");
      totalReplacements++;
      console.log(`  [GUARANI] ${relPath}: Asunción aerial → Mercado 4 vendor`);
    }
  }

  // Fix Guarani Culture tour in tours/[slug] and tours/page
  if (relPath.includes("tours/[slug]/page.tsx") || relPath.endsWith("tours/page.tsx")) {
    let content = readFileSync(filePath, "utf-8");
    // Find the guarani-culture-immersion block and change its image
    const guaraniPattern = /(slug:\s*"guarani-culture-immersion"[\s\S]*?image:\s*"https:\/\/images\.unsplash\.com\/photo-)([^?]+)/;
    const match = content.match(guaraniPattern);
    if (match && match[2] === ASUNCION_AERIAL) {
      content = content.replace(match[0], match[0].replace(ASUNCION_AERIAL, MERCADO4_VENDOR));
      writeFileSync(filePath, content, "utf-8");
      totalReplacements++;
      console.log(`  [GUARANI] ${relPath}: Asunción aerial → Mercado 4 vendor`);
    }
  }
}

console.log(`\nDone! ${totalReplacements} total replacements.`);
