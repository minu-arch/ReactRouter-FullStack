import { Suspense, lazy } from "react"
import { Await, useLoaderData } from "react-router"

// Importăm formularul folosind lazy loading
const AddItemForm = lazy(() => import("./addItemForm"))

// Exportăm acțiunea din componentul formularului
export { action } from "./addItemForm"

export function loader() {
	// Încărcăm componentul în avans
	return {
		// Simulăm un delay pentru a demonstra funcționalitatea Suspense
		loadingPromise: new Promise((resolve) => setTimeout(() => resolve(true), 500)),
	}
}

export default function AddItemPage() {
	useLoaderData<typeof loader>()

	return (
		<div className="p-4">
			<Suspense fallback={<FormSkeleton />}>
				<AddItemForm />
			</Suspense>
		</div>
	)
}

// Schelet pentru formular în timpul încărcării
function FormSkeleton() {
	return (
		<div className="max-w-md mx-auto p-6">
			<div className="h-8 bg-gray-200 rounded w-2/3 mb-6 animate-pulse" />
			<div className="space-y-6">
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
					<div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
				</div>
				<div className="space-y-2">
					<div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
					<div className="h-24 bg-gray-200 rounded w-full animate-pulse" />
				</div>
				<div className="flex justify-end gap-4">
					<div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
					<div className="h-10 bg-gray-200 rounded w-24 animate-pulse" />
				</div>
			</div>
		</div>
	)
}
