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

	try {
		// Execută ambele cereri în paralel pentru performanță mai bună
		const [countResult, itemsResult] = await Promise.all([
			// Cerere pentru numărul total de iteme
			supabase
				.from("items")
				.select("*", { count: "exact", head: true }),

			// Cerere pentru itemele de pe pagina curentă
			supabase
				.from("items")
				.select("*")
				.range(from, to)
				.order("id", { ascending: false }),
		]);

		// Verificăm erorile
		if (countResult.error) {
			throw new Error(countResult.error.message);
		}

		if (itemsResult.error) {
			throw new Error(itemsResult.error.message);
		}

		// Calculăm numărul total de pagini
		const totalItems = countResult.count || 0;
		const totalPages = Math.ceil(totalItems / itemsPerPage);

		// Returnăm itemele și informațiile de paginare
		return {
			items: itemsResult.data as Item[],
			pagination: {
				currentPage: page,
				totalPages,
				totalItems,
				itemsPerPage,
			},
		};
	} catch (error) {
		// În caz de eroare, returnăm un mesaj de eroare și o listă goală
		return {
			error:
				error instanceof Error
					? error.message
					: "A apărut o eroare la încărcarea itemelor.",
			items: [],
			pagination: {
				currentPage: page,
				totalPages: 0,
				totalItems: 0,
				itemsPerPage,
			},
		};
	}
}
