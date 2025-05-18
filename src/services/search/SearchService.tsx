import axios from "axios";
import { Place, FetchParams } from "../../types/search.types"

const apiHost = import.meta.env.VITE_MOCKAPI_HOST;

const SearchAPI = axios.create({
  baseURL: `https://${apiHost}`
});

const fetchPlaces = async (params: FetchParams):Promise<Place[]> => {
  const { limit = 10, ...filters } = params || {};
  const query = new URLSearchParams({
    limit: String(limit),
    ...filters
  });
  try{
    const response = await SearchAPI.get(`/places?${query.toString()}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
}

export const SearchService = {
  fetchPlaces
}