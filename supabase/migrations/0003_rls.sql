-- 0003_rls.sql
-- Habilita Row Level Security (RLS) en las tablas del proyecto.
--
-- Sin políticas asociadas, RLS deniega TODO acceso vía la API REST de Supabase
-- para los roles anon y authenticated (la anon key queda sin lectura/escritura).
-- NO afecta el uso actual, que es 100% server-side con SUPABASE_SERVICE_ROLE_KEY:
-- el rol service_role ignora (bypassa) RLS por diseño.
--
-- Aplicar manualmente en el SQL Editor de Supabase.

ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
