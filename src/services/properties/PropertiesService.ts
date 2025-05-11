import { Api } from "../ApiConfig";
import { IProperty } from "../../types/properties.types"

const fetchProperties = async (params: Record<string, string>): Promise<IProperty[]> => {
  try {
    const { data } = await Api().get("/properties");
    if (!Array.isArray(data)) return [];

    const filtered = data.filter((property) => {
      if (params.beds && property.bedrooms < +params.beds) return false;
      if (params.baths && property.bathrooms < +params.baths) return false;
      if (params.priceLimit && property.price > +params.priceLimit) return false;
      if (params.purpose && property.purpose.toLowerCase() !== params.purpose.toLowerCase()) return false;
      return true;
    });

    const limit = params.limit ? +params.limit : filtered.length;
    const offset = params.offset ? +params.offset : 0;

    return filtered.slice(offset, offset + limit);
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

const fetchPropertyById = async (id: number): Promise<IProperty | undefined> => {
  const allProperties = await fetchProperties({limit: "20"});
  return allProperties.find((property) => property.id === id);
};

export const PropertiesService = {
  fetchProperties,
  fetchPropertyById
};