import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3"
})

export const getTrending = (page = 1) =>
    api.get(`/trending/movie/day?api_key=${API_KEY}&page=${page}`)

export const getPopular = (page = 1) =>
    api.get(`/movie/popular?api_key=${API_KEY}&page=${page}`)

export const getTopRatedTv = (page = 1) =>
    api.get(`/tv/top_rated?api_key=${API_KEY}&page=${page}`)

export const getMovieDetails = (id) =>
    api.get(`/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`)

export const getSimilarMovies = (id) =>
    api.get(`/movie/${id}/similar?api_key=${API_KEY}`)

export const getGenres = (type = 'movie') =>
    api.get(`/genre/${type}/list?api_key=${API_KEY}`)

export const getDiscoverMovies = (page = 1, genreId = '') =>
    api.get(`/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc${genreId ? `&with_genres=${genreId}` : ''}`)

export const getDiscoverTvShows = (page = 1, genreId = '') =>
    api.get(`/discover/tv?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc${genreId ? `&with_genres=${genreId}` : ''}`)

export const searchMovies = (query, page = 1) =>
    api.get(`/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`)