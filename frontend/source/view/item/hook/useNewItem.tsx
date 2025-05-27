import { supabase } from "@/lib";
import type { ActionFunctionArgs } from "react-router";

import { redirect } from "react-router";

/**
 * Action pentru crearea unui nou item
 * @param request - Requestul HTTP
 * @returns Redirect la pagina principală
 */
export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!title || !description) {
    return { error: "Title and description are required" };
  }
// Inserăm un nou item în tabela "items" din Supabase
// și folosim destructurarea obiectului pentru a extrage doar proprietatea "error"
// din răspunsul returnat. Dacă inserarea reușește, error va fi null.
// Dacă apare o problemă, error va conține detaliile erorii.
  const {error} = await supabase.from("items").insert({ title, description }); 
  if (error) {
    console.error(error);
    return { error: error.message };
  }
  return redirect("/");
}