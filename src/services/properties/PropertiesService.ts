import { Api } from "../ApiConfig";
import { IProperty } from "@types/properties.types"

const fetchProperties = async (params: Record<string, string>): Promise<IProperty[]> => {
  try {
    const query = new URLSearchParams({
      page: "1",
      limit: "4",
      ...params,
    }).toString();
    const { data } = await Api().get(`/properties?${query}`);
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error(error);
    return [];
  }
}

export const PropertiesService = {
  fetchProperties
};