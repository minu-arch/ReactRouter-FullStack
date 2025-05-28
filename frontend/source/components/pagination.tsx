import { Button } from "@/components/ui/button";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

export type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	showPageNumbers?: boolean;
	showFirstLast?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
};

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	showPageNumbers = true,
	showFirstLast = true,
	size = "md",
	className = "",
}: PaginationProps) {
	// Asigurăm că paginile sunt în limite valide
	const safePage = Math.max(1, Math.min(currentPage, totalPages));

	// Determinăm ce pagini să afișăm
	const getPageNumbers = () => {
		const pageNumbers = [];

		// Pentru un număr mic de pagini, afișăm toate numerele
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
			return pageNumbers;
		}

		// Pentru un număr mare de pagini, afișăm o selecție
		// Întotdeauna afișăm prima și ultima pagină
		// Afișăm paginile din jurul paginii curente

		// Adăugăm prima pagină
		pageNumbers.push(1);

		// Adăugăm elipsa sau pagina 2 dacă pagina curentă este aproape de început
		if (safePage > 3) {
			pageNumbers.push("ellipsis-start");
		} else if (safePage >= 2) {
			pageNumbers.push(2);
		}

		// Adăugăm paginile din jurul paginii curente
		const startPage = Math.max(2, safePage - 1);
		const endPage = Math.min(totalPages - 1, safePage + 1);

		for (let i = startPage; i <= endPage; i++) {
			// Evităm duplicatele
			if (i > 1 && i < totalPages && !pageNumbers.includes(i)) {
				pageNumbers.push(i);
			}
		}

		// Adăugăm elipsa sau penultima pagină dacă pagina curentă este aproape de sfârșit
		if (safePage < totalPages - 2) {
			pageNumbers.push("ellipsis-end");
		} else if (safePage <= totalPages - 1) {
			pageNumbers.push(totalPages - 1);
		}

		// Adăugăm ultima pagină
		if (totalPages > 1) {
			pageNumbers.push(totalPages);
		}

		return pageNumbers;
	};

	// Configurăm dimensiunile butoanelor
	const getSizeClass = () => {
		switch (size) {
			case "sm":
				return "h-8 w-8 text-xs";
			case "lg":
				return "h-12 w-12 text-base";
			default:
				return "h-10 w-10 text-sm";
		}
	};

	const buttonSize = getSizeClass();
	const pageNumbers = getPageNumbers();

	if (totalPages <= 1) return null;

	return (
		<div className={`flex items-center justify-center space-x-2 ${className}`}>
			{showFirstLast && (
				<Button
					variant="outline"
					size="icon"
					className={buttonSize}
					onClick={() => onPageChange(1)}
					disabled={safePage === 1}
					aria-label="Prima pagină"
				>
					<ChevronsLeft className="h-4 w-4" />
				</Button>
			)}

			<Button
				variant="outline"
				size="icon"
				className={buttonSize}
				onClick={() => onPageChange(safePage - 1)}
				disabled={safePage === 1}
				aria-label="Pagina anterioară"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{showPageNumbers &&
				pageNumbers.map((page) => {
					// Dacă este elipsă, afișăm un separator
					if (page === "ellipsis-start" || page === "ellipsis-end") {
						return (
							<span key={`${page}`} className="px-2">
								&hellip;
							</span>
						);
					}

					// Altfel, afișăm butonul pentru pagină
					return (
						<Button
							key={`page-${page}`}
							variant={page === safePage ? "default" : "outline"}
							size="icon"
							className={buttonSize}
							onClick={() => onPageChange(page as number)}
							aria-label={`Pagina ${page}`}
							aria-current={page === safePage ? "page" : undefined}
						>
							{page}
						</Button>
					);
				})}

			{!showPageNumbers && (
				<span className="text-sm font-medium">
					{safePage} din {totalPages}
				</span>
			)}

			<Button
				variant="outline"
				size="icon"
				className={buttonSize}
				onClick={() => onPageChange(safePage + 1)}
				disabled={safePage === totalPages}
				aria-label="Pagina următoare"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>

			{showFirstLast && (
				<Button
					variant="outline"
					size="icon"
					className={buttonSize}
					onClick={() => onPageChange(totalPages)}
					disabled={safePage === totalPages}
					aria-label="Ultima pagină"
				>
					<ChevronsRight className="h-4 w-4" />
				</Button>
			)}
		</div>
	);
}
