import { Api } from "../ApiConfig";
import { IProperty } from "../../types/properties.types"

const fetchProperties = async (params: Record<string, string>): Promise<IProperty[]> => {
  try {
    const query = new URLSearchParams({
      page: params.page || "1",
      limit: params.limit || "4",
      ...params,
    }).toString();
    const { data } = await Api().get(`/properties?${query}`);
    console.log(data);
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error(error);
    return [];
  }
}

const fetchPropertyById = async (id: number): Promise<IProperty | undefined> => {
  const allProperties = await fetchProperties({limit: "20"});
  return allProperties.find((property) => property.id === id);
};

export const PropertiesService = {
  fetchProperties,
  fetchPropertyById
};