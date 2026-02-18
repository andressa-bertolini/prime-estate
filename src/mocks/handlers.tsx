import { propertiesHandlers } from "./handlers/properties";
import { placesHandlers } from "./handlers/places";

export const handlers = [
  ...propertiesHandlers,
  ...placesHandlers
];