import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [isbn, setIsbn] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = {
      title,
      author,
      pageCount,
      price,
      isbn,
    };
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Book created successfully");
        navigate("/");
        // Handle success, e.g., redirect or show success message
      } else {
        console.error("Error creating book:", response.statusText);
        // Handle error, e.g., display error message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
    <div className="bg-[#212121] ">
      <div className="container mx-auto mt-4 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold flex justify-center text-[#FFFFFF] mb-10">
          Create Book
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="bg-[#333333] p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                <label className="block text-[#FFFFFF] mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-[#444444] text-[#FFFFFF] border border-[#444444] py-2 px-4 w-full"
                  placeholder="Enter book title"
                />
              </div>
              <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                <label className="block text-[#FFFFFF] mb-2" htmlFor="author">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-[#444444] text-[#FFFFFF] border border-[#444444] py-2 px-4 w-full"
                  placeholder="Enter book author"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                <label className="block text-[#FFFFFF] mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-[#444444] text-[#FFFFFF] border border-[#444444] py-2 px-4 w-full"
                  placeholder="Enter book price"
                />
              </div>
              <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                <label className="block text-[#FFFFFF] mb-2" htmlFor="pages">
                  Pages
                </label>
                <input
                  type="number"
                  id="pages"
                  value={pageCount}
                  onChange={(e) => setPageCount(e.target.value)}
                  className="bg-[#444444] text-[#FFFFFF] border border-[#444444] py-2 px-4 w-full"
                  placeholder="Enter book pages"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-4 mb-6">
              <div className="w-full p-4">
                <label className="block text-[#FFFFFF] mb-2" htmlFor="isbn">
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  className="bg-[#444444] text-[#FFFFFF] border border-[#444444] py-2 px-4 w-full"
                  placeholder="Enter book ISBN"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Create Book
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateBook;
