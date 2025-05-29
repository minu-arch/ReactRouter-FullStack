import {
	Links,
	Meta,
	NavLink,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useNavigate,
	useRouteError,
} from "react-router";

import type { Route } from "./+types/root";
import "../source/theme/theme.css";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ui/theme-provider";
import NavBar from "../source/components/nav-bar";
import NotFound from "../source/view/not-found";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="darkreader-lock" content="true" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return (
		<ThemeProvider defaultTheme="dark">
			<div className="flex flex-col min-h-screen">
				<NavBar />
				<main className="container mx-auto p-4 flex-grow">
					<Outlet />
				</main>
				<footer className="container mx-auto p-4 text-center text-gray-500 text-sm mt-auto border-t">
					&copy; {new Date().getFullYear()} React Router + Supabase App
				</footer>
			</div>
		</ThemeProvider>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();
	const navigate = useNavigate();

	// Verificăm dacă este o eroare de rută (cum ar fi 404)
	if (isRouteErrorResponse(error) && error.status === 404) {
		return (
			<ThemeProvider defaultTheme="dark">
				<div className="flex flex-col min-h-screen">
					<NavBar />
					<main className="container mx-auto p-4 flex-grow">
						<NotFound />
					</main>
					<footer className="container mx-auto p-4 text-center text-gray-500 text-sm mt-auto border-t">
						&copy; {new Date().getFullYear()} React Router + Supabase App
					</footer>
				</div>
			</ThemeProvider>
		);
	}

	// Pentru alte erori, afișăm un mesaj general de eroare
	let message = "Oops!";
	let details = "A apărut o eroare neașteptată.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = `Eroare ${error.status}`;
		details = error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<ThemeProvider defaultTheme="dark">
			<div className="flex flex-col min-h-screen">
				<NavBar />
				<main className="container mx-auto p-4 flex-grow">
					<div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
						<div className="mb-8 text-5xl font-extrabold text-red-600">
							{message}
						</div>
						<p className="mb-8 text-lg text-gray-600 dark:text-gray-400 max-w-md">
							{details}
						</p>
						{stack && import.meta.env.DEV && (
							<pre className="w-full p-4 overflow-x-auto text-xs text-left bg-gray-100 dark:bg-gray-800 rounded mb-8">
								<code>{stack}</code>
							</pre>
						)}
						<Button onClick={() => navigate("/welcome")}>
							Înapoi la pagina principală
						</Button>
					</div>
				</main>
				<footer className="container mx-auto p-4 text-center text-gray-500 text-sm mt-auto border-t">
					&copy; {new Date().getFullYear()} React Router + Supabase App
				</footer>
			</div>
		</ThemeProvider>
	);
}
