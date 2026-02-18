import { http, HttpResponse } from "msw";
import { properties } from "../data/properties";

export const propertiesHandlers = [
  http.get("*/api/properties", ({ request }) => {
    const url = new URL(request.url);

    const query = url.searchParams.get("query");
    const purpose = url.searchParams.get("purpose");
    const type = url.searchParams.get("type");
    const priceMinParam = url.searchParams.get("priceMin");
    const priceMaxParam = url.searchParams.get("priceMax");
    
    const priceMin = priceMinParam ? Number(priceMinParam) : null;
    const priceMax = priceMaxParam ? Number(priceMaxParam) : null;

    let filtered = [...properties];

    console.log("Query params:", {
      query,
      purpose,
      type,
      priceMin,
      priceMax,
    });

    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.state.toLowerCase().includes(query.toLowerCase()) ||
          p.city.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (purpose) {
      filtered = filtered.filter((p) => p.purpose === purpose);
    }

    if (type) {
      filtered = filtered.filter((p) => p.type === type);
    }

    if (priceMin !== null) {
      filtered = filtered.filter((p) => p.price >= priceMin);
    }
    
    if (priceMax !== null) {
      filtered = filtered.filter((p) => p.price <= priceMax);
    }

    return HttpResponse.json(filtered);
  }),
];
