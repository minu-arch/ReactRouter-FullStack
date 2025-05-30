import { supabase } from "@/lib";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useFetcher, useNavigate } from "react-router";

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

/**
 * Hook pentru operațiuni optimiste pe un item
 * @returns Starea operațiunilor și fetcher-ul
 */
export function useItemActions() {
	const navigate = useNavigate();
	const fetcher = useFetcher<typeof action>();

	// Verificăm dacă operațiunea este în desfășurare
	const isUpdating =
		fetcher.state === "submitting" &&
		fetcher.formData?.get("intent") === "update";
	const isDeleting =
		fetcher.state === "submitting" &&
		fetcher.formData?.get("intent") === "delete";

	// Verificăm dacă operațiunile au avut succes
	const hasUpdated = fetcher.data?.updated;
	const hasDeleted = fetcher.data?.deleted;

	// Dacă itemul a fost șters, redirectăm la pagina de iteme
	if (hasDeleted) {
		navigate("/items", { replace: true });
	}

	return {
		fetcher,
		isUpdating,
		isDeleting,
		hasUpdated,
		hasDeleted,
	};
}
