export interface Property {
  id: number;
  title: string;
  purpose: "rent" | "sale";
  price: number;
  area: number;
  beds: number;
  baths: number;
  location: string;
  image: string;
}

export type FetchParams = {
  purpose?: "rent" | "sale";
  beds?: number;
  baths?: number;
  limit?: number;
  offset?: number;
}