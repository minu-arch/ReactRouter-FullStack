import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLocation, useRouteError } from "react-router";
import { Link } from "react-router";

export function meta() {
	return [
		{ title: "Not found" },
		{ name: "description", content: "Page not found" },
	];
}

interface RouteError {
	status: number;
	statusText?: string;
	data?: unknown;
}

export default function NotFound() {
	const error = useRouteError();
	const location = useLocation();
	const [currentPath, setCurrentPath] = useState("");

	// Folosim useEffect pentru a accesa location doar pe partea de client
	useEffect(() => {
		setCurrentPath(location.pathname);
	}, [location]);

	const isRouteError =
		error && typeof error === "object" && error !== null && "status" in error;

	const status = isRouteError ? (error as RouteError).status : 404;
	const message = isRouteError
		? (error as RouteError).statusText || "Pagina pe care o căutați nu există."
		: "Pagina pe care o căutați nu există.";

	return (
		<div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
			<div className="mb-8 text-9xl font-extrabold text-indigo-600">
				{status}
			</div>
			<h1 className="mb-4 text-3xl font-bold">Oops! Pagină negăsită</h1>
			<p className="mb-2 text-lg text-gray-600 dark:text-gray-400 max-w-md">
				{message}
			</p>
			{currentPath && (
				<p className="mb-8 text-sm text-gray-500 dark:text-gray-500 max-w-md">
					<code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
						{currentPath}
					</code>{" "}
					nu este o rută validă în aplicație.
				</p>
			)}

			<div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
				<Button asChild>
					<Link to="/welcome">Înapoi la pagina principală</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link to="/items">Vezi itemele</Link>
				</Button>
			</div>

			<div className="mt-10 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg max-w-md">
				<h2 className="text-lg font-medium mb-2">Sugestii:</h2>
				<ul className="text-left text-sm space-y-2">
					<li>• Verificați dacă URL-ul a fost tastat corect</li>
					<li>• Încercați să navigați folosind meniul de navigare</li>
					<li>• Încercați una dintre paginile populare de mai jos:</li>
				</ul>
				<div className="mt-4 flex flex-wrap gap-2 text-sm">
					<Link to="/welcome" className="text-indigo-600 hover:underline">
						Acasă
					</Link>
					<Link to="/items" className="text-indigo-600 hover:underline">
						Lista de iteme
					</Link>
					<Link to="/items/new" className="text-indigo-600 hover:underline">
						Item nou
					</Link>
				</div>
			</div>
		</div>
	);
}
