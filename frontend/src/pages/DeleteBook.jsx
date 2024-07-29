import { useState } from "react"; // Import useEffect
// import RingLoader from "react-spinners/RingLoader";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); // Use clear variable name

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "DELETE",
      });

      if (response.status === 200) {
        // Check for successful deletion
        console.log("Book deleted successfully!");
        navigate("/"); // Redirect to home page after successful deletion
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of outcome
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-[#212121] bg-opacity-50 flex justify-center items-center">
      {/* {isLoading ? (
        <div className="flex justify-center align-middle item-center">
          <RingLoader size={200} />
        </div>
      ) : (
        ""
      )} */}
      <div className="bg-[#333333] rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Delete Book</h2>
        <p className="text-lg text-[#FFFFFF] mb-6">
          Are you sure you want to delete this book?
        </p>
        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleDelete} // Call handleDelete here
          >
            Delete
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
