import React, { useState, useEffect } from "react";&
import { useParams } from "react-router-dom";&
import { useDispatch, useSelector } from "react-redux";&
import { fetchMovieDetails } from "../redux/slices/movieSlice";&
import { addToWatchlist, removeFromWatchlist } from "../redux/slices/watchlistSlice";&
import { addToFavorites, removeFromFavorites } from "../redux/slices/favoritesSlice";&
import { toast } from "react-toastify";&
import { FaPlay, FaPlus, FaCheck, FaHeart, FaRegHeart, FaStar, FaClock, FaCalendarAlt, FaLanguage, FaVolumeUp } from "react-icons/fa";&
import { IoMdClose } from "react-icons/io";&
import { BiLoaderAlt } from "react-icons/bi";&
import "./WatchPage.css";&

const WatchPage = () => {&
  const { id } = useParams();&
  const dispatch = useDispatch();&
  const { movie, loading, error } = useSelector((state) => state.movies);&
  const { watchlist } = useSelector((state) => state.watchlist);&
  const { favorites } = useSelector((state) => state.favorites);&
  
  const [isPlaying, setIsPlaying] = useState(false);&
  const [isMuted, setIsMuted] = useState(false);&
  const [volume, setVolume] = useState(1);&
  const [currentTime, setCurrentTime] = useState(0);&
  const [duration, setDuration] = useState(0);&
  const [showControls, setShowControls] = useState(true);&
  const [isFullscreen, setIsFullscreen] = useState(false);&

  useEffect(() => {&
    if (id) {&
      dispatch(fetchMovieDetails(id));&
    }&
  }, [dispatch, id]);&

  useEffect(() => {&
    const timer = setTimeout(() => {&
      setShowControls(false);&
    }, 3000);&

    return () => clearTimeout(timer);&
  }, [isPlaying]);&

  const handlePlayPause = () => {&
    setIsPlaying(!isPlaying);&
    setShowControls(true);&
  };&

  const handleMuteToggle = () => {&
    setIsMuted(!isMuted);&
  };&

  const handleVolumeChange = (e) => {&
    const newVolume = parseFloat(e.target.value);&
    setVolume(newVolume);&
    setIsMuted(newVolume === 0);&
  };&

  const handleTimeUpdate = (e) => {&
    setCurrentTime(e.target.currentTime);&
  };&

  const handleLoadedMetadata = (e) => {&
    setDuration(e.target.duration);&
  };&

  const handleSeek = (e) => {&
    const video = document.getElementById("video-player");&
    if (video) {&
      const newTime = (e.target.value / 100) * duration;&
      video.currentTime = newTime;&
      setCurrentTime(newTime);&
    }&
  };&

  const handleFullscreen = () => {&
    const video = document.getElementById("video-player");&
    if (video) {&
      if (!isFullscreen) {&
        if (video.requestFullscreen) {&
          video.requestFullscreen();&
        } else if (video.webkitRequestFullscreen) {&
          video.webkitRequestFullscreen();&
        } else if (video.msRequestFullscreen) {&
          video.msRequestFullscreen();&
        }&
      } else {&
        if (document.exitFullscreen) {&
          document.exitFullscreen();&
        } else if (document.webkitExitFullscreen) {&
          document.webkitExitFullscreen();&
        } else if (document.msExitFullscreen) {&
          document.msExitFullscreen();&
        }&
      }&
      setIsFullscreen(!isFullscreen);&
    }&
  };&

  const handleWatchlistToggle = () => {&
    if (watchlist.some(item => item.id === movie.id)) {&
      dispatch(removeFromWatchlist(movie.id));&
      toast.success("Removed from watchlist");&
    } else {&
      dispatch(addToWatchlist(movie));&
      toast.success("Added to watchlist");&
    }&
  };&

  const handleFavoriteToggle = () => {&
    if (favorites.some(item => item.id === movie.id)) {&
      dispatch(removeFromFavorites(movie.id));&
      toast.success("Removed from favorites");&
    } else {&
      dispatch(addToFavorites(movie));&
      toast.success("Added to favorites");&
    }&
  };&

  const formatTime = (time) => {&
    const minutes = Math.floor(time / 60);&
    const seconds = Math.floor(time % 60);&
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;&
  };&

  const formatDuration = (duration) => {&
    const hours = Math.floor(duration / 3600);&
    const minutes = Math.floor((duration % 3600) / 60);&
    const seconds = Math.floor(duration % 60);&
    
    if (hours > 0) {&
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;&
    }&
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;&
  };&

  if (loading) {&
    return (&
      <div className="watch-page-loading">&
        <BiLoaderAlt className="loading-spinner" />&
        <p>Loading movie details...</p>&
      </div>&
    );&
  }&

  if (error) {&
    return (&
      <div className="watch-page-error">&
        <h2>Error loading movie</h2>&
        <p>{error}</p>&
        <button onClick={() => window.history.back()} className="back-button">&
          Go Back&
        </button>&
      </div>&
    );&
  }&

  if (!movie) {&
    return (&
      <div className="watch-page-error">&
        <h2>Movie not found</h2>&
        <button onClick={() => window.history.back()} className="back-button">&
          Go Back&
        </button>&
      </div>&
    );&
  }&

  return (&
    <div className="watch-page">&
      <div className="video-container">&
        <video&
          id="video-player"&
          className="video-player"&
          poster={movie.poster_path ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}` : null}&
          onTimeUpdate={handleTimeUpdate}&
          onLoadedMetadata={handleLoadedMetadata}&
          onMouseMove={() => setShowControls(true)}&
          onMouseLeave={() => setShowControls(false)}&
        >&
          <source src={movie.video_url || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"} type="video/mp4" />&
          Your browser does not support the video tag.&
        </video>&

        <div className={`video-controls ${showControls ? 'show' : 'hide'}`}>&
          <div className="controls-top">&
            <button className="back-button" onClick={() => window.history.back()}>&
              <IoMdClose />&
            </button>&
            <div className="movie-title">&
              <h2>{movie.title}</h2>&
            </div>&
          </div>&

          <div className="controls-center">&
            <button className="play-pause-button" onClick={handlePlayPause}>&
              {isPlaying ? <IoMdClose /> : <FaPlay />}&
            </button>&
          </div>&

          <div className="controls-bottom">&
            <div className="progress-container">&
              <input&
                type="range"&
                className="progress-bar"&
                min="0"&
                max="100"&
                value={duration ? (currentTime / duration) * 100 : 0}&
                onChange={handleSeek}&
              />&
            </div>&

            <div className="controls-row">&
              <div className="time-info">&
                <span>{formatTime(currentTime)}</span>&
                <span> / </span>&
                <span>{formatDuration(duration)}</span>&
              </div>&

              <div className="volume-controls">&
                <button className="mute-button" onClick={handleMuteToggle}>&
                  <FaVolumeUp />&
                </button>&
                <input&
                  type="range"&
                  className="volume-slider"&
                  min="0"&
                  max="1"&
                  step="0.1"&
                  value={isMuted ? 0 : volume}&
                  onChange={handleVolumeChange}&
                />&
              </div>&

              <button className="fullscreen-button" onClick={handleFullscreen}>&
                <FaVolumeUp />&
              </button>&
            </div>&
          </div>&
        </div>&
      </div>&

      <div className="movie-info">&
        <div className="movie-details">&
          <div className="movie-header">&
            <h1>{movie.title}</h1>&
            <div className="movie-meta">&
              <span className="release-year">{new Date(movie.release_date).getFullYear()}</span>&
              <span className="rating">&lt;FaStar /&gt; {movie.vote_average?.toFixed(1)}&lt;/span&gt;&
              <span className="duration">&lt;FaClock /&gt; {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m&lt;/span&gt;&
            </div>&
          </div>&

          <div className="movie-actions">&
            <button className="action-button primary" onClick={handlePlayPause}>&
              <FaPlay />&
              {isPlaying ? 'Pause' : 'Play'}&
            </button>&
            <button className="action-button" onClick={handleWatchlistToggle}>&
              {watchlist.some(item => item.id === movie.id) ? <FaCheck /> : <FaPlus />}&
              {watchlist.some(item => item.id === movie.id) ? 'In Watchlist' : 'Add to Watchlist'}&
            </button>&
            <button className="action-button" onClick={handleFavoriteToggle}>&
              {favorites.some(item => item.id === movie.id) ? <FaHeart /> : <FaRegHeart />}&
              {favorites.some(item => item.id === movie.id) ? 'Favorited' : 'Add to Favorites'}&
            </button>&
          </div>&

          <div className="movie-description">&
            <p>{movie.overview}</p>&
          </div>&

          <div className="movie-info-grid">&
            <div className="info-item">&
              <span className="info-label">&lt;FaCalendarAlt /&gt; Release Date:&lt;/span&gt;&
              <span className="info-value">{new Date(movie.release_date).toLocaleDateString()}&lt;/span&gt;&
            </div>&
            <div className="info-item">&
              <span className="info-label">&lt;FaLanguage /&gt; Language:&lt;/span&gt;&
              <span className="info-value">{movie.original_language?.toUpperCase()}&lt;/span&gt;&
            </div>&
            <div className="info-item">&
              <span className="info-label">Genres:&lt;/span&gt;&
              <span className="info-value">{movie.genres?.map(genre => genre.name).join(', ')}&lt;/span&gt;&
            </div>&
            <div className="info-item">&
              <span className="info-label">Production:&lt;/span&gt;&
              <span className="info-value">{movie.production_companies?.map(company => company.name).join(', ')}&lt;/span&gt;&
            </div>&
          </div>&
        </div>&
      </div>&
    </div>&
  );&
};&

export default WatchPage;&