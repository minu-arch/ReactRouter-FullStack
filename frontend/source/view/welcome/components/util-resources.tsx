import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { resources } from "../resources";

export default function UtilResources() {
	return (
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
	);
}
