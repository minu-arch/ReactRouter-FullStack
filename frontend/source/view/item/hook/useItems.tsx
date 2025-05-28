import { supabase } from "@/lib";
import type { Item } from "@/view/item/type";

/**
 * Loader pentru lista de iteme
 * @param page Numărul paginii (începe de la 1)
 * @param itemsPerPage Numărul de iteme per pagină
 * @returns Lista de iteme pentru pagina specificată și informații de paginare
 */
export async function loader({ request }: { request: Request }) {
	// Obținem parametrii din URL
	const url = new URL(request.url);
	const page = Number.parseInt(url.searchParams.get("page") || "1", 10);
	const itemsPerPage = Number.parseInt(
		url.searchParams.get("per_page") || "5",
		10,
	);

	// Calculăm offset-ul pentru interogare
	const from = (page - 1) * itemsPerPage;
	const to = from + itemsPerPage - 1;

	// Obținem numărul total de iteme
	const { count, error: countError } = await supabase
		.from("items")
		.select("*", { count: "exact", head: true });

	if (countError) {
		return {
			error: countError.message,
			items: [],
			pagination: {
				currentPage: page,
				totalPages: 0,
				totalItems: 0,
				itemsPerPage,
			},
		};
	}

	// Obținem itemele pentru pagina curentă
	const { data, error } = await supabase
		.from("items")
		.select("*")
		.range(from, to)
		.order("id", { ascending: false });

	if (error) {
		return {
			error: error.message,
			items: [],
			pagination: {
				currentPage: page,
				totalPages: 0,
				totalItems: 0,
				itemsPerPage,
			},
		};
	}

	// Calculăm numărul total de pagini
	const totalItems = count || 0;
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return {
		items: data as Item[],
		pagination: {
			currentPage: page,
			totalPages,
			totalItems,
			itemsPerPage,
		},
	};
}
