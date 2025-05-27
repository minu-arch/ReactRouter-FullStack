import { Form, useNavigate } from "react-router";
import { newItemAction } from "@/view/item/hook";

// Exportăm action pentru a fi utilizat de React Router
export { newItemAction as action };

export default function NewItem() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto">
    <h2 className="text-2xl font-bold mb-4">Create New Item</h2>
    <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-gray-700 ">Title</label>
        <input
          name="title"
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Content</label>
        <textarea
          name="description"
          className="border border-gray-300 rounded px-3 py-2 w-full text-black"
          required
        />
      </div>
      <div className="flex space-x-4">
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
      >
        Create Item
      </button>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Back
        </button>
      </div>
    </Form>
  </div>
  )
}