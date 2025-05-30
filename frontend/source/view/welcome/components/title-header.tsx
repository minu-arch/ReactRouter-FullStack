import logoDark from "../logo-dark.svg";
import logoLight from "../logo-light.svg";

export default function TitleHeader() {
	return (
		<>
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
		</>
	);
}
