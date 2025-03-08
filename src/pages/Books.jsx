import React, { useState, useEffect } from "react";
import BookEntry from "../components/BookEntry";

function Books() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/books");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Ensure we always have an array
      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // Set empty array on error
    }
  };

  const handleAddBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newBook.name,
          author: newBook.author,
          description: "No description provided",
          price: parseFloat(newBook.price),
          image_url: null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add book");
      }

      const addedBook = await response.json();
      setBooks((prevBooks) => [...prevBooks, addedBook]);
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/books/${bookId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      // Remove the book from the local state
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleUpdateBook = async (bookId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update book");
      }

      const updatedBook = await response.json();
      setBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === bookId ? updatedBook : book))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const openEditModal = (book) => {
    setEditingBook({
      ...book,
      name: book.title,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <section className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-12 text-center">Books</h1>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
          {/* Book Entry Form */}
          <div className="lg:w-1/2">
            <BookEntry onAddBook={handleAddBook} />
          </div>

          {/* Books List */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Book List</h2>
              {books.length === 0 ? (
                <p className="text-gray-500 text-center">No books added yet.</p>
              ) : (
                <div className="space-y-4">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {book.title}
                          </h3>
                          <p className="text-gray-600">by {book.author}</p>
                          <p className="text-gray-800 font-medium mt-2">
                            {book.description}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openEditModal(book)}
                            className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Edit Modal */}
      {isEditModalOpen && editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Edit Book</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateBook(editingBook.id, {
                  title: editingBook.name,
                  author: editingBook.author,
                  description: editingBook.description,
                  price: editingBook.price,
                  image_url: editingBook.image_url,
                });
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Book Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={editingBook.name}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={editingBook.author}
                  onChange={(e) =>
                    setEditingBook({ ...editingBook, author: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editingBook.description}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editingBook.price}
                  onChange={(e) =>
                    setEditingBook({
                      ...editingBook,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Books;
