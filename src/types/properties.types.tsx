export interface Property {
  id: number;
  title: string;
  purpose: "rent" | "sale";
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  image: string;
}

export type FetchParams = {
  purpose?: "rent" | "sale";
  bedrooms?: number;
  bathrooms?: number;
  priceLimit?: number;
  limit?: number;
  offset?: number;
}