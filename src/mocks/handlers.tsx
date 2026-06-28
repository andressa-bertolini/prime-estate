import { http } from 'msw'
import { propertiesHandlers } from "./handlers/properties";
import { placesHandlers } from "./handlers/places";

export const handlers = [
  ...propertiesHandlers,
  ...placesHandlers,
  
  http.all('https://tiles.openstreetmap.org/*', ({ request }) => {
    return fetch(request)
  }),
  http.all('https://*.tiles.openstreetmap.org/*', ({ request }) => {
    return fetch(request)
  }),
];