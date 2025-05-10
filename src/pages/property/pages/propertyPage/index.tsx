import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PropertiesService } from "@services/properties/PropertiesService";

import RelatedProperties from "@components/RelatedProperties";

import IconSqft2 from "@assets/icons/icon-sqft.svg";
import IconBed2 from "@assets/icons/icon-bed.svg";
import IconBath2 from "@assets/icons/icon-bath.svg";

const Property = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const found = await PropertiesService.fetchPropertyById(Number(id));
                if (!found) throw new Error("Not found");
                setProperty(found);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchProperty();
    }, [id]);

    const slidesPerView = window.innerWidth < 768 ? 1 : 1.5;

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !property) {
        return <p>Property not found.</p>;
    }

    return (
        <div className="property-page">
            <Swiper
                slidesPerView={slidesPerView}
                pagination={{ clickable: true }}
                spaceBetween={15}
                modules={[Navigation]}
                navigation
            >
                {property.images?.map((photo: string, index: number) => (
                    <SwiperSlide key={index}>
                        <img
                            src={photo}
                            alt={property.title}
                            className="property-page__slide"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <span className="property-badge">
                {property.purpose === "rent" ? "For Rent" : ""}
                {property.purpose === "sale" ? "For Sale" : ""}
            </span>

            <p className="property-page__price">
                <strong>
                    {property.price?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                    })}
                </strong>
            </p>

            <p className="property-features">
                <span>
                    <img src={IconSqft2} className="property-icon sqft" alt="Square feet" />
                    {property.area ? Math.round(property.area) : ""} <strong>sqft</strong>
                </span>
                <span>
                    <img src={IconBed2} className="property-icon bed" alt="Bed" />
                    {property.bedrooms} <strong>bed</strong>
                </span>
                <span>
                    <img src={IconBath2} className="property-icon bath" alt="Bath" />
                    {property.bathrooms} <strong>bath</strong>
                </span>
            </p>

            <div className="property-page__columns">
                <div>
                    <h3>Contact</h3>
                    <p>Interested? Send your information and we will contact you shortly.</p>
                    <label>
                        <span>Name</span>
                        <input type="text" className="input" />
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="text" className="input" />
                    </label>
                    <label>
                        <span>Phone</span>
                        <input type="text" className="input" />
                    </label>
                    <button className="button">Send</button>
                </div>
            </div>

            {/* Descrição */}
            <h3>Description</h3>
            <h1>{property.title}</h1>
            {property.description && <p>{property.description}</p>}

            {/* Propriedades relacionadas */}
            <RelatedProperties />
        </div>
    );
};

export default Property;
