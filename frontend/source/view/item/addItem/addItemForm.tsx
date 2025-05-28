import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib"
import type { Item } from "@/view/item/type"
import { useState } from "react"
import { Form, useActionData, useNavigate, useNavigation } from "react-router"

// Acțiunea pentru salvarea unui item nou
export async function action({ request }: { request: Request }) {
	// Așteptăm puțin pentru a simula o operație asincronă
	await new Promise((resolve) => setTimeout(resolve, 500))

	const formData = await request.formData()
	const title = formData.get("title") as string
	const description = formData.get("description") as string

	// Validare simplă
	if (!title || title.length < 3) {
		return { error: "Titlul trebuie să aibă cel puțin 3 caractere" }
	}

	if (!description || description.length < 10) {
		return { error: "Descrierea trebuie să aibă cel puțin 10 caractere" }
	}

	// Salvăm în Supabase
	const { data, error } = await supabase
		.from("items")
		.insert([{ title, description }])
		.select()

	if (error) {
		return { error: error.message }
	}

	return { success: true, item: data[0] as Item }
}

export default function AddItemForm() {
	const actionData = useActionData<typeof action>()
	const navigation = useNavigation()
	const navigate = useNavigate()
	const [formError, setFormError] = useState<string | null>(null)

	const isSubmitting = navigation.state === "submitting"

	// Dacă acțiunea a reușit, redirecționăm către pagina de iteme
	if (actionData?.success) {
		navigate("/items")
	}

	return (
		<div className="max-w-md mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Adaugă un item nou</h1>

			{(actionData?.error || formError) && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
					{actionData?.error || formError}
				</div>
			)}

			<Form method="post" className="space-y-6" onSubmit={() => setFormError(null)}>
				<div className="space-y-2">
					<Label htmlFor="title">Titlu</Label>
					<Input
						id="title"
						name="title"
						placeholder="Introdu titlul"
						required
						className="w-full"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="description">Descriere</Label>
					<Textarea
						id="description"
						name="description"
						placeholder="Introdu descrierea"
						required
						rows={4}
						className="w-full"
					/>
				</div>

				<div className="flex justify-end gap-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => navigate("/items")}
						disabled={isSubmitting}
					>
						Anulează
					</Button>
					<Button type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Se salvează..." : "Salvează"}
					</Button>
				</div>
			</Form>
		</div>
	)
}
