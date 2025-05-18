export type FetchParams = {
  limit: string;
}

export type Place = {
  id: string;
  type: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};