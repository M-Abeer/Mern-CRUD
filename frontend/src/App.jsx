import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBook";
import UpdateBook from "./pages/UpdateBook";
import DeleteBook from "./pages/DeleteBook";
import DetailsBook from "./pages/DetailsBook";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<DetailsBook />} />
        <Route path="/books/update/:id" element={<UpdateBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />}></Route>
      </Routes>
    </>
  );
};

export default App;
