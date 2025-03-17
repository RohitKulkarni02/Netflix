import express from "express";
import {
	getMovieDetails,
	getMoviesByCategory,
	getMovieTrailers,
	getSimilarMovies,
	getTrendingMovie,
} from "../controllers/movie.controller.js";
// import { authCheck } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
// router.get("/authCheck", protectRoute, authCheck);
router.get("/trending", getTrendingMovie);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:category", getMoviesByCategory);

export default router;
