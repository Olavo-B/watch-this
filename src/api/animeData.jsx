import axios from "axios";

/**
 * Fetches the trailer embed URL for a given search term.
 * @param {string} searchTerm - The search term for the anime.
 * @returns {Promise<string>} - The trailer embed URL.
 */
export async function fetchTrailer(searchTerm){
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`);
        return response.data.data[0].trailer.embed_url;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Fetches the anime data for a given search term.
 * @param {string} searchTerm - The search term for the anime.
 * @returns {Promise<Object>} - The anime data.
 */
export async function fetchAnime(searchTerm){
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`);
        return response.data.data[0];
    } catch (error) {
        console.error(error);
    }
};


/**
 * Fetches the list of anime data for a given search term.
 * @param {string} searchTerm - The search term for the anime.
 * @returns {Promise<Array<Object>>} - The list of anime data.
 */
export async function fetchAnimeList(searchTerm){
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`);
        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Fetches the image URL for a given search term.
 * @param {string} searchTerm - The search term for the anime.
 * @returns {Promise<string>} - The image URL.
 */
export async function fetchImage(searchTerm){
    try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${searchTerm}&sfw`);
        return response.data.data[0].images.jpg.large_image_url;
    } catch (error) {
        console.error(error);
    }
};


