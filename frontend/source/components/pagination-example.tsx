import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Pagination } from "./pagination";

/**
 * Exemplu de utilizare a componentei Pagination
 *
 * Acest exemplu demonstrează cum să folosiți componenta Pagination
 * în aplicațiile voastre:
 *
 * 1. Păstrați starea paginii curente (currentPage)
 * 2. Definiți un handler pentru schimbarea paginii
 * 3. Afișați componenta Pagination cu proprietățile necesare
 *
 * Puteți personaliza cum arată paginarea folosind proprietățile:
 * - showPageNumbers (true/false): afișează/ascunde numerele paginilor
 * - showFirstLast (true/false): afișează/ascunde butoanele pentru prima/ultima pagină
 * - size ("sm" | "md" | "lg"): dimensiunea butoanelor
 */

// Tipurile de variante de paginare disponibile
type PaginationVariant = "standard" | "small" | "large" | "simple" | "minimal";

export function PaginationExample() {
	const [currentPage, setCurrentPage] = useState(1);
	const [variant, setVariant] = useState<PaginationVariant>("standard");
	const totalPages = 10; // Total de pagini disponibile

	// Handler pentru schimbarea paginii
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		console.log(`Navigat la pagina: ${page}`);
		// Aici puteți adăuga logica pentru a încărca datele pentru pagina respectivă
	};

	// Configurația pentru fiecare variantă
	const variantConfig = {
		standard: {
			size: "md" as const,
			showPageNumbers: true,
			showFirstLast: true,
			label: "Paginare standard",
		},
		small: {
			size: "sm" as const,
			showPageNumbers: true,
			showFirstLast: true,
			label: "Paginare mică",
		},
		large: {
			size: "lg" as const,
			showPageNumbers: true,
			showFirstLast: true,
			label: "Paginare mare",
		},
		simple: {
			size: "md" as const,
			showPageNumbers: false,
			showFirstLast: true,
			label: "Paginare simplificată (fără numere)",
		},
		minimal: {
			size: "md" as const,
			showPageNumbers: true,
			showFirstLast: false,
			label: "Paginare minimală (fără prima/ultima)",
		},
	};

	// Configurația curentă
	const currentConfig = variantConfig[variant];

	return (
		<Card className="w-full max-w-3xl mx-auto">
			<CardHeader>
				<CardTitle>Exemplu de Paginare</CardTitle>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="p-4 border rounded bg-gray-50">
					<h3 className="font-medium mb-2">Pagina curentă: {currentPage}</h3>
					<p>Conținutul paginii ar apărea aici. Acesta este doar un exemplu.</p>
				</div>

				<div className="space-y-4">
					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
						<Label htmlFor="variant-select" className="min-w-24">
							Alege varianta:
						</Label>
						<select
							id="variant-select"
							className="border border-gray-200 rounded p-2 w-full sm:w-auto"
							value={variant}
							onChange={(e) => setVariant(e.target.value as PaginationVariant)}
						>
							<option value="standard">Standard</option>
							<option value="small">Mică</option>
							<option value="large">Mare</option>
							<option value="simple">Simplificată</option>
							<option value="minimal">Minimală</option>
						</select>
					</div>

					<div className="border-t pt-4">
						<h4 className="text-sm font-medium mb-4">{currentConfig.label}</h4>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
							size={currentConfig.size}
							showPageNumbers={currentConfig.showPageNumbers}
							showFirstLast={currentConfig.showFirstLast}
						/>
					</div>

					<div className="mt-6 text-sm bg-blue-50 p-4 rounded border border-blue-100">
						<h5 className="font-medium text-blue-700 mb-2">
							Proprietăți utilizate:
						</h5>
						<pre className="overflow-auto bg-white p-2 rounded text-xs">
							{`<Pagination
  currentPage={${currentPage}}
  totalPages={${totalPages}}
  onPageChange={handlePageChange}
  size="${currentConfig.size}"
  showPageNumbers={${currentConfig.showPageNumbers}}
  showFirstLast={${currentConfig.showFirstLast}}
/>`}
						</pre>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
