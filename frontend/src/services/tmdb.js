import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export const getTrending = () =>
    api.get(`/trending/movie/day?api_key=${API_KEY}`)

export const getPopular = () =>
    api.get(`/movie/popular?api_key=${API_KEY}`)

export const getTopRatedTv = () =>
    api.get(`/tv/top_rated?api_key=${API_KEY}`)

export const getMovieDetails = (id) =>
    api.get(`/movie/${id}?api_key=${API_KEY}`)

export const searchMovies = (query) =>
    api.get(`/search/multi?api_key=${API_KEY}&query=${query}`)