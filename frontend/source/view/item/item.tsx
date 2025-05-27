import { Form, useLoaderData, useActionData, useNavigate } from "react-router";
import { itemLoader as loader, itemAction as action } from "@/view/item/hook";

// Exportăm loader și action pentru a fi utilizate de React Router
export { loader, action };

export default function Item() {
  const { item, error } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  
  if (error) {
    return <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-red-800 mb-4">Edit Item</h2>
      {actionData?.error && (
        <div className="bg-red-200 text-red-800 p-2 mb-4 rounded">
          {actionData.error}
        </div>
      )}
      {actionData?.updated && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          Item updated successfully!
        </div>
      )}
      {actionData?.deleted && (
        <div className="bg-green-200 text-green-800 p-2 mb-4 rounded">
          Item deleted successfully!
        </div>
      )}
      <Form method="post" className="space-y-4 bg-white p-4 rounded shadow">
        
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            name="title"
            type="text"
            defaultValue={item.title}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            name="description"
            defaultValue={item.description}
            className="border border-gray-300 rounded px-3 py-2 w-full text-black"
            required
          />
        </div>
        <div className="flex justify-between">
          <div  className="flex space-x-4">
              <button
            type="submit"
            name="intent"
            value="update"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Update
          </button>
          <button
            type="submit"
            name="intent"
            value="delete"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Delete
          </button>
          </div>
        
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500" onClick={() => navigate(-1)}>Back</button>
        </div>
      </Form>
    </div>
  );
}