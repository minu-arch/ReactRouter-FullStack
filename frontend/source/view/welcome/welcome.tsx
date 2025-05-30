import { useLoaderData } from "react-router";
import ImplementedFunctions from "./components/implemented-functions";
import TitleHeader from "./components/title-header";
import UtilResources from "./components/util-resources";

export function meta() {
	return [
		{ title: "Welcome" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export function loader() {
	return {
		title: "Welcome",
	};
}

export default function Welcome() {
	const data = useLoaderData();
	console.log("Loader data:", data);

	return (
		<main className="flex flex-col items-center pt-16 pb-4 px-4">
			<div className="flex-1 flex flex-col items-center gap-8 max-w-4xl w-full">
				<header className="flex flex-col items-center gap-6">
					<TitleHeader />
				</header>

				<section className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
					<ImplementedFunctions />
					<UtilResources />
				</section>
			</div>
		</main>
	);
}
