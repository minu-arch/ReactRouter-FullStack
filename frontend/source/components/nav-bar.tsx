import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/welcome" className="text-2xl font-bold text-indigo-600">Home</NavLink>
        <div className="space-x-4">
            <NavLink to="/items" className={({isActive}) => isActive ? "text-indigo-600" : "text-gray-500"}>Items</NavLink>
        <NavLink to="/new-item" className={({isActive}) => isActive ? "text-indigo-600" : "text-gray-500"}>New Item</NavLink>
        </div>
      </div>
    </nav>
  );
}