import { http, HttpResponse } from "msw";
import { places } from "../data/places";

export const placesHandlers = [
  http.get("*/api/places", ({ request }) => {
    const url = new URL(request.url);

    const limit = Number(url.searchParams.get("limit")) || 10;
    const state = url.searchParams.get("state");

    let result = places;
    if (state) {
      result = places.filter((place) => place.state === state);
    }

    result = result.slice(0, limit);

    return HttpResponse.json(result);
  }),
];