import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const propertyUrl = formData.get("propertyUrl")?.toString();

  if (!name || !email) {
    return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
  }

  const { error } = await supabase
    .from("contacts")
    .insert({ name, email, property_url: propertyUrl });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(new URL("/gracias", req.url));
}
