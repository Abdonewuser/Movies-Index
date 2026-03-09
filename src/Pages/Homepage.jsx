import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import Cards from '../components/Cards'

const Homepage = () => {
    const [moviesByCategory, setMoviesByCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const categories = {
        // popular: "/movie/popular",
        action: "/discover/movie?with_genres=28",
        adventure: "/discover/movie?with_genres=12",
        animation: "/discover/movie?with_genres=16",
        comedy: "/discover/movie?with_genres=35",
        crime: "/discover/movie?with_genres=80",
        documentary: "/discover/movie?with_genres=99",
        drama: "/discover/movie?with_genres=18",
        fantasy: "/discover/movie?with_genres=14",
        horror: "/discover/movie?with_genres=27",
        mystery: "/discover/movie?with_genres=9648",
        romance: "/discover/movie?with_genres=10749",
        sciFi: "/discover/movie?with_genres=878",
        thriller: "/discover/movie?with_genres=53"
    };
    const fetchMovies = async () => {
        try {
            setLoading(true);

            const results = {};

            for (const [category, endpoint] of Object.entries(categories)) {
                // console.log(apiKey)
                const res = await fetch(
                    `https://api.themoviedb.org/3${endpoint}&api_key=${apiKey}`
                );

                const data = await res.json();
                results[category] = data.results;
            }

            setMoviesByCategory(results);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchMovies();
    }, []);

    // TODO: handle search


    // TODO: handle pagination

    return (
        <div className='page'>
            {/* TODO: Genre, Year, Rating filter */}
            {loading ? (
                <div className="loading">Loading</div>
            ) : error ? (
                <div className="error">Something went wrong.</div>
            ) : (
                Object.entries(moviesByCategory).map(([category, movies]) => (
                    // console.log(category, movies),
                    <div key={category} className="category-section">
                        {/* TODO: Send category name as well */}
                        <NavLink to={`/category/${movies[0].genre_ids[0]}`} className="category-link">
                            <h2 className="category-title">{category}</h2>
                        </NavLink>
                        <Cards movies={movies} />
                    </div>
                ))
            )}
        </div>
    )
}

export default Homepage