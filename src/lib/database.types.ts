export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      eg_brands: {
        Row: {
          created_at: string
          description: string | null
          description_ar: string | null
          id: string
          is_active: boolean
          is_partner: boolean
          is_product_brand: boolean
          logo_url: string | null
          name: string
          name_ar: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          is_active?: boolean
          is_partner?: boolean
          is_product_brand?: boolean
          logo_url?: string | null
          name: string
          name_ar?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          is_active?: boolean
          is_partner?: boolean
          is_product_brand?: boolean
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      eg_catalogs: {
        Row: {
          brand_id: string
          created_at: string
          external_url: string | null
          file_type: string | null
          file_url: string | null
          id: string
          is_downloadable: boolean
          sort_order: number
          title: string
          title_ar: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string
          external_url?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          sort_order?: number
          title: string
          title_ar?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string
          external_url?: string | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          sort_order?: number
          title?: string
          title_ar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "catalogs_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "eg_brands"
            referencedColumns: ["id"]
          },
        ]
      }
      eg_certificates: {
        Row: {
          brand_id: string
          created_at: string
          file_url: string | null
          id: string
          is_downloadable: boolean
          title: string
          title_ar: string | null
        }
        Insert: {
          brand_id: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          title: string
          title_ar?: string | null
        }
        Update: {
          brand_id?: string
          created_at?: string
          file_url?: string | null
          id?: string
          is_downloadable?: boolean
          title?: string
          title_ar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "certificates_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "eg_brands"
            referencedColumns: ["id"]
          },
        ]
      }
      eg_company_info: {
        Row: {
          about: string | null
          about_ar: string | null
          created_at: string
          email: string | null
          id: string
          logo_url: string | null
          name: string
          name_ar: string | null
          office_address: string | null
          office_address_ar: string | null
          phone: string | null
          phone2: string | null
          showroom_address: string | null
          showroom_address_ar: string | null
          updated_at: string
        }
        Insert: {
          about?: string | null
          about_ar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          office_address?: string | null
          office_address_ar?: string | null
          phone?: string | null
          phone2?: string | null
          showroom_address?: string | null
          showroom_address_ar?: string | null
          updated_at?: string
        }
        Update: {
          about?: string | null
          about_ar?: string | null
          created_at?: string
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          name_ar?: string | null
          office_address?: string | null
          office_address_ar?: string | null
          phone?: string | null
          phone2?: string | null
          showroom_address?: string | null
          showroom_address_ar?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      eg_industries: {
        Row: {
          created_at: string
          description: string | null
          description_ar: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          name_ar: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          name_ar?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          name_ar?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      eg_media: {
        Row: {
          brand_id: string | null
          category: string | null
          created_at: string
          id: string
          image_url: string
          media_type: string | null
          sort_order: number
          title: string | null
          title_ar: string | null
        }
        Insert: {
          brand_id?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url: string
          media_type?: string | null
          sort_order?: number
          title?: string | null
          title_ar?: string | null
        }
        Update: {
          brand_id?: string | null
          category?: string | null
          created_at?: string
          id?: string
          image_url?: string
          media_type?: string | null
          sort_order?: number
          title?: string | null
          title_ar?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "eg_brands"
            referencedColumns: ["id"]
          },
        ]
      }
      eg_product_categories: {
        Row: {
          created_at: string
          description: string | null
          description_ar: string | null
          id: string
          name: string
          name_ar: string | null
          parent_id: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          name: string
          name_ar?: string | null
          parent_id?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          name?: string
          name_ar?: string | null
          parent_id?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "eg_product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      eg_products: {
        Row: {
          brand_id: string
          category_id: string | null
          created_at: string
          description: string | null
          description_ar: string | null
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          name_ar: string | null
          slug: string
          sort_order: number
          updated_at: string
          part_number: string | null
          bearing_type: string | null
          bore_diameter_mm: number | null
          outer_diameter_mm: number | null
          width_mm: number | null
        }
        Insert: {
          brand_id: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          name_ar?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
          part_number?: string | null
          bearing_type?: string | null
          bore_diameter_mm?: number | null
          outer_diameter_mm?: number | null
          width_mm?: number | null
        }
        Update: {
          brand_id?: string
          category_id?: string | null
          created_at?: string
          description?: string | null
          description_ar?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          name_ar?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
          part_number?: string | null
          bearing_type?: string | null
          bore_diameter_mm?: number | null
          outer_diameter_mm?: number | null
          width_mm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "eg_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "eg_product_categories"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type Brand = Tables<"eg_brands">
export type Product = Tables<"eg_products">
export type ProductCategory = Tables<"eg_product_categories">
export type Catalog = Tables<"eg_catalogs">
export type Certificate = Tables<"eg_certificates">
export type Industry = Tables<"eg_industries">
export type Media = Tables<"eg_media">
export type CompanyInfo = Tables<"eg_company_info">
