import { Api } from "../ApiConfig";
import { IProperty } from "@types/properties.types"

const fetchProperties = async (params: string): Promise<IProperty[]> => {
  try {
    const { data } = await Api().get(`/properties?${params}`);
    return Array.isArray(data) ? data : [];
  } catch (error: any) {
    console.error(error);
    return [];
  }
}

export const PropertiesService = {
  fetchProperties
};