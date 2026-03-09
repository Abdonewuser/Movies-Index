import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cards from '../components/Cards'

// Homepage component that fetches and displays movie collections mapped by genre
const Homepage = () => {
    // State variables for mapping genres to arrays of movie objects
    const [moviesByCategory, setMoviesByCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_APP_API_KEY;
    
    // Dictionary mapping category names to their respective TMDB API endpoints
    const categories = {
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
    // Async function to fetch movies sequentially for each defined category
    const fetchMovies = async () => {
        try {
            setLoading(true);

            // Object to collect data before saving all results to state
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
    // Initial effect hook to fetch movies once when the page loads
    useEffect(() => {
        fetchMovies();
    }, []);

    // TODO: handle search

    return (
        <div className='page'>
            {loading ? (
                <div className="loading">Loading</div>
            ) : error ? (
                <div className="error">Something went wrong.</div>
            ) : (
                // Map over the state object to render a category section for each genre
                Object.entries(moviesByCategory).map(([category, movies]) => (
                    // console.log(category, movies),
                    <div key={category} className="category-section">
                        <Link
                            to={`/category/${movies[0].genre_ids[0]}`}
                            className="category-link"
                            state={{ categoryName: category }}>
                            <h2 className="category-title">{category}</h2>
                        </Link>
                        <Cards movies={movies} />
                    </div>
                ))
            )}
        </div>
    )
}

export default Homepage