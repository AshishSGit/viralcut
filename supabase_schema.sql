-- ViralCut Supabase Schema
-- Run this in Supabase SQL Editor

-- User plans table
create table if not exists user_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan text default 'free' check (plan in ('free', 'pro', 'unlimited')),
  stripe_customer_id text,
  stripe_subscription_id text,
  plan_expires_at timestamptz,
  monthly_usage int default 0,
  usage_reset_at timestamptz,
  created_at timestamptz default now()
);

alter table user_plans enable row level security;

create policy "Users can read own plan"
  on user_plans for select
  using (auth.uid() = user_id);

-- Processing jobs table
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'downloading', 'transcribing', 'analyzing', 'clipping', 'completed', 'failed')),
  source_type text check (source_type in ('url', 'upload')),
  source_url text,
  source_r2_key text,
  duration_seconds int,
  include_captions boolean default true,
  clips jsonb,
  error text,
  created_at timestamptz default now(),
  completed_at timestamptz
);

alter table jobs enable row level security;

create policy "Users can read own jobs"
  on jobs for select
  using (auth.uid() = user_id);

create policy "Users can insert own jobs"
  on jobs for insert
  with check (auth.uid() = user_id);

-- Index for faster dashboard queries
create index if not exists idx_jobs_user_created on jobs(user_id, created_at desc);

-- Migration: add include_captions column if table already exists
-- Run this if you already have the jobs table:
-- alter table jobs add column if not exists include_captions boolean default true;
