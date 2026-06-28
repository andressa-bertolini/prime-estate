import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface PropertyMapProps {
    latitude: number;
    longitude: number;
    title: string;
    height?: string;
}

const PropertyMap = ({
    latitude,
    longitude,
    title,
    height = "350px",
}: PropertyMapProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;


        map.current = new maplibregl.Map({
            container: mapContainer.current,
            style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
            center: [longitude, latitude],
            zoom: 15,
            pitch: 0,
            bearing: 0,
        });

        const marker = new maplibregl.Marker({ color: "#3b82f6" })
            .setLngLat([longitude, latitude])
            .addTo(map.current);

        return () => {
            if (map.current) {
                map.current.remove();
                map.current = null;
            }
        };
    }, [latitude, longitude, title]);

    return (
        <div
            ref={mapContainer}
            style={{
                width: "100%",
                height,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
            data-testid="property-map"
        />
    );
};

export default PropertyMap;
