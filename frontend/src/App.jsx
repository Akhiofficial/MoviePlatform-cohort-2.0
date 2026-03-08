import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Admin from "./pages/Admin"
import AdminManageMovies from "./pages/AdminManageMovies"
import MoviePage from "./pages/MoviePage"
import TvShowPage from "./pages/TvShowPage"
import { FavoritesProvider } from "./context/FavoritesContext"

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen bg-bg-dark font-inter">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/movies" element={<AdminManageMovies />} />
            <Route
              path="*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:id" element={<MovieDetails />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/movies" element={<MoviePage />} />
                    <Route path="/tv" element={<TvShowPage />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App