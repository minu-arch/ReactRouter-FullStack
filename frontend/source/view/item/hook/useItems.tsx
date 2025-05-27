import { supabase } from "@/lib";
import type { Item } from "@/view/item/type";

/**
 * Loader pentru lista de iteme
 * @returns Lista de iteme
 */
export async function loader() {
  const { data, error } = await supabase.from("items").select("*");
  if (error) {
    return { error: error.message };
  }
  return { items: data as Item[] }; 
}
