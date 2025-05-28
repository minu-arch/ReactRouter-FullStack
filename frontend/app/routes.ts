import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
	index("../source/view/home.tsx"),
	route("/welcome", "../source/view/welcome/welcome.tsx"),
	route("/items", "../source/view/item/items.tsx"),
	route("/new-item", "../source/view/item/new-item.tsx"),
	route("/item/:id", "../source/view/item/item.tsx"),
	route("/add-item", "../source/view/item/addItem/index.tsx"),
] satisfies RouteConfig
