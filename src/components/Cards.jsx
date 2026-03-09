// import './Cards.css';

// const Cards = ({ movies }) => {
//     return (
//         <div className="cards-row">
//             {movies.map((movie) => (
//                 <div key={movie.id} className="card">
//                     <img
//                         src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                         alt={movie.title}
//                     />
//                     <div className="card-overlay">
//                         <h2 className="card-title">{movie.title}</h2>
//                         <div className="card-meta">
//                             <span className="card-date">
//                                 {movie.release_date?.slice(0, 4)}
//                             </span>
//                             <span className="card-rating">
//                                 ★ {movie.vote_average?.toFixed(1)}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Cards;

import { Link } from 'react-router-dom';
import './Cards.css';

const Cards = ({ movies, layout = 'horizontal' }) => {
    return (
        <div className={layout === 'vertical' ? 'cards-grid' : 'cards-row'}>
            {movies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="card" >
                    <div >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <div className="card-overlay">
                            <h2 className="card-title">{movie.title}</h2>
                            <div className="card-meta">
                                <span className="card-date">
                                    {movie.release_date?.slice(0, 4)}
                                </span>
                                <span className="card-rating">
                                    ★ {movie.vote_average?.toFixed(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))
            }
        </div >
    );
};

export default Cards;