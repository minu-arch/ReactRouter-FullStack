import { Link } from "react-router"
import { useLoaderData } from "react-router"
import { itemsLoader as loader } from "@/view/item/hook"
import type { Item } from "@/view/item/type"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

// Exportăm loader pentru a fi utilizat de React Router
export { loader }

export default function Items() {
	const { error, items } = useLoaderData<typeof loader>()
	return (
		<>
			<CardTitle className="text-2xl font-bold text-red-800 mb-4">
				{" "}
				List of Items
			</CardTitle>
			{error && <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>}
			<ul className="space-y-4">
				{items?.map((item: Item) => (
					<Card key={item.id} className="mb-4">
						<Link to={`/item/${item.id}`} className="block">
							<CardHeader>
								<CardTitle className="text-indigo-600">{item.title}</CardTitle>
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
		</>
	)
}
