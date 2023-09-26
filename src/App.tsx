import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import BookShelf from "./components/BookShelf/BookShelf";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-dashboard" element={<Dashboard />} />
        <Route path="/book-shelf" element={<BookShelf />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
