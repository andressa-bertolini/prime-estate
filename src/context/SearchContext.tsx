import React, { createContext, useContext, useState } from 'react';

interface SearchParams {
  query: string;
  purpose: string;
  homeType: string;
  price: [number, number];
  beds: number;
  baths: number;
  sqft: number;
}

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

const defaultValues: SearchParams = {
  query: '',
  purpose: 'sale',
  homeType: 'apartment',
  price: [1000, 50000],
  beds: 0,
  baths: 0,
  sqft: 0,
};

export const searchDefaultValues = defaultValues;

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchParams, setSearchParams] = useState<SearchParams>(defaultValues);

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within a SearchProvider');
  return context;
};