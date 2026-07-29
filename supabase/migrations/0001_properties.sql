create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  country text,
  city text,
  price numeric,
  score text check (score in ('A+', 'A', 'B', 'C', null)),
  status text not null default 'Nuevo' check (status in (
    'Nuevo', 'Analizado', 'Aprobado', 'Demo', 'Mensaje',
    'Respuesta', 'Reunion', 'Cliente', 'Entrega', 'Seguimiento', 'Upsell'
  )),
  notes text,
  history jsonb default '[]'::jsonb,
  last_contact timestamptz,
  owner text,
  source_url text unique,
  photos jsonb default '[]'::jsonb,
  contact_channel text,
  contact_handle text,
  created_at timestamptz not null default now()
);

create index if not exists idx_properties_status on properties(status);
create index if not exists idx_properties_score on properties(score);
create index if not exists idx_properties_source_url on properties(source_url);

-- Nunca borrar filas manualmente. El status es el único campo que refleja el
-- avance de un lead por el pipeline.
