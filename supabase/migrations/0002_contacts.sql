create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  property_url text,
  created_at timestamptz not null default now()
);
