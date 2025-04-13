import { createContext, useState, ReactNode } from "react";

interface filterContextType {
    homeType: string;
    priceLimit: string;

    // const queryString = searchParams.get("query");
    // const purpose = searchParams.get("purpose") || "for-rent";
    // const homeType = searchParams.get("homeType");
    // const priceLimit = searchParams.get("priceLimit");
    // const beds = searchParams.get("beds");
    // const baths = searchParams.get("baths");
    // const sqft = searchParams.get("sqft");
}