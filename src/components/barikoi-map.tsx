"use client";

import { useAppSelector } from "@/lib/hooks";
import { useEffect, useMemo, useRef } from "react";
import type { MapRef } from "react-bkoi-gl";
import { FullscreenControl, GeolocateControl, Map, Marker, NavigationControl, Popup, ScaleControl } from "react-bkoi-gl";
import "react-bkoi-gl/styles";

const FALLBACK_LOCATION = {
    address: "Dhaka, Bangladesh",
    city: "Dhaka",
    area: "Bangladesh",
    latitude: 23.8103,
    longitude: 90.4125,
};

export default function BarikoiMap() {
    const mapRef = useRef<MapRef>(null);
    const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;
    const { selectedLocation } = useAppSelector((state) => state.location);
    const activeLocation = selectedLocation ?? FALLBACK_LOCATION;

    const mapStyle = useMemo(() => {
        if (!apiKey) {
            return null;
        }

        return `https://map.barikoi.com/styles/osm-liberty/style.json?key=${apiKey}`;
    }, [apiKey]);

    useEffect(() => {
        if (!activeLocation || !mapRef.current) {
            return;
        }

        mapRef.current.flyTo({
            center: [activeLocation.longitude, activeLocation.latitude],
            zoom: 15,
            essential: true,
        });
    }, [activeLocation]);

    if (!mapStyle) {
        return (
            <div className="flex-1 flex items-center justify-center text-center text-sm text-muted-foreground">
                Add `NEXT_PUBLIC_BARIKOI_API_KEY` to render the Barikoi map.
            </div>
        );
    }

    return (
        <Map
            ref={mapRef}
            mapStyle={mapStyle}
            initialViewState={{
                longitude: activeLocation.longitude,
                latitude: activeLocation.latitude,
                zoom: selectedLocation ? 15 : 11,
                bearing: 0,
                pitch: 0,
            }}
            minZoom={4}
            maxZoom={20}
            style={{ width: "100%", height: "100%" }}
            doubleClickZoom
            dragRotate={false}
        >
            <Marker longitude={activeLocation.longitude} latitude={activeLocation.latitude} color="#0f766e" />
            <Popup
                longitude={activeLocation.longitude}
                latitude={activeLocation.latitude}
                closeButton={false}
                closeOnClick={false}
                anchor="bottom"
                offset={18}
            >
                <h3 className="font-semibold">{activeLocation.address}</h3>
                {activeLocation.area ? (
                    <p className="text-sm text-muted-foreground">
                        {activeLocation.area}
                        {activeLocation.city ? `, ${activeLocation.city}` : ""}
                    </p>
                ) : (
                    <p className="text-sm text-muted-foreground">Move from search results to explore a place.</p>
                )}
            </Popup>
            <NavigationControl position="top-right" />
            <FullscreenControl position="top-right" />
            <GeolocateControl position="top-right" />
            <ScaleControl position="bottom-right" />
        </Map>
    );
}
