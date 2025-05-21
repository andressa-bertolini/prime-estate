import axios from "axios";
import { Property, FetchParams } from "../../types/properties.types"

const apiHost = import.meta.env.VITE_MOCKAPI_HOST;

const PropertiesApi = axios.create({
  baseURL: `https://${apiHost}`
});

const fetchProperties = async (params: FetchParams): Promise<Property[]> => {
  const { ...filters } = params || {};
  const query = new URLSearchParams({
    ...filters
  });
  try {
    const response = await PropertiesApi.get(`/properties?${query.toString()}`);
    let properties = response.data;

    if (params.limit) {
      const limitNum = Number(params.limit);
      if (!isNaN(limitNum)) {
        properties = properties.slice(0, limitNum);
      }
    }

    return properties;

  } catch (error: any) {
    console.error(error);
    return [];
  }
};

const fetchPropertyById = async (id: number): Promise<Property | undefined> => {
  const allProperties = await fetchProperties({limit: 20});
  return allProperties.find((property) => property.id === id);
};

export const PropertiesService = {
  fetchProperties,
  fetchPropertyById
};