import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import { useNavigate } from "react-router-dom";

const UpdateBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);

  // Get data of Specific Book First
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "GET",
      });
      const responseData = await response.json();
      console.log(responseData);
      setAuthor(responseData.author);
      setPrice(responseData.price);
      setPageCount(responseData.pageCount);
      setIsbn(responseData.isbn);
      setTitle(responseData.title);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, author, price, pageCount, isbn };
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const updatedData = await response.json();
      navigate("/");
      console.log("Book updated successfully:", updatedData);
      setLoading(false);
      // Do something with the updated data, e.g., update state or navigate
    } catch (error) {
      setLoading(false);
      console.error("Error updating book:", error);
      // Handle error, e.g., display error message to user
    }
  };

  return (
    <div className="bg-[#212121] ">
      <div className="container mx-auto mt-4 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold flex justify-center text-[#FFFFFF] mb-10">
          Update Book
        </h1>
        {loading ? (
          <div className="flex justify-center align-middle item-center">
            <RingLoader size={200} />
          </div>
        ) : (
          ""
        )}
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
                Update
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
};
export default UpdateBook;
