-- ============================================================
-- HomeMatch — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  name        text,
  phone       text,
  role        text not null default 'homeowner' check (role in ('homeowner','firm','brand','admin')),
  -- Homeowner extras
  property_type   text,
  property_size   text,
  reno_stage      text,
  budget_range    text,
  district        text,
  -- Firm extras
  firm_name       text,
  license_number  text,
  is_casetrust    boolean default false,
  -- Brand extras
  brand_name      text,
  product_category text,
  website         text,
  -- Meta
  auth_provider   text default 'email',
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can view own profile"  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name, auth_provider)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email,'@',1)),
    coalesce(new.raw_user_meta_data->>'provider', 'email')
  );
  return new;
end;
$$;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- FIRMS
-- ============================================================
create table public.firms (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  name            text not null,
  logo            text,
  banner          text,
  address         text,
  district        text,
  bio             text,
  established     integer,
  rating          numeric(3,2) default 0,
  review_count    integer default 0,
  avg_budget      integer,
  response_time   text,
  -- Project type percentages
  pct_hdb         integer default 0,
  pct_condo       integer default 0,
  pct_landed      integer default 0,
  pct_commercial  integer default 0,
  -- Contact
  phone           text,
  whatsapp        text,
  website         text,
  instagram       text,
  email           text,
  -- Details
  styles          text[],
  service_areas   text[],
  team_size       integer,
  warranty        text,
  total_projects  integer default 0,
  is_casetrust    boolean default false,
  is_featured     boolean default false,
  is_active       boolean default true,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
alter table public.firms enable row level security;
create policy "Anyone can view active firms" on public.firms for select using (is_active = true);
create policy "Admins can manage firms"      on public.firms for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- FIRM REVIEWS
-- ============================================================
create table public.firm_reviews (
  id                uuid primary key default uuid_generate_v4(),
  firm_id           uuid references public.firms(id) on delete cascade,
  reviewer_name     text not null,
  rating            integer not null check (rating between 1 and 5),
  body              text,
  review_date       text,
  designer_name     text,
  property_type     text,
  renovation_budget integer,
  is_verified       boolean default false,
  created_at        timestamptz default now()
);
alter table public.firm_reviews enable row level security;
create policy "Anyone can view firm reviews" on public.firm_reviews for select using (true);
create policy "Admins can manage firm reviews" on public.firm_reviews for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- FIRM BADGES
-- ============================================================
create table public.firm_badges (
  id          uuid primary key default uuid_generate_v4(),
  firm_id     uuid references public.firms(id) on delete cascade,
  name        text not null,
  grade       text check (grade in ('I','II','III')),
  description text,
  icon        text
);
alter table public.firm_badges enable row level security;
create policy "Anyone can view badges" on public.firm_badges for select using (true);
create policy "Admins can manage badges" on public.firm_badges for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- VENDORS
-- ============================================================
create table public.vendors (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  name          text not null,
  logo          text,
  banner        text,
  category      text not null,
  subcategory   text,
  bio           text,
  established   integer,
  rating        numeric(3,2) default 0,
  review_count  integer default 0,
  price_range   text check (price_range in ('Budget','Mid-Range','Premium','Luxury')),
  website       text,
  instagram     text,
  phone         text,
  email         text,
  address       text,
  showrooms     text[],
  tags          text[],
  partner_firms text[],
  is_featured   boolean default false,
  is_active     boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
alter table public.vendors enable row level security;
create policy "Anyone can view active vendors" on public.vendors for select using (is_active = true);
create policy "Admins can manage vendors"      on public.vendors for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- VENDOR REVIEWS
-- ============================================================
create table public.vendor_reviews (
  id            uuid primary key default uuid_generate_v4(),
  vendor_id     uuid references public.vendors(id) on delete cascade,
  reviewer_name text not null,
  rating        integer not null check (rating between 1 and 5),
  body          text,
  review_date   text,
  project_type  text,
  is_verified   boolean default false,
  created_at    timestamptz default now()
);
alter table public.vendor_reviews enable row level security;
create policy "Anyone can view vendor reviews" on public.vendor_reviews for select using (true);
create policy "Admins can manage vendor reviews" on public.vendor_reviews for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- VENDOR PRODUCTS
-- ============================================================
create table public.vendor_products (
  id          uuid primary key default uuid_generate_v4(),
  vendor_id   uuid references public.vendors(id) on delete cascade,
  name        text not null,
  description text,
  price_from  integer
);
alter table public.vendor_products enable row level security;
create policy "Anyone can view products" on public.vendor_products for select using (true);
create policy "Admins can manage products" on public.vendor_products for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- INSPIRATIONS (projects + before/after)
-- ============================================================
create table public.inspirations (
  id               uuid primary key default uuid_generate_v4(),
  slug             text unique not null,
  title            text not null,
  firm_slug        text,
  firm_id          uuid references public.firms(id) on delete set null,
  property_type    text,
  bedrooms         integer,
  sqft             integer,
  budget           integer,
  style            text,
  rooms            text[],
  tags             text[],
  completion_days  integer,
  completion_date  text,
  designer         text,
  before_photo_url text,
  is_featured      boolean default false,
  is_active        boolean default true,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);
alter table public.inspirations enable row level security;
create policy "Anyone can view active inspirations" on public.inspirations for select using (is_active = true);
create policy "Admins can manage inspirations"      on public.inspirations for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- INSPIRATION PHOTOS
-- ============================================================
create table public.inspiration_photos (
  id             uuid primary key default uuid_generate_v4(),
  inspiration_id uuid references public.inspirations(id) on delete cascade,
  url            text not null,
  caption        text,
  sort_order     integer default 0
);
alter table public.inspiration_photos enable row level security;
create policy "Anyone can view photos" on public.inspiration_photos for select using (true);
create policy "Admins can manage photos" on public.inspiration_photos for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- ARTICLES
-- ============================================================
create table public.articles (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  category     text,
  tags         text[],
  publish_date text,
  updated_date text,
  read_time    integer,
  hero_image   text,
  author       text,
  author_role  text,
  content      text,
  is_featured  boolean default false,
  is_published boolean default true,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
alter table public.articles enable row level security;
create policy "Anyone can view published articles" on public.articles for select using (is_published = true);
create policy "Admins can manage articles"         on public.articles for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- LEADS (FindMyId form submissions)
-- ============================================================
create table public.leads (
  id              uuid primary key default uuid_generate_v4(),
  -- Step 1
  timeline        text,
  -- Step 2
  property_type   text,
  hdb_type        text,
  hdb_status      text,
  condo_type      text,
  condo_status    text,
  landed_type     text,
  landed_status   text,
  region          text,
  district        text,
  -- Step 3
  property_size   text,
  condition       text,
  rooms           text[],
  reno_type       text,
  priorities      text[],
  -- Step 4
  budget          text,
  reno_loan       text,
  -- Step 5
  styles          text[],
  style_other     text,
  working_styles  text[],
  languages       text[],
  special_reqs    text[],
  id_experience   text,
  residents       text[],
  pets            text[],
  guarantees      text[],
  -- Step 6
  name            text not null,
  email           text not null,
  whatsapp        text not null,
  contact_time    text,
  referral_source text,
  -- Status
  status          text default 'new' check (status in ('new','contacted','matched','closed','spam')),
  admin_notes     text,
  responded_at    timestamptz,
  created_at      timestamptz default now()
);
alter table public.leads enable row level security;
create policy "Anyone can insert leads" on public.leads for insert with check (true);
create policy "Admins can view all leads" on public.leads for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update leads" on public.leads for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- LEAD RESPONSES
-- ============================================================
create table public.lead_responses (
  id         uuid primary key default uuid_generate_v4(),
  lead_id    uuid references public.leads(id) on delete cascade,
  admin_id   uuid references auth.users(id),
  message    text not null,
  firms_sent text[],
  created_at timestamptz default now()
);
alter table public.lead_responses enable row level security;
create policy "Admins can manage lead responses" on public.lead_responses for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- ENQUIRIES (FirmEnquirySidebar)
-- ============================================================
create table public.enquiries (
  id            uuid primary key default uuid_generate_v4(),
  firm_id       uuid references public.firms(id) on delete set null,
  firm_slug     text,
  property_type text,
  property_status text,
  budget        text,
  timeline      text,
  name          text not null,
  mobile        text not null,
  message       text,
  status        text default 'new' check (status in ('new','read','replied','closed')),
  created_at    timestamptz default now()
);
alter table public.enquiries enable row level security;
create policy "Anyone can insert enquiries" on public.enquiries for insert with check (true);
create policy "Admins can view all enquiries" on public.enquiries for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update enquiries" on public.enquiries for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
create table public.contact_messages (
  id         uuid primary key default uuid_generate_v4(),
  name       text,
  email      text,
  subject    text,
  message    text,
  status     text default 'unread' check (status in ('unread','read','replied')),
  created_at timestamptz default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can insert contact messages" on public.contact_messages for insert with check (true);
create policy "Admins can view contact messages" on public.contact_messages for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update contact messages" on public.contact_messages for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- ============================================================
-- INDEXES for performance
-- ============================================================
create index on public.firms (slug);
create index on public.firms (is_featured);
create index on public.vendors (slug);
create index on public.vendors (category);
create index on public.inspirations (slug);
create index on public.articles (slug);
create index on public.articles (category);
create index on public.leads (status);
create index on public.leads (created_at desc);
create index on public.enquiries (firm_id);
create index on public.enquiries (status);
create index on public.contact_messages (status);
