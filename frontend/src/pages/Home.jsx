import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by"); // Default selected option
  //Pagination

  const page = 1;
  const limit = 10;
  //
  const options = [
    { value: "Asc Title", label: "Title Ascending" },
    { value: "Dsc Title", label: "Title Descending" },
    { value: "Asc Price", label: "Price Ascending" },
    { value: "Dsc Price", label: "Price Descending" },
  ];
  const handleItemClick = (option) => {
    if (option.value === "Asc Title") {
      const sortedBooks = [...books].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setBooks(sortedBooks);
    } else if (option.value === "Dsc Title") {
      const sortedBooks = [...books].sort((a, b) =>
        b.title.localeCompare(a.title)
      );
      setBooks(sortedBooks);
    } else if (option.value === "Asc Price") {
      const sortedBooks = [...books].sort((a, b) => a.price - b.price);
      setBooks(sortedBooks);
    } else if (option.value === "Dsc Price") {
      const sortedBooks = [...books].sort((a, b) => b.price - a.price);
      setBooks(sortedBooks);
    }
    setSelectedOption(option.value);
    setIsOpen(false);
    console.log(option);
  };
  const handleNormal = () => {
    setSearch("");
    fetchData();
    setIsOpen(false);
    setSelectedOption("Sort By");
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      // const response = await fetch("http://127.0.0.1:3000/books");
      const response = await fetch(
        `http://127.0.0.1:3000/books?page=${page}&limit=${limit}`
      );

      const responseData = await response.json();
      console.log(responseData);
      setBooks(responseData);
      console.log(typeof books);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(search);
  return (
    <>
      <div className="bg-[#212121] ">
        <div className="container mx-auto mt-4 p-4 md:p-6 lg:p-8">
          <h1 className="text-3xl font-bold flex justify-center text-[#FFFFFF] mb-10">
            Book Store
          </h1>
          {loading ? (
            <div className="flex justify-center align-middle item-center">
              <RingLoader size={200} />
            </div>
          ) : (
            <>
              <div className="max-w-md mx-auto p-4 ">
                <label
                  htmlFor="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 bg-[#333333] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Books by Name"
                    required
                  />
                </div>
                <div className="flex justify-center items-center">
                  <div className="p-4 ">
                    <button
                      className=" text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleNormal}
                    >
                      Reset Books
                    </button>
                  </div>
                  <div className="">
                    <div className="relative inline-block text-left">
                      <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#333333] text-white text-sm font-medium  "
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        aria-expanded="false"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {selectedOption}
                      </button>
                      {isOpen && (
                        <div
                          className="z-10 absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          <div className="py-1" role="none">
                            {options.map((option) => (
                              <a
                                key={option.value}
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                role="menuitem"
                                onClick={() => handleItemClick(option)}
                              >
                                {option.label}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden bg-[#333333]">
                <thead className="bg-[#444444]">
                  <tr className="text-left">
                    <th className="p-3 font-medium text-lg text-[#FFFFFF]">
                      Title
                    </th>
                    <th className="p-3 font-medium text-lg text-[#FFFFFF]">
                      Author
                    </th>
                    <th className="p-3 font-medium text-lg text-[#FFFFFF]">
                      ISBN
                    </th>
                    <th className="p-3 font-medium text-lg text-[#FFFFFF]">
                      Pages
                    </th>

                    <th className="p-3 font-medium text-lg text-[#FFFFFF]">
                      Price
                    </th>
                    <th className="p-3 font-medium text-lg text-[#FFFFFF] flex justify-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {books
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.title
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map((book) => (
                      <tr
                        key={book._id}
                        className="border-b border-gray-200 hover:bg-[#444444]"
                      >
                        <td className="p-3 text-[#FFFFFF]">{book.title}</td>
                        <td className="p-3 text-[#FFFFFF]">{book.author}</td>
                        <td className="p-3 text-[#FFFFFF]">{book.isbn}</td>
                        <td className="p-3  text-[#FFFFFF]">
                          {book.pageCount}
                        </td>
                        <td className="p-3  text-[#FFFFFF]">{book.price}$</td>

                        <td className="p-3 flex justify-center">
                          <Link
                            to={`/books/update/${book._id}`}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Update
                          </Link>
                          <Link
                            to={`/books/delete/${book._id}`}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                          >
                            Delete
                          </Link>
                          <Link
                            to={`/books/details/${book._id}`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center items-center pt-5">
                <Link
                  to={"/books/create"}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Book
                </Link>
              </div>
              <div className="flex justify-center items-center p-8">
                <nav aria-label="Page navigation example">
                  {/* <ul className="inline-flex items-center -space-x-px">
                    <li>
                      <button
                        onClick={() => setPage(page - 1)}
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Previous
                      </button>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(1)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        1
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(2)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        2
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(3)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-blue-600 bg-blue-100 border border-gray-300 hover:bg-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        3
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(4)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        4
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(5)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      >
                        5
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => setPage(page + 1)}
                        href="#"
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Next
                      </a>
                    </li>
                  </ul> */}
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
