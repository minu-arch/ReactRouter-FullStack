import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("../source/view/home.tsx"),
	route("/welcome", "../source/view/welcome/welcome.tsx"),

	// Rutele pentru iteme
	route("/items", "../source/view/item/items.tsx"),
	route("/items/:id", "../source/view/item/item.tsx", { id: "items-id" }),
	route("/items/new", "../source/view/item/new-item.tsx", { id: "items-new" }),

	// Păstrăm rutele vechi pentru compatibilitate
	route("/new-item", "../source/view/item/new-item.tsx", { id: "new-item" }),
	route("/item/:id", "../source/view/item/item.tsx", { id: "item-id" }),

	route("/add-item", "../source/view/item/addItem/index.tsx"),

	// Pagina de 404 - va fi afișată pentru orice rută necunoscută
	route("*", "../source/view/not-found.tsx"),
] satisfies RouteConfig;
