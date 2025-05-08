export interface PropertyItemProps {
  property: {
      externalID: string;
      coverPhoto: { url: string };
      purpose: "rent" | "sale";
      title: string;
      area?: number;
      rooms: number;
      baths: number;
      amenities?: string[];
      price: number;
      agency: { logo: { url: string } };
  };
}