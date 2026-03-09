import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import MightLike from "../components/MightLike";
import './Movie.css'

// Component to display detailed information and cast for a specific movie
const Movie = () => {
    // State variables for movie details, cast list, and loading status
    const [movieData, setMovieData] = useState(null);
    const [cast, setcast] = useState();
    const [loading, setLoading] = useState(true);
    
    // Extract movieId from URL parameters
    const param = useParams();
    const movieId = param.movieId;
    console.log(movieId);

    // API endpoints for fetching movie details and credits
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    const castUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;

    const fetchMovieDetails = async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            // console.log(data.genres[1].id);
            setMovieData(data);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    const fetchMovieCast = async () => {
        try {
            const res = await fetch(castUrl);
            const data = await res.json();
            setcast(data.cast);
        } catch (error) {
            console.error("Error fetching movie cast:", error);
        }
    };

    // Effect hook to fetch both movie details and cast concurrently when the component mounts
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchMovieDetails(), fetchMovieCast()]);
            setLoading(false);
        };
        loadData();
        window.scrollTo(0, 0);
    }, [movieId]);

    return (
        /**
         * title, overview (plot), genres, release_date, runtime, vote_average, poster_path, backdrop_path, budget, revenue
         */

        <div>
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
                <>
                    {movieData && (
                        <div>
                            <h2>{movieData.title}</h2>
                            <p>{movieData.overview}</p>
                            <p>Genres: {movieData.genres.map((genre) => genre.name).join(", ")}</p>
                            <p>Release Date: {movieData.release_date}</p>
                            <p>Runtime: {movieData.runtime} minutes</p>
                            <p>Vote Average: {movieData.vote_average}</p>
                            <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} />
                        </div>
                    )}

                    {cast && (
                        <div>
                            {/* Cards should be in a grid layout */}
                            <h3>Cast</h3>
                            <ul>
                                {cast.map((actor) => (
                                    <li key={actor.id}>
                                        <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                                        <p>{actor.name}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <MightLike genre={movieData?.genres[1]?.id} />
                </>
            )}
        </div>
    )
}

export default Movie