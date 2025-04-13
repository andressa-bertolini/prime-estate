import { Api } from "../ApiConfig";
import { useEnvContext } from "../../../hooks/useEnvContext";

export interface IProperty {
    id: string;
    externalID: string;
    coverPhoto: { url: string };
    purpose: "for-rent" | "for-sale";
    title: string;
    area?: number;
    rooms: number;
    baths: number;
    amenities?: string[];
    price: number;
    agency: { logo: { url: string } };
}

export interface IPropertyById {
  title: string;
  coverPhoto: { url: string };
  price: number;
  amenities: {
      externalGroupID: string;
      text: string;
      amenities: { text: string }[];
  }[];
  photos?: { 
      url: string;
      title: string;
  }[];
  agency?: {
      logo : {
          url: string;
      }
  }
  baths?: number;
  rooms?: number;
  area?: number;
  purpose?: string;
  description: string;
}

const development:boolean = true;

const rentURL = development ? (
  '/properties'
): '/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4&priceMax=9000&priceMin=6000';

const saleURL = development ? (
  '/properties'
): '/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=4&page=0&rentFrequency=monthly&categoryExternalID=4'

const getProperties = async (query: string): Promise<{ hits: IProperty[] }> => {
  try {
      const { data } = await Api().get(`/properties/list?${query}`);
      return data;
  } catch (error: any) {
      console.error(error);
      return { hits: [] };
  }
};

const getRent = async (): Promise<IProperty[]> => {
  try {
    const { data } = await Api().get(rentURL);
    const hits = development ? await data : await data.hits;
    return Array.isArray(hits) ? hits : [];
  } catch (error: any) {
    console.error(error);
    return [];
  }
};

const getSale = async (): Promise<IProperty[]> => {
    try {
      const { data } = await Api().get(saleURL);
      const hits = development ? await data : await data.hits;
      return Array.isArray(hits) ? hits : [];
  } catch (error: any) {
        console.error(error);
        return [];
    }
};

const getById = async (id: number): Promise<IPropertyById | null> => {
  try {
    const { data } = await Api().get(`/properties/detail?externalID=${id}`);
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const PropertiesService = {
  getRent,
  getSale,
  getById,
  getProperties
};