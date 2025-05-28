export interface PropertyItemProps {
  property: {
      id: string;
      title: string;
      purpose: "rent" | "sale";
      price: number;
      area?: number;
      beds: number;
      baths: number;
      location: string,
      featuredImage: string,
      images: { url: string };

      amenities?: string[];
      agency: { logo: { url: string } };
  };
}