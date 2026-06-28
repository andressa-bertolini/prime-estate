import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IProperty, PropertiesService } from "@services/properties/PropertiesService";
import SadHouse from "@assets/images/sad-house.png";

import IconMap from "@assets/icons/icon-map.svg";
import IconList from "@assets/icons/icon-list.svg";

import PropertyItem from "@components/PropertyItem";
import Search from "@components/Search";
import Skeleton from "@components/Skeleton";
import Pagination from "@components/Pagination";

const ITEMS_PER_PAGE = 9;

const Properties = () => {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    
    const queryString = searchParams.get("query")?.toLowerCase() || '';
    const purpose = searchParams.get("purpose") || "rent";
    const type = searchParams.get("type");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const sqft = searchParams.get("sqft");
    const [viewMode, setViewMode] = useState<"list" | "map">("list");

    const {
        data: properties,
        isError,
        isPending
      } = useQuery({
        queryKey: ["properties", purpose, type],
        queryFn: async () => {
          return await PropertiesService.fetchProperties({
            purpose,
            type: type || "",
          });
        },
        staleTime: 1000 * 60 * 30,
    });

    const filteredProperties = useMemo(() => {
        if (!properties) return [];
      
        let filtered = properties;
      
        if (queryString) {
          filtered = filtered.filter((property) => {
            const title = property.title?.toLowerCase() || '';
            const city = property.city?.toLowerCase() || '';
            const state = property.state?.toLowerCase() || '';
            return (
              title.includes(queryString) ||
              city.includes(queryString) ||
              state.includes(queryString)
            );
          });
        }
      
        if (priceMin || priceMax) {
          filtered = filtered.filter((property) => {
            const price = property.price || 0;
            const minPrice = priceMin ? parseFloat(priceMin) : 0;
            const maxPrice = priceMax ? parseFloat(priceMax) : Infinity;
            return price >= minPrice && price <= maxPrice;
          });
        }
      
        if (beds) {
          filtered = filtered.filter((property) => {
            const propertyBeds = property.bedrooms || 0;
            return propertyBeds >= parseInt(beds, 10);
          });
        }
      
        if (baths) {
          filtered = filtered.filter((property) => {
            const propertyBaths = property.bathrooms || 0;
            return propertyBaths >= parseInt(baths, 10);
          });
        }
      
        return filtered;
    }, [properties, queryString, priceMin, priceMax, beds, baths]);

    useMemo(() => {
        setCurrentPage(1);
    }, [queryString, purpose, priceMin, priceMax, beds, baths]);

    const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, [currentPage]);

    return (
        <div className="properties-page">
            <div className="properties-page__grid">
              <div className="search-properties__wrapper">
                  <div className="search-properties">
                    <Search fullfilters={true} />
                  </div>
              </div>
              <div className="list-properties__wrapper">
                <div className="list-properties__nav">
                  <button 
                    className={viewMode === "list" ? "disabled" : ""}
                    onClick={() => setViewMode("list")}
                  >
                    <img src={IconList} alt="List View" />
                     List 
                  </button>
                  <button 
                    className={viewMode === "map" ? "disabled" : ""}
                    onClick={() => setViewMode("map")}
                  >
                    <img src={IconMap} alt="Map View" />
                     Map
                  </button>
                </div>

                  {purpose === "rent" && <h1 className="properties-page__title" style={{paddingLeft: "24px"}}>For Rent</h1>}
                  {purpose === "sale" && <h1 className="properties-page__title" style={{paddingLeft: "24px"}}>For Sale</h1>}
                  
                  {viewMode === "list" && <><div className="properties-page__list">
                      {isPending &&
                          [...Array(9)].map((_, i) => <Skeleton key={i} grid={3} />)
                      }
                      {!isPending &&
                          filteredProperties && filteredProperties.length > 0 ? (
                              paginatedProperties.map((property: IProperty) => (
                                  <PropertyItem property={property} key={property.id} />
                              ))
                          ) : (
                              <div className="not-found">
                                  <p>No properties found.</p>
                                  <img src={SadHouse} alt="Sad House" />
                              </div>
                          )
                      }
                  </div>
                  
                  {!isPending && filteredProperties.length > 0 && totalPages > 1 && (
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsCount={filteredProperties.length}
                        itemsPerPage={ITEMS_PER_PAGE}
                    />
                  )}
                  </>}

                  {viewMode === "map" && <><div className="properties-page__map">
                  </div>
                  </>}
                  
              </div>
            </div>
        </div>
    );
};

export default Properties;