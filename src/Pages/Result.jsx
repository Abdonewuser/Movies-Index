import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'

const Result = () => {
    const { searchQuery } = useParams();
    const [movies, setMovies] = useState([]);
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const fetchMovies = async () => {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=${apiKey}`
        );
        const data = await res.json();
        setMovies(data.results);
    };
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