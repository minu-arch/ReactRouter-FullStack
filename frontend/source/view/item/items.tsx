import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { itemsLoader as loader } from "@/view/item/hook";
import type { Item } from "@/view/item/type";
import {
	Link,
	useLoaderData,
	useNavigate,
	useNavigation,
	useSearchParams,
} from "react-router";

// Exportăm loader pentru a fi utilizat de React Router
export { loader };

export default function Items() {
	const { error, items, pagination } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const navigation = useNavigation();

	// Afișăm indicator de încărcare în timpul navigației
	const isLoading = navigation.state === "loading";

	// Handler pentru schimbarea paginii
	const handlePageChange = (page: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", page.toString());
		navigate(`?${params.toString()}`);
	};

	// Handler pentru schimbarea numărului de iteme pe pagină
	const handleItemsPerPageChange = (value: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("per_page", value);
		params.set("page", "1"); // Resetăm la prima pagină când schimbăm numărul de iteme
		navigate(`?${params.toString()}`);
	};

	return (
		<>
			<div className="flex justify-between items-center mb-6">
				<CardTitle className="text-2xl font-bold text-red-800">
					List of Items
				</CardTitle>
			</div>

			{isLoading && (
				<div className="flex justify-center my-8">
					<div className="animate-spin rounded-full size-10 border-t-2 border-b-2 border-indigo-600" />
				</div>
			)}

			{error && (
				<div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>
			)}

			{items?.length === 0 && !isLoading && (
				<div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
					<p className="text-gray-500 mb-4">Nu există iteme în listă</p>
					<Button asChild variant="outline">
						<Link to="/add-item">Adaugă primul item</Link>
					</Button>
				</div>
			)}

			{items && items.length > 0 && !isLoading && (
				<>
					<ul className="space-y-4 mb-6">
						{items.map((item: Item) => (
							<Card key={item.id} className="mb-4">
								<Link
									to={`/item/${item.id}`}
									className="block"
									preventScrollReset
								>
									<CardHeader>
										<CardTitle className="text-indigo-600">
											{item.title}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-gray-700">
											{item.description}
										</CardDescription>
									</CardContent>
								</Link>
							</Card>
						))}
					</ul>

					{/* Adăugăm componenta de paginare */}
					{pagination && pagination.totalPages > 0 && (
						<div className="mt-8">
							<div className="flex justify-between items-center mb-2">
								<div className="text-sm text-gray-500">
									Afișare{" "}
									{pagination.currentPage * pagination.itemsPerPage -
										pagination.itemsPerPage +
										1}{" "}
									-{" "}
									{Math.min(
										pagination.currentPage * pagination.itemsPerPage,
										pagination.totalItems,
									)}{" "}
									din {pagination.totalItems} iteme
								</div>
								{/* Selector pentru numărul de iteme per pagină */}
								{items && items.length > 0 && (
									<div className="flex items-center gap-2">
										<span className="text-sm text-gray-500">
											Iteme per pagină:
										</span>
										<select
											value={pagination.itemsPerPage.toString()}
											onChange={(e) => handleItemsPerPageChange(e.target.value)}
											className="border rounded px-2 py-1 text-sm"
										>
											<option value="5">5</option>
											<option value="10">10</option>
											<option value="25">25</option>
											<option value="50">50</option>
										</select>
									</div>
								)}
							</div>
							<Pagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
								onPageChange={handlePageChange}
								size="md"
								showPageNumbers={true}
								showFirstLast={true}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
}
