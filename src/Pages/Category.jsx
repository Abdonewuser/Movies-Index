import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Cards from '../components/Cards'


const Category = () => {
    const [movies, setMovies] = useState([]);
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
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}&api_key=${apiKey}&page=${currentPage}`;
    // console.log(url)

    const fetchMovies = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
        window.scrollTo(0, 0);
    }, [categoryId, currentPage]);

    return (
        <div>

            {/* TODO: Add CSS for this h1 */}
            <h1>{categoryName}</h1>
            <Cards movies={movies} layout="vertical" />

            {/* TODO: Add CSS for pagination buttons */}
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                Prev
            </button>
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}
            <p>...{totalPages}</p>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Category
