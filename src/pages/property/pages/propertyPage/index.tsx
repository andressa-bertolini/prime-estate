import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { PropertiesService } from "@services/properties/PropertiesService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import RelatedProperties from "@components/RelatedProperties";

import IconSqft2 from "@assets/icons/icon-sqft.svg";
import IconBed2 from "@assets/icons/icon-bed.svg";
import IconBath2 from "@assets/icons/icon-bath.svg";

const Property = () => {
    const { id } = useParams<{ id: string }>();
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const { data: property, isLoading, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => PropertiesService.fetchPropertyById(Number(id)),
        enabled: !!id,
    });

    const slidesPerView = window.innerWidth < 768 ? 1 : 1.5;

    const openModal = (index: number) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const goToNextImage = () => {
        if (property?.images) {
            setCurrentImageIndex((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const goToPreviousImage = () => {
        if (property?.images) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1
            );
        }
    };

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
                            onClick={() => openModal(index)}
                            style={{ cursor: "pointer" }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {modalOpen && property.images && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="modal-close"
                            onClick={closeModal}
                            aria-label="Fechar modal"
                        >
                            ✕
                        </button>

                        <div className="modal-image-container">
                            <img
                                src={property.images[currentImageIndex]}
                                alt={`${property.title} - ${currentImageIndex + 1}`}
                                className="modal-image"
                            />
                        </div>

                        <div className="modal-navigation">
                            <button
                                className="modal-nav-btn modal-nav-prev"
                                onClick={goToPreviousImage}
                                aria-label="Imagem anterior"
                            >
                                &#10094;
                            </button>
                            <span className="modal-counter">
                                {currentImageIndex + 1} / {property.images.length}
                            </span>
                            <button
                                className="modal-nav-btn modal-nav-next"
                                onClick={goToNextImage}
                                aria-label="Próxima imagem"
                            >
                                &#10095;
                            </button>
                        </div>

                        <div className="modal-thumbnails">
                            {property.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`modal-thumbnail ${
                                        index === currentImageIndex ? "active" : ""
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

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
                    {property.baths} <strong>bath</strong>
                </span>
            </p>

            <div className="property-page__columns">
                <div>
                    <h3>Amenities</h3>
                    <ul className="property-page__amenities">
                        {property.amenities?.map((amenity, index) => (
                            <li key={index}>{amenity}</li>
                        ))}
                    </ul>
                </div>
                <div className="property-page__contact">
                    <div className="property-page__contact-wrapper">
                        {property.agency?.logo?.url && (
                            <img src={property.agency.logo.url} alt="Agency Logo" />
                        )}
                        <h3>Interested? Send your information and we will contact you shortly</h3>
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