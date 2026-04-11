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
