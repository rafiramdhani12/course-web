import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";

import Navbar from "./components/Navbar";
import Update from "./Pages/Update";
import Create from "./Pages/Create";
import Buy from "./Pages/Buy";
import { SignIn, Login, AuthPage } from "./Pages/Auth"; // Sesuaikan path dengan lokasi file Anda
import ListContent from "./Pages/list";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/list" element={<ListContent userId={userId} />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/create" element={<Create />} />
          <Route path="/buy/:id" element={<Buy />} />
          <Route
            path="/protected"
            element={userId ? <AuthPage /> : <Navigate to="/login" />}
          />
          {/* Contoh rute yang hanya bisa diakses setelah login */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
