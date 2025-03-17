import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";

export const fetchFromTMDB = async (url) => {
	// Append the API key to the URL
	const apiKey = ENV_VARS.TMDB_API_KEY; // Assuming you have your API key stored in ENV_VARS
	const urlWithApiKey = `${url}&api_key=${apiKey}`;

	const options = {
		headers: {
			accept: "application/json",
			// Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
		},
	};

	const response = await axios.get(urlWithApiKey, options);

	if (response.status !== 200) {
		throw new Error("Failed to fetch data from TMDB" + response.statusText);
	}

	return response.data;
};
