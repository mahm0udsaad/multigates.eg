import { supabase } from "./supabase";
import type {
  Brand,
  Product,
  ProductCategory,
  Catalog,
  Certificate,
  Industry,
  Media,
  CompanyInfo,
} from "./database.types";

// ============================================
// BRANDS
// ============================================
export async function getBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from("eg_brands")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const { data, error } = await supabase
    .from("eg_brands")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

/**
 * Bearing dimension search. Returns matching products across brands given
 * the dimensions a customer enters. tol = tolerance in mm.
 */
export interface DimensionSearchResult {
  id: string;
  brand_id: string;
  brand_slug: string;
  brand_name: string;
  brand_logo_url: string | null;
  part_number: string | null;
  bearing_type: string | null;
  bore_diameter_mm: number | null;
  outer_diameter_mm: number | null;
  width_mm: number | null;
  name: string;
  slug: string;
}

/**
 * Cross-reference: given a part number, find equivalents (same dimensions)
 * across other brands.
 */
export async function findCrossReferences(
  partNumber: string
): Promise<DimensionSearchResult[]> {
  // First find the source product to get its dimensions
  const { data: source, error: srcErr } = await supabase
    .from("eg_products")
    .select("bore_diameter_mm, outer_diameter_mm, width_mm, bearing_type")
    .ilike("part_number", partNumber.trim())
    .not("bore_diameter_mm", "is", null)
    .limit(1)
    .single();
  if (srcErr || !source) return [];

  return searchBearingsByDimensions({
    bore: source.bore_diameter_mm ?? undefined,
    outer: source.outer_diameter_mm ?? undefined,
    width: source.width_mm ?? undefined,
    type: source.bearing_type ?? undefined,
  });
}

export async function searchBearingsByDimensions(params: {
  bore?: number;
  outer?: number;
  width?: number;
  type?: string;
  partNumber?: string;
  tol?: number;
}): Promise<DimensionSearchResult[]> {
  const tol = params.tol ?? 0.5;
  let q = supabase
    .from("eg_products")
    .select(
      "id, brand_id, slug, name, part_number, bearing_type, bore_diameter_mm, outer_diameter_mm, width_mm, brand:eg_brands!inner(id, slug, name, logo_url)"
    )
    .eq("is_active", true)
    .not("part_number", "is", null);

  if (params.partNumber) {
    q = q.ilike("part_number", `%${params.partNumber}%`);
  }
  if (params.bore !== undefined) {
    q = q.gte("bore_diameter_mm", params.bore - tol).lte(
      "bore_diameter_mm",
      params.bore + tol
    );
  }
  if (params.outer !== undefined) {
    q = q.gte("outer_diameter_mm", params.outer - tol).lte(
      "outer_diameter_mm",
      params.outer + tol
    );
  }
  if (params.width !== undefined) {
    q = q.gte("width_mm", params.width - tol).lte(
      "width_mm",
      params.width + tol
    );
  }
  if (params.type) {
    q = q.ilike("bearing_type", `%${params.type}%`);
  }

  const { data, error } = await q.limit(60);
  if (error) throw error;

  return (data ?? []).map((row: unknown) => {
    const r = row as {
      id: string;
      brand_id: string;
      slug: string;
      name: string;
      part_number: string | null;
      bearing_type: string | null;
      bore_diameter_mm: number | null;
      outer_diameter_mm: number | null;
      width_mm: number | null;
      brand: {
        id: string;
        slug: string;
        name: string;
        logo_url: string | null;
      };
    };
    return {
      id: r.id,
      brand_id: r.brand_id,
      brand_slug: r.brand.slug,
      brand_name: r.brand.name,
      brand_logo_url: r.brand.logo_url,
      part_number: r.part_number,
      bearing_type: r.bearing_type,
      bore_diameter_mm: r.bore_diameter_mm,
      outer_diameter_mm: r.outer_diameter_mm,
      width_mm: r.width_mm,
      name: r.name,
      slug: r.slug,
    };
  });
}

/**
 * For the mega-menu: returns the priority brands and a few sample bearing
 * types per brand. Order/limit are tuned to keep the popup compact.
 */
export interface BrandWithProducts {
  id: string;
  slug: string;
  name: string;
  name_ar: string | null;
  logo_url: string | null;
  products: { id: string; name: string; name_ar: string | null; slug: string }[];
}

export async function getBrandsWithProductsForMenu(
  limitProducts = 8
): Promise<BrandWithProducts[]> {
  // Mega-menu only shows the brands the client highlighted in his emails
  const PRIORITY_SLUGS = [
    "ntn",
    "snr",
    "ksm",
    "quaval",
    "dkf",
    "kinex",
    "stc-steyr",
    "jib",
    "timken",
    "ina",
  ];

  const { data: brands, error: brandsError } = await supabase
    .from("eg_brands")
    .select("id, slug, name, name_ar, logo_url, sort_order")
    .in("slug", PRIORITY_SLUGS)
    .eq("is_active", true);
  if (brandsError) throw brandsError;
  if (!brands) return [];

  const { data: products, error: productsError } = await supabase
    .from("eg_products")
    .select("id, brand_id, slug, name, name_ar, sort_order")
    .in(
      "brand_id",
      brands.map((b) => b.id)
    )
    .eq("is_active", true)
    .order("sort_order");
  if (productsError) throw productsError;

  const productsByBrand: Record<
    string,
    { id: string; name: string; name_ar: string | null; slug: string }[]
  > = {};
  for (const p of products ?? []) {
    if (!productsByBrand[p.brand_id]) productsByBrand[p.brand_id] = [];
    if (productsByBrand[p.brand_id].length >= limitProducts) continue;
    productsByBrand[p.brand_id].push({
      id: p.id,
      name: p.name,
      name_ar: p.name_ar,
      slug: p.slug,
    });
  }

  // Preserve the priority order from PRIORITY_SLUGS
  return PRIORITY_SLUGS.map((slug) => brands.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => Boolean(b))
    .map((b) => ({
      id: b.id,
      slug: b.slug,
      name: b.name,
      name_ar: b.name_ar,
      logo_url: b.logo_url,
      products: productsByBrand[b.id] || [],
    }));
}

// ============================================
// PRODUCTS
// ============================================
export async function getProducts(): Promise<(Product & { brand: Brand })[]> {
  const { data, error } = await supabase
    .from("eg_products")
    .select("*, brand:eg_brands(*)")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data as (Product & { brand: Brand })[]) ?? [];
}

export async function getProductsByBrand(
  brandId: string
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("eg_products")
    .select("*")
    .eq("brand_id", brandId)
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getProductBySlug(
  brandSlug: string,
  productSlug: string
): Promise<(Product & { brand: Brand }) | null> {
  const brand = await getBrandBySlug(brandSlug);
  if (!brand) return null;

  const { data, error } = await supabase
    .from("eg_products")
    .select("*, brand:eg_brands(*)")
    .eq("brand_id", brand.id)
    .eq("slug", productSlug)
    .single();
  if (error) return null;
  return data as Product & { brand: Brand };
}

export async function getProductCountsByBrand(): Promise<
  Record<string, number>
> {
  const { data, error } = await supabase
    .from("eg_products")
    .select("brand_id")
    .eq("is_active", true);
  if (error) throw error;
  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.brand_id] = (counts[row.brand_id] || 0) + 1;
  }
  return counts;
}

// ============================================
// CATEGORIES
// ============================================
export async function getCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from("eg_product_categories")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getTopLevelCategories(): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from("eg_product_categories")
    .select("*")
    .is("parent_id", null)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

// ============================================
// CATALOGS
// ============================================
export async function getCatalogs(): Promise<(Catalog & { brand: Brand })[]> {
  const { data, error } = await supabase
    .from("eg_catalogs")
    .select("*, brand:eg_brands(*)")
    .order("sort_order");
  if (error) throw error;
  return (data as (Catalog & { brand: Brand })[]) ?? [];
}

export async function getCatalogsByBrand(
  brandId: string
): Promise<Catalog[]> {
  const { data, error } = await supabase
    .from("eg_catalogs")
    .select("*")
    .eq("brand_id", brandId)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

// ============================================
// CERTIFICATES
// ============================================
export async function getCertificates(): Promise<(Certificate & { brand: Brand })[]> {
  const { data, error } = await supabase
    .from("eg_certificates")
    .select("*, brand:eg_brands(*)");
  if (error) throw error;
  return (data as (Certificate & { brand: Brand })[]) ?? [];
}

export async function getCertificatesByBrand(
  brandId: string
): Promise<Certificate[]> {
  const { data, error } = await supabase
    .from("eg_certificates")
    .select("*")
    .eq("brand_id", brandId);
  if (error) throw error;
  return data ?? [];
}

// ============================================
// INDUSTRIES
// ============================================
export async function getIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase
    .from("eg_industries")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return data ?? [];
}

export async function getIndustryBySlug(
  slug: string
): Promise<Industry | null> {
  const { data, error } = await supabase
    .from("eg_industries")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) return null;
  return data;
}

// ============================================
// MEDIA
// ============================================
export async function getMedia(category?: string): Promise<Media[]> {
  let query = supabase.from("eg_media").select("*").order("sort_order");
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data ?? [];
}

// ============================================
// COMPANY INFO
// ============================================
export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  const { data, error } = await supabase
    .from("eg_company_info")
    .select("*")
    .single();
  if (error) return null;
  return data;
}
