#!/usr/bin/env node

import { writeFile, mkdir } from "node:fs/promises";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) throw new Error("Supabase public environment is not configured");

const tables = [
  "eg_brands",
  "eg_products",
  "eg_product_categories",
  "eg_catalogs",
  "eg_certificates",
  "eg_industries",
  "eg_media",
  "eg_company_info",
];

async function readAll(table) {
  const rows = [];
  for (let start = 0; ; start += 1000) {
    const endpoint = new URL(`/rest/v1/${table}`, url);
    endpoint.searchParams.set("select", "*");
    const response = await fetch(endpoint, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        Range: `${start}-${start + 999}`,
        "Range-Unit": "items",
      },
    });
    if (!response.ok) {
      throw new Error(`${table}: ${response.status} ${await response.text()}`);
    }
    const data = await response.json();
    rows.push(...data);
    if (data.length < 1000) return rows;
  }
}

const snapshot = {
  exported_at: new Date().toISOString(),
  project_url: url,
  tables: {},
};

for (const table of tables) snapshot.tables[table] = await readAll(table);

await mkdir("audit", { recursive: true });
await writeFile(
  "audit/current-db-snapshot.json",
  `${JSON.stringify(snapshot, null, 2)}\n`,
  "utf8",
);

const brands = snapshot.tables.eg_brands;
const products = snapshot.tables.eg_products;
const productCounts = Object.fromEntries(
  brands
    .map((brand) => [
      brand.slug,
      products.filter((product) => product.brand_id === brand.id && product.is_active).length,
    ])
    .sort(([a], [b]) => a.localeCompare(b)),
);

console.log(
  JSON.stringify(
    {
      table_counts: Object.fromEntries(
        Object.entries(snapshot.tables).map(([table, rows]) => [table, rows.length]),
      ),
      active_product_counts: productCounts,
    },
    null,
    2,
  ),
);
