import { Link } from "react-router";
import { useLoaderData } from "react-router";
import { itemsLoader as loader } from "@/view/item/hook";
import type { Item } from "@/view/item/type";

// Exportăm loader pentru a fi utilizat de React Router
export { loader };

export default function Items() {
  const { error, items } = useLoaderData<typeof loader>();
  return ( 
    <div>
    <h2 className="text-2xl font-bold text-red-800 mb-4"> List of Items</h2>
    {error && (
      <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
        {error}
      </div>
    )}
    <ul className="space-y-4">
      {items?.map((item: Item ) => (

        <li key={item.id} className="p-4 bg-white rounded shadow">
          <Link to={`/item/${item.id}`} className="block text-indigo-600">
            <span className="font-semibold text-xl">{item.title}</span>
            <p className="text-gray-700">{item.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
}