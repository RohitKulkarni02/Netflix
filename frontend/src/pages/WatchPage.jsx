import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const mockFetchMovie = async (id) => {
  // Mock API call
  return {
    id,
    title: "Movie Title",
    description: "This is a description for the movie.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Example video
    coverImage: "https://via.placeholder.com/800x450?text=Movie+Cover"
  };
};

const WatchPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await mockFetchMovie(id);
      setMovie(data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", padding: 0 }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h1>{movie.title}</h1>
        <img src={movie.coverImage} alt={movie.title} style={{ maxWidth: "100%", borderRadius: "12px" }} />
        <p style={{ marginTop: "12px", fontSize: "20px" }}>{movie.description}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <video width="800" controls poster={movie.coverImage}>
          <source src={movie.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default WatchPage;
