import axios from "axios";

export async function getAnimeRecommendation(anime) {

  const response = await axios.get(`http://localhost:3333/recommendations/${anime}`);

  return response.data;
}
