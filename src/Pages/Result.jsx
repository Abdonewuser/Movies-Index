import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

// Component to display search results based on a user's query
const Result = () => {
    // Extract search query from URL parameters
    const { searchQuery } = useParams();
    // State for storing search results
    const [movies, setMovies] = useState([]);
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    
    // Async function to fetch movies matching the search query
    const fetchMovies = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`
        );
        const data = await res.json();
        setMovies(data.results);
    };
    
    // Refetch movies whenever the search query changes
    useEffect(() => {
        fetchMovies();
    }, [searchQuery]);
    return (
        <div>
            <Cards movies={movies} layout="vertical" />
        </div>
    )
}

export default Result