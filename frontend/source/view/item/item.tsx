import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	itemAction as action,
	itemLoader as loader,
	useItemActions,
} from "@/view/item/hook";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";

export function meta() {
	return [
		{ title: "Edit item" },
		{ name: "description", content: "Editare item" },
	];
}

// Exportăm loader și action pentru a fi utilizate de React Router
export { loader, action };

export default function Item() {
	const { item, error } = useLoaderData<typeof loader>();
	const navigate = useNavigate();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Folosim hook-ul custom pentru operațiuni optimiste
	const { fetcher, isUpdating, isDeleting, hasUpdated } = useItemActions();

	if (error) {
		return (
			<div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>
		);
	}

	return (
		<div className="max-w-md mx-auto">
			<h2 className="text-2xl font-bold text-red-800 mb-4">Edit Item</h2>
			{fetcher.data?.error && (
				<div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
					{fetcher.data.error}
				</div>
			)}
			{hasUpdated && (
				<div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
					Item updated successfully!
				</div>
			)}

			<fetcher.Form method="post" className="space-y-4" id="itemForm">
				<Card className="p-4 ">
					<div className="flex flex-col gap-2">
						<Label className="block text-foreground">Title</Label>
						<Input
							name="title"
							type="text"
							defaultValue={item.title}
							className="border border-gray-300 rounded px-3 py-2 w-full text-foreground"
							required
							disabled={isUpdating || isDeleting}
						/>
					</div>
					<div className="flex flex-col gap-2 mt-4">
						<Label className="block text-foreground">Content</Label>
						<Textarea
							name="description"
							defaultValue={item.description}
							className="border border-gray-300 rounded px-3 py-2 w-full text-foreground"
							required
							disabled={isUpdating || isDeleting}
						/>
					</div>
					<div className="flex justify-between mt-6">
						<div className="flex space-x-4">
							<Button
								type="submit"
								name="intent"
								value="update"
								variant="default"
								className="bg-foreground hover:bg-foreground/70"
								disabled={isUpdating || isDeleting}
							>
								{isUpdating ? "Updating..." : "Update"}
							</Button>

							<Dialog
								open={showDeleteDialog}
								onOpenChange={setShowDeleteDialog}
							>
								<DialogTrigger asChild>
									<Button
										type="button"
										variant="destructive"
										onClick={() => setShowDeleteDialog(true)}
										disabled={isUpdating || isDeleting}
									>
										{isDeleting ? "Deleting..." : "Delete"}
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Confirm Deletion</DialogTitle>
										<DialogDescription>
											Are you sure you want to delete "{item.title}"? This
											action cannot be undone.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<Button
											variant="outline"
											onClick={() => setShowDeleteDialog(false)}
											disabled={isDeleting}
										>
											Cancel
										</Button>
										<Button
											form="itemForm"
											type="submit"
											name="intent"
											value="delete"
											variant="destructive"
											onClick={() => setShowDeleteDialog(false)}
											disabled={isDeleting}
										>
											{isDeleting ? "Deleting..." : "Delete"}
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>

						<Button variant="outline" onClick={() => navigate(-1)}>
							Back
						</Button>
					</div>
				</Card>
			</fetcher.Form>
		</div>
	);
}
