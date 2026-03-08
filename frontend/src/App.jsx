import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
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
import AdminAddMovie from "./pages/AdminAddMovie"
import AdminUsers from "./pages/AdminUsers"
import MoviePage from "./pages/MoviePage"
import TvShowPage from "./pages/TvShowPage"
import History from "./pages/History"
import Profile from "./pages/Profile"

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark text-gray-900 dark:text-white font-inter transition-colors duration-300">

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/movies" element={<AdminManageMovies />} />
            <Route path="/admin/add-movie" element={<AdminAddMovie />} />
            <Route path="/admin/users" element={<AdminUsers />} />
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
                    <Route path="/history" element={<History />} />
                    <Route path="/movies" element={<MoviePage />} />
                    <Route path="/tv" element={<TvShowPage />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App