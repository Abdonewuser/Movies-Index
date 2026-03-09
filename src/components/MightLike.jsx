import React, { use, useEffect, useState } from 'react'
import './MightLike.css'
import { Link } from 'react-router-dom';

const MightLike = ({ genre }) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=${apiKey}`;
    const [movies, setMovies] = useState([]);


    const fetchMovies = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    useEffect(() => {
        if (genre) {
            fetchMovies();
        }
    }, [genre]);

    return (
        <div>
            <h3>You Might Also Like</h3>
            <div className='cards-container'>
                {/* cards should be grid */}
                {movies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className='card-link' >
                        <div className='card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h4>{movie.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MightLike