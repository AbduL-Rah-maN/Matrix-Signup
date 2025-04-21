import { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../api.js"; 

export default function DashRight() {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (err) {
      console.error("Failed to fetch items:", err);
    }
  };

  const handleSave = async (item) => {
    try {
      if (item.id) {
        await updateItem(item.id, item);
      } else {
        await addItem(item);
      }
      await loadItems();
      setModalOpen(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Failed to save item:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      await loadItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">CRUD Dashboard</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => {
              setModalOpen(true);
              setEditingItem(null);
            }}
          >
            + Add Item
          </button>
        </div>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.description}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <ItemModal
            item={editingItem}
            onSave={handleSave}
            onClose={() => setModalOpen(false)}
          />
        )}
      </div>

      
    </div>
  );
}

function ItemModal({ item, onSave, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  
  useEffect(() => {
    setName(item?.name || "");
    setDescription(item?.description || "");
  }, [item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      id: item?.id || null,  
      name, 
      description 
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          {item?.id ? "Edit Item" : "Add New Item"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}