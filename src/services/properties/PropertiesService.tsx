import axios from "axios";
import { Property, FetchParams } from "../../types/properties.types"

const PropertiesApi = axios.create({
  baseURL: `${import.meta.env.BASE_URL}api/`
});

const fetchProperties = async (params: FetchParams): Promise<Property[]> => {
  const { ...filters } = params || {};
  const query = new URLSearchParams({ ...filters });
  try {
    const response = await PropertiesApi.get(`/properties?${query.toString()}`);
    let properties = response.data;

    if (!Array.isArray(properties)) {
      console.error("Unexpected response shape from /properties:", properties);
      return [];
    }

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
  const allProperties = await fetchProperties({limit: 100});
  return allProperties.find((property) => property.id === id);
};

export const PropertiesService = {
  fetchProperties,
  fetchPropertyById
};