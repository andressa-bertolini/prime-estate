import { useMemo } from 'react';
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IProperty, PropertiesService } from "@services/properties/PropertiesService";
import SadHouse from "@assets/images/sad-house.png";

import PropertyItem from "@components/PropertyItem";
import Search from "@components/Search";
import Skeleton from "@components/Skeleton";

const Properties = () => {
    const [searchParams] = useSearchParams();
    const queryString = searchParams.get("query")?.toLowerCase() || '';
    const purpose = searchParams.get("purpose") || "rent";
    const type = searchParams.get("type");
    const priceLimit = searchParams.get("priceLimit");
    const priceMin = searchParams.get("priceMin");
    const priceMax = searchParams.get("priceMax");
    const beds = searchParams.get("beds");
    const baths = searchParams.get("baths");
    const sqft = searchParams.get("sqft");

    const query = new URLSearchParams({
        locationExternalIDs: "5002,6020",
        purpose,
        lang: "en",
        rentFrequency: "monthly",
        categoryExternalID: "4",
        priceMax: priceLimit || "",
        roomsMin: beds || "",
        bathsMin: baths || ""
    }).toString();

    const {
        data: properties,
        isError,
        isPending
      } = useQuery({
        queryKey: ["properties", purpose, type, priceLimit, beds, baths],
        queryFn: async () => {
          return await PropertiesService.fetchProperties({
            purpose,
            type: type || "",
            priceLimit: priceLimit || "",
            beds: beds || "",
            baths: baths || "",
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

        return filtered;
    }, [properties, queryString, priceMin, priceMax]);

    return (
        <div className="properties-page">
            <div className="properties-page__grid">
                <div className="search-properties">
                    <h1 className="properties-page__title">Properties</h1>
                    <Search />
                </div>
                <div>
                    {purpose === "rent" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Rent</h1> : ""}
                    {purpose === "sale" ? <h1 className="properties-page__title" style={{paddingLeft: "25px"}}>For Sale</h1> : ""}
                    <div className="properties-page__list">
                        {isPending &&
                            [...Array(9)].map((_, i) => <Skeleton key={i} />)
                        }
                        {!isPending &&
                            filteredProperties && filteredProperties.length > 0 ? (
                                filteredProperties.map((property: IProperty) => (
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
                </div>
            </div>
        </div>
    );
};

export default Properties;