import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import RingLoader from "react-spinners/RingLoader";

const DetailsBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState({});
  const { id } = useParams();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/books/${id}`, {
        method: "GET",
      });
      const responseData = await response.json();
      console.log(responseData);
      setBook(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="bg-[#212121] ">
      <div className="container mx-auto mt-4 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold flex justify-center text-[#FFFFFF] mb-10">
          Book Details
        </h1>
        {/* {loading ? (
          <div className="flex justify-center align-middle item-center">
            <RingLoader size={200} />
          </div>
        ) : (
          ""
        )} */}
        <div className="bg-[#333333] p-4 md:p-6 lg:p-8 rounded-lg shadow-md">
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 xl:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Title</h2>
              <p className="text-lg text-[#FFFFFF]">{book.title}</p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Author</h2>
              <p className="text-lg text-[#FFFFFF]">{book.author}</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full md:w-1/2 xl:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">ISBN</h2>
              <p className="text-lg text-[#FFFFFF]">{book.isbn}</p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/2 p-4">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">
                Book Pages
              </h2>
              <p className="text-lg text-[#FFFFFF]">{book.pageCount}</p>
            </div>
          </div>
          <div className="flex flex-wrap -mx-4 mb-6">
            <div className="w-full p-4">
              <h2 className="text-2xl font-bold text-[#FFFFFF] mb-4">Price</h2>
              <p className="text-lg text-[#FFFFFF]">{book.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBook;
