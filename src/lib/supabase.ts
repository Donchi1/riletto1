import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          avatar_url: string | null
          plan: string
          credits: number
          credits_used: number
          company: string | null
          created_at: string
          updated_at: string
        }
      }
      workspaces: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          color: string
          icon: string
          prospect_count: number
          created_at: string
          updated_at: string
        }
      }
      prospects: {
        Row: {
          id: string
          user_id: string
          workspace_id: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          company: string | null
          title: string | null
          website: string | null
          phone: string | null
          linkedin: string | null
          twitter: string | null
          location: string | null
          country: string | null
          city: string | null
          industry: string | null
          company_size: string | null
          category: string | null
          tags: string[]
          verification_status: string
          confidence_score: number
          enriched: boolean
          source: string
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
      email_verifications: {
        Row: {
          id: string
          user_id: string
          email: string
          status: string
          confidence_score: number
          mx_valid: boolean
          smtp_valid: boolean
          disposable: boolean
          role_based: boolean
          catch_all: boolean
          syntax_valid: boolean
          details: Record<string, unknown>
          created_at: string
        }
      }
      datasets: {
        Row: {
          id: string
          title: string
          description: string | null
          category: string
          lead_count: number
          price: number
          freshness_date: string | null
          verification_rate: number
          tags: string[]
          sample_data: unknown[]
          is_featured: boolean
          is_active: boolean
          download_count: number
          created_at: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          name: string
          key_hash: string
          key_prefix: string
          permissions: string[]
          is_active: boolean
          last_used_at: string | null
          usage_count: number
          monthly_limit: number
          created_at: string
        }
      }
    }
  }
}
