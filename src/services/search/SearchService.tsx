import axios from "axios";
import { Place, FetchParams } from "../../types/search.types"

const apiHost = import.meta.env.VITE_GEODB_HOST;
const apiKey = import.meta.env.VITE_GEODB_KEY;

const SearchAPI = axios.create({
  baseURL: `https://${apiHost}`,
  headers: {
    'X-RapidAPI-Key': apiKey,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
});

const fetchPlaces = async (params: FetchParams):Promise<Place[]> => {
  const { limit = 10, ...filters } = params || {};
  const query = new URLSearchParams({
    limit: String(limit),
    ...filters
  });
  try{
    const response = await SearchAPI.get(`/countries/US/regions?${query.toString()}`);
    return response.data;
  } catch (error: any) {
    //console.log(error);
  }
}

export const SearchService = {
  fetchPlaces
}