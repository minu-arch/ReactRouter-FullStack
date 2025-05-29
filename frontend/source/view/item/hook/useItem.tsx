import { supabase } from "@/lib";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

/**
 * Loader pentru item
 * @param params - Parametrii rutei
 * @returns Itemul cu id-ul respectiv
 */
export async function loader({ params }: LoaderFunctionArgs) {
	const { id } = params; // Extragem id-ul din parametrii rutei
	console.log("Params:", params);
	if (!id) {
		return { error: "Item not found" };
	}
	const { data, error } = await supabase.from("items").select("*").eq("id", id); // Selectăm itemul cu id-ul respectiv
	if (error) {
		return { error: error.message };
	}
	if (!data || data.length === 0) {
		return { error: "Item not found" };
	}
	return { item: data[0] };
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { id } = params;
	const formData = await request.formData();
	const intent = formData.get("intent");
	const title = formData.get("title");
	const description = formData.get("description");
	if (intent === "update") {
		const { error } = await supabase
			.from("items")
			.update({ title, description })
			.eq("id", id);
		if (error) {
			return { error: error.message };
		}
		return { updated: true, error: null };
	}
	if (intent === "delete") {
		const { error } = await supabase.from("items").delete().eq("id", id);
		if (error) {
			return { error: error.message };
		}
		return { deleted: true, error: null };
	}
	return { updated: false, deleted: false, error: null };
}
