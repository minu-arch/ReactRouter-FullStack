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

// Array cu funcționalitățile implementate
const implementedFeatures = [
	{
		id: "data-api",
		icon: "🚀",
		text: "Liste de iteme cu React Router Data API",
	},
	{
		id: "dynamic-params",
		icon: "🔗",
		text: "Navigare cu parametri dinamici",
	},
	{
		id: "shadcn",
		icon: "🎨",
		text: "Componente moderne cu Shadcn UI",
	},
	{
		id: "supabase",
		icon: "⚡",
		text: "Supabase pentru backend și autentificare",
	},
	{
		id: "fetcher",
		icon: "⚙️",
		text: "Fetcher API pentru operațiuni optimiste",
	},
	{
		id: "scroll",
		icon: "📱",
		text: "Scroll restoration inteligent",
	},
	{
		id: "routing",
		icon: "🧩",
		text: "Rutare avansată cu organizare optimizată",
	},
	{
		id: "404",
		icon: "🔍",
		text: "Pagină 404 personalizată",
	},
];

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
					{implementedFeatures.map((feature) => (
						<li key={feature.id} className="flex items-center">
							<span className="mr-2 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm">
								{feature.icon}
							</span>
							<span>{feature.text}</span>
						</li>
					))}
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
