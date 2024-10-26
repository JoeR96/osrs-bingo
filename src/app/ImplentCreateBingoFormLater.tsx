"use client";

import { useState } from "react";

const CreateBingoBoard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/bingoboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create bingo board");

      const newBoard = await response.json();
      console.log("New bingo board created:", newBoard);
      setIsModalOpen(false); // Close modal after submission
      setFormData({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error creating bingo board:", error);
    }
  };

  return (
    <>
  <button 
    onClick={() => setIsModalOpen(true)} 
    className="px-4 py-2 text-white bg-black rounded hover:bg-gray-700"
  >
    Create Bingo Board
    </button>

    {isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-gray-700 p-6 rounded-lg shadow-md w-80">
          <h2 className="text-lg font-bold text-white mb-4">New Bingo Board</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Board Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-black border-4 border-grey-1200 rounded focus:outline-none focus:border-yellow-700 text-white-700"
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
                className="w-full p-3 bg-black border-4 border-grey-1200 rounded focus:outline-none focus:border-yellow-700 text-white-700"
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
              <button type="submit" className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-yellow-700 transition">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </>
  );
};

export default CreateBingoBoard;
