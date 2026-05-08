/*
  # Riletto Platform Schema

  ## Overview
  Creates the complete database schema for the Riletto prospect intelligence platform.

  ## New Tables

  ### profiles
  - User profiles linked to auth.users
  - Stores display name, avatar, plan, credits

  ### workspaces
  - Named collections for organizing prospects
  - Belongs to a user

  ### prospects
  - Individual contact/prospect records
  - Linked to workspaces

  ### email_verifications
  - Results of email verification checks
  - Tracks status, confidence, and checks performed

  ### datasets
  - Marketplace dataset listings
  - Curated lead collections for purchase/download

  ### api_keys
  - Developer API keys per user
  - Tracks usage and permissions

  ### api_usage_logs
  - Per-request API usage tracking

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  plan text DEFAULT 'starter',
  credits integer DEFAULT 1000,
  credits_used integer DEFAULT 0,
  company text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Workspaces table
CREATE TABLE IF NOT EXISTS workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  color text DEFAULT '#3B82F6',
  icon text DEFAULT 'folder',
  prospect_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own workspaces"
  ON workspaces FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own workspaces"
  ON workspaces FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workspaces"
  ON workspaces FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own workspaces"
  ON workspaces FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Prospects table
CREATE TABLE IF NOT EXISTS prospects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  workspace_id uuid REFERENCES workspaces(id) ON DELETE SET NULL,
  email text,
  first_name text,
  last_name text,
  company text,
  title text,
  website text,
  phone text,
  linkedin text,
  twitter text,
  location text,
  country text,
  city text,
  industry text,
  company_size text,
  category text,
  tags text[] DEFAULT '{}',
  verification_status text DEFAULT 'unverified',
  confidence_score integer DEFAULT 0,
  enriched boolean DEFAULT false,
  source text DEFAULT 'manual',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own prospects"
  ON prospects FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own prospects"
  ON prospects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own prospects"
  ON prospects FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own prospects"
  ON prospects FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Email verifications table
CREATE TABLE IF NOT EXISTS email_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  confidence_score integer DEFAULT 0,
  mx_valid boolean DEFAULT false,
  smtp_valid boolean DEFAULT false,
  disposable boolean DEFAULT false,
  role_based boolean DEFAULT false,
  catch_all boolean DEFAULT false,
  syntax_valid boolean DEFAULT true,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own verifications"
  ON email_verifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own verifications"
  ON email_verifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Datasets marketplace table
CREATE TABLE IF NOT EXISTS datasets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  lead_count integer DEFAULT 0,
  price decimal(10,2) DEFAULT 0,
  freshness_date date,
  verification_rate integer DEFAULT 0,
  tags text[] DEFAULT '{}',
  sample_data jsonb DEFAULT '[]',
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  download_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active datasets"
  ON datasets FOR SELECT
  TO authenticated
  USING (is_active = true);

-- API keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  key_prefix text NOT NULL,
  permissions text[] DEFAULT '{"discover","verify","enrich"}',
  is_active boolean DEFAULT true,
  last_used_at timestamptz,
  usage_count integer DEFAULT 0,
  monthly_limit integer DEFAULT 1000,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own api keys"
  ON api_keys FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own api keys"
  ON api_keys FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own api keys"
  ON api_keys FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own api keys"
  ON api_keys FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- API usage logs
CREATE TABLE IF NOT EXISTS api_usage_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  api_key_id uuid REFERENCES api_keys(id) ON DELETE SET NULL,
  endpoint text NOT NULL,
  method text NOT NULL,
  status_code integer DEFAULT 200,
  credits_used integer DEFAULT 1,
  response_time_ms integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own api logs"
  ON api_usage_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own api logs"
  ON api_usage_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample datasets
INSERT INTO datasets (title, description, category, lead_count, price, freshness_date, verification_rate, tags, is_featured)
VALUES
  ('Shopify Store Owners', 'Verified contacts from active Shopify-powered e-commerce stores across the US and EU.', 'E-Commerce', 12450, 49.00, '2026-04-01', 94, '{"ecommerce","shopify","retail"}', true),
  ('Marketing Agencies US', 'Decision-makers and founders from digital marketing agencies in the United States.', 'Agencies', 8320, 39.00, '2026-04-15', 91, '{"agencies","marketing","digital"}', true),
  ('SaaS Companies Series A+', 'Executives from venture-backed SaaS companies that have raised Series A or beyond.', 'Technology', 5670, 69.00, '2026-03-01', 96, '{"saas","startup","tech"}', true),
  ('Restaurant Chains', 'Operations managers and owners from restaurant chains with 5+ locations.', 'Food & Beverage', 18900, 29.00, '2026-04-01', 88, '{"restaurants","food","hospitality"}', false),
  ('Dental Practices', 'Practice owners and office managers from dental clinics across North America.', 'Healthcare', 9200, 34.00, '2026-03-15', 92, '{"dental","healthcare","medical"}', false),
  ('Real Estate Agencies', 'Brokers, agents, and agency owners in major US metropolitan areas.', 'Real Estate', 14750, 44.00, '2026-04-01', 89, '{"realestate","property","brokers"}', true),
  ('Accounting Firms', 'CPAs and firm owners from accounting practices with 5+ employees.', 'Finance', 7100, 37.00, '2026-03-01', 93, '{"accounting","finance","cpa"}', false),
  ('Fitness Studios', 'Studio owners and managers from boutique fitness and gym businesses.', 'Health & Wellness', 6800, 27.00, '2026-04-15', 87, '{"fitness","wellness","gyms"}', false)
ON CONFLICT DO NOTHING;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_prospects_user_id ON prospects(user_id);
CREATE INDEX IF NOT EXISTS idx_prospects_workspace_id ON prospects(workspace_id);
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);
CREATE INDEX IF NOT EXISTS idx_email_verifications_email ON email_verifications(email);
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_user_id ON api_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_user_id ON workspaces(user_id);
