import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";

export default function ImplementedFunctions() {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<span className="mr-2">Funcționalități implementate</span>
					<span className="ml-auto text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
						Shadcn UI
					</span>
				</CardTitle>
				<CardDescription>Ce am adăugat până acum în aplicație</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2">
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							🚀
						</span>
						<span>Liste de iteme cu React Router Data API</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							🔗
						</span>
						<span>Navigare cu parametri dinamici</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							🎨
						</span>
						<span>Componente moderne cu Shadcn UI</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							⚡
						</span>
						<span>Supabase pentru backend și autentificare</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							⚙️
						</span>
						<span>Fetcher API pentru operațiuni optimiste</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							📱
						</span>
						<span>Scroll restoration inteligent</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							🧩
						</span>
						<span>Rutare avansată cu organizare optimizată</span>
					</li>
					<li className="flex items-center">
						<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
							🔍
						</span>
						<span>Pagină 404 personalizată</span>
					</li>
				</ul>
			</CardContent>
			<CardFooter>
				<Button asChild className="w-full">
					<Link to="/items">Vezi lista de iteme</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
