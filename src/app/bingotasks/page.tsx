"use client";

import { useEffect, useState } from "react";

interface BingoTask {
  id: number;
  name: string;
  description: string;
  url: string;
}

export default function BingoTasks() {
  const [tasks, setTasks] = useState<BingoTask[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", url: "" });

  const getAllTasks = async () => {
    const response = await fetch("/api/bingoboardtasks");
    const tasks = await response.json();
    setTasks(tasks);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bingoboardtasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create bingo task");

      await getAllTasks(); // Refresh task list
      setIsModalOpen(false); // Close modal after submission
      setFormData({ name: "", description: "", url: "" }); // Reset form
    } catch (error) {
      console.error("Error creating bingo task:", error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
      >
        Create Task
      </button>

      <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Image</th>
            <th className="px-4 py-2 border-b">URL</th>
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id} className="hover:bg-yellow-700">
                <td className="px-4 py-2 border-b">{task.name}</td>
                <td className="px-4 py-2 border-b">{task.description}</td>
                <td className="px-4 py-2 border-b">
                  <img src={task.url} alt={task.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-4 py-2 border-b text-center">{task.url}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-700 p-6 rounded-lg shadow-md w-80">
            <h2 className="text-lg font-bold text-white mb-4">New Bingo Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-white">
                  Task Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border-4 border-grey-1200 rounded focus:outline-none focus:border-yellow-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-white">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border-4 border-grey-1200 rounded focus:outline-none focus:border-yellow-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="block text-sm font-medium text-white">
                  Image URL
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border-4 border-grey-1200 rounded focus:outline-none focus:border-yellow-700 text-white"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-yellow-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
