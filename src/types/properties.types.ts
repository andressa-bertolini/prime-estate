export interface IProperty {
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