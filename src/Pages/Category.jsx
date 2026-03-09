import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Cards from '../components/Cards'
import './Category.css'

// Component to display movies belonging to a specific category (genre) with pagination
const Category = () => {
    // State for storing fetched movies and loading status
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Retrieve URL parameters and state
    const param = useParams();
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const categoryId = param.categoryId;
    const location = useLocation();
    const categoryName = location.state?.categoryName || 'Category';
    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pages = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
        currentPage + 3,
        currentPage + 4,
        currentPage + 5
    ].filter(page => page >= 1 && page <= totalPages);
    // API endpoint for fetching movies by genre with pagination
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}&api_key=${apiKey}&page=${currentPage}`;
    // console.log(url)

    // Async function to fetch movies from the TMDB API
    const fetchMovies = async () => {
        setLoading(true);
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
        window.scrollTo(0, 0);
    }, [categoryId, currentPage]);

    return (
        <div className="category-page">
            <h1>{categoryName}</h1>

            {loading ? (
                <div className="loading-screen">
                    <div className="film-loader">
                        <div className="reel">
                            <span /><span /><span /><span />
                            <span /><span /><span /><span />
                        </div>
                        <p className="loading-text">Loading</p>
                    </div>
                </div>
            ) : (
                <Cards movies={movies} layout="vertical" />
            )}

            <div className="pagination">
                <button className="nav-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1 || loading}>
                    Prev
                </button>
                {pages.map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} disabled={page === currentPage || loading}>
                        {page}
                    </button>
                ))}
                <p className="total-pages">…{totalPages}</p>
                <button className="nav-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages || loading}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Category
