import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    bookTitle: "",
    authorName: "",
    isbn: "",
    category: "",
    publicationYear: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/books", {
        ...formData,
        publicationYear: Number(formData.publicationYear)
      });

      setMessage("Book added successfully!");

      setFormData({
        bookTitle: "",
        authorName: "",
        isbn: "",
        category: "",
        publicationYear: ""
      });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add book.");
    }
  };

  return (
    <div className="container">
      <h1>Library Book Management System</h1>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          type="text"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          required
        />

        <label>Author Name</label>
        <input
          type="text"
          name="authorName"
          value={formData.authorName}
          onChange={handleChange}
          required
        />

        <label>ISBN</label>
        <input
          type="text"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />

        <label>Category</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <label>Publication Year</label>
        <input
          type="number"
          name="publicationYear"
          value={formData.publicationYear}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;