import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { newItemAction } from "@/view/item/hook"
import { Form, useNavigate } from "react-router"

// Exportăm action pentru a fi utilizat de React Router
export { newItemAction as action }

export default function NewItem() {
	const navigate = useNavigate()
	return (
		<div className="max-w-md mx-auto">
			<h2 className="text-2xl font-bold mb-4 text-red-800">Create New Item</h2>
			<Form method="post" className="space-y-4">
				<Card className="p-4">
					<div className="flex flex-col gap-2">
						<Label className="block text-gray-700 ">Title</Label>
						<Input
							placeholder="Enter title"
							name="title"
							type="text"
							className="border border-gray-300 rounded px-3 py-2 w-full text-black"
							required
						/>
					</div>
					<div className="flex flex-col gap-2">
						<Label className="block text-gray-700">Content</Label>
						<Textarea
							name="description"
							placeholder="Enter description"
							className="border border-gray-300 rounded px-3 py-2 w-full text-black"
							required
						/>
					</div>
					<div className="flex space-x-4">
						<Button
							type="submit"
							variant="secondary"
							className="bg-accent hover:bg-accent/50"
						>
							Create Item
						</Button>
						<Button
							type="button"
							onClick={() => navigate(-1)}
							variant="default"
							className="bg-foreground hover:bg-foreground/70"
						>
							Back
						</Button>
					</div>
				</Card>
			</Form>
		</div>
	)
}
