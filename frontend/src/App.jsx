import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Admin from "./pages/Admin"
import AdminManageMovies from "./pages/AdminManageMovies"

function App() {
  return (
    <BrowserRouter>
      {/* We can conditionally render Navbar/Footer, but for now we'll add Login outside the main layout or inside depending on preference. The provided design doesn't show the main Navbar on the Login page, but we'll put it in Routes to make it accessible. */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/movies" element={<AdminManageMovies />} />
        <Route path="*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/search" element={<Search />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App