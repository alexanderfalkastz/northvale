import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Faltan las variables de entorno de Supabase. Revisa tu archivo .env (copia .env.example)."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type PropertyStatus =
  | "Nuevo" | "Analizado" | "Aprobado" | "Demo" | "Mensaje"
  | "Respuesta" | "Reunion" | "Cliente" | "Entrega" | "Seguimiento" | "Upsell";

export type PropertyScore = "A+" | "A" | "B" | "C";

export interface Property {
  id?: string;
  name: string;
  company?: string;
  country?: string;
  city?: string;
  price?: number;
  score?: PropertyScore;
  status: PropertyStatus;
  notes?: string;
  source_url?: string;
  photos?: string[];
  contact_channel?: string;
  contact_handle?: string;
}
