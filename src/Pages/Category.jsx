import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cards from '../components/Cards'


const Category = () => {
    const [movies, setMovies] = useState([]);
    const param = useParams();
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const categoryId = param.categoryId;
    // pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${categoryId}&api_key=${apiKey}`;
    // console.log(url)

    const fetchMovies = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [categoryId]);

    return (
        <div>

            <h1>Category: {categoryId}</h1>
            <Cards movies={movies} layout="vertical" />

        </div>
    )
}

export default Category
