import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Link, useLoaderData } from "react-router"
import logoDark from "./logo-dark.svg"
import logoLight from "./logo-light.svg"
import { resources } from "./resources"

export function meta() {
	return [
		{ title: "Welcome" },
		{ name: "description", content: "Welcome to React Router!" },
	]
}

export function loader() {
	return {
		title: "Welcome",
	}
}

export default function Welcome() {
	const data = useLoaderData()
	console.log("Loader data:", data)

	return (
		<main className="flex flex-col items-center pt-16 pb-4 px-4">
			<div className="flex-1 flex flex-col items-center gap-8 max-w-4xl w-full">
				<header className="flex flex-col items-center gap-6">
					<div className="w-[400px] max-w-[100vw] p-4">
						<img
							src={logoLight}
							alt="React Router"
							className="block w-full dark:hidden"
						/>
						<img
							src={logoDark}
							alt="React Router"
							className="hidden w-full dark:block"
						/>
					</div>
					<h1 className="text-3xl font-bold text-center">
						React Router + Supabase + Shadcn UI
					</h1>
				</header>

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
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
							</ul>
						</CardContent>
						<CardFooter>
							<Button asChild className="w-full">
								<Link to="/items">Vezi lista de iteme</Link>
							</Button>
						</CardFooter>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<span className="mr-2">Resurse utile</span>
								<span className="ml-auto text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
									Documentație
								</span>
							</CardTitle>
							<CardDescription>Link-uri către documentația oficială</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-4">
								{resources.map(({ href, text, icon }) => (
									<li key={href}>
										<a
											className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
											href={href}
											target="_blank"
											rel="noreferrer"
										>
											{icon}
											{text}
										</a>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</section>
			</div>
		</main>
	)
}
