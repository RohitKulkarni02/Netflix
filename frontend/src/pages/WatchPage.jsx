;;;!!!@@@###$$$%%%^^^&&&***
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getMovieDetails, getSimilarMovies } from '../../services/movieService';
import { addToWatchlist, removeFromWatchlist, isInWatchlist } from '../../services/watchlistService';
import { addToFavorites, removeFromFavorites, isInFavorites } from '../../services/favoritesService';
import { rateMovie } from '../../services/ratingService';
import WatchPageSkeleton from '../components/skeletons/WatchPageSkeleton';
import './WatchPage.css';

const WatchPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInUserWatchlist, setIsInUserWatchlist] = useState(false);
  const [isInUserFavorites, setIsInUserFavorites] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [movieData, similarData] = await Promise.all([
          getMovieDetails(id),
          getSimilarMovies(id)
        ]);
        
        setMovie(movieData);
        setSimilarMovies(similarData);
        
        // Check if movie is in user's watchlist and favorites
        if (user) {
          const [watchlistStatus, favoritesStatus, rating] = await Promise.all([
            isInWatchlist(user.uid, id),
            isInFavorites(user.uid, id),
            // Get user rating if available
            Promise.resolve(0) // Placeholder for rating fetch
          ]);
          
          setIsInUserWatchlist(watchlistStatus);
          setIsInUserFavorites(favoritesStatus);
          setUserRating(rating);
        }
      } catch (err) {
        console.error('Error fetching movie data:', err);
        setError('Failed to load movie details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id, user]);

  const handleWatchlistToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isInUserWatchlist) {
        await removeFromWatchlist(user.uid, id);
        setIsInUserWatchlist(false);
      } else {
        await addToWatchlist(user.uid, id);
        setIsInUserWatchlist(true);
      }
    } catch (err) {
      console.error('Error updating watchlist:', err);
    }
  };

  const handleFavoritesToggle = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      if (isInUserFavorites) {
        await removeFromFavorites(user.uid, id);
        setIsInUserFavorites(false);
      } else {
        await addToFavorites(user.uid, id);
        setIsInUserFavorites(true);
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  const handleRating = async (rating) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setIsRating(true);
      await rateMovie(user.uid, id, rating);
      setUserRating(rating);
    } catch (err) {
      console.error('Error rating movie:', err);
    } finally {
      setIsRating(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <WatchPageSkeleton />;
  }

  if (error) {
    return (
      <div className="watch-page-error">
        <div className="error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="watch-page-error">
        <div className="error-content">
          <h2>Movie not found</h2>
          <p>The movie you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/')} className="retry-btn">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="watch-page">
      <div className="watch-page-header">
        <button onClick={handleBackClick} className="back-btn">
          <span className="back-icon">←</span>
          Back
        </button>
      </div>

      <div className="watch-page-content">
        <div className="movie-hero">
          <div className="movie-poster">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg'} 
              alt={movie.title}
              className="poster-image"
            />
          </div>
          
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <span className="movie-year">{new Date(movie.release_date).getFullYear()}</span>
              <span className="movie-runtime">{movie.runtime} min</span>
              <span className="movie-rating">
                ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
              </span>
            </div>
            
            <div className="movie-genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <p className="movie-overview">{movie.overview}</p>
            
            <div className="movie-actions">
              <button 
                onClick={handleWatchlistToggle}
                className={`action-btn ${isInUserWatchlist ? 'active' : ''}`}
              >
                {isInUserWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
              </button>
              
              <button 
                onClick={handleFavoritesToggle}
                className={`action-btn ${isInUserFavorites ? 'active' : ''}`}
              >
                {isInUserFavorites ? '❤️ In Favorites' : '♡ Add to Favorites'}
              </button>
            </div>
            
            {user && (
              <div className="rating-section">
                <h3>Rate this movie:</h3>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => handleRating(star)}
                      className={`star-btn ${star <= userRating ? 'active' : ''} ${isRating ? 'disabled' : ''}`}
                      disabled={isRating}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                {userRating > 0 && (
                  <p className="user-rating">Your rating: {userRating}/5</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {similarMovies.length > 0 && (
          <div className="similar-movies">
            <h2>Similar Movies</h2>
            <div className="similar-movies-grid">
              {similarMovies.slice(0, 6).map(similarMovie => (
                <div 
                  key={similarMovie.id} 
                  className="similar-movie-card"
                  onClick={() => navigate(`/watch/${similarMovie.id}`)}
                >
                  <img 
                    src={similarMovie.poster_path ? `https://image.tmdb.org/t/p/w300${similarMovie.poster_path}` : '/placeholder-movie.jpg'} 
                    alt={similarMovie.title}
                    className="similar-movie-poster"
                  />
                  <h4 className="similar-movie-title">{similarMovie.title}</h4>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPage;