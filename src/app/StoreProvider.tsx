"use client";

import { selectLocation } from "@/lib/features/location/locationSlice";
import { AppStore, makeStore } from "@/lib/store";
import { reverseGeocode, setConfig } from "barikoiapis";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;
    const storeRef = useRef<AppStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    useEffect(() => {
        if (!navigator.geolocation) {
            console.warn("Geolocation is not supported by this browser.");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async ({ coords }) => {
                try {
                    setConfig({ apiKey, version: "v1" });

                    const response = await reverseGeocode({
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        address: true,
                        area: true,
                    });

                    storeRef.current?.dispatch(
                        selectLocation({
                            id: `${coords.latitude}${coords.longitude}`,
                            address: response.place.address || "Current Location",
                            city: response.place.city,
                            area: response.place.area,
                            latitude: coords.latitude,
                            longitude: coords.longitude,
                        }),
                    );
                } catch (error) {
                    console.error("Failed to reverse geocode:", error);
                }
            },
            (error) => {
                console.error("Geolocation error:", error.message);
            },
        );
    }, [apiKey]);

    return <Provider store={storeRef.current}>{children}</Provider>;
}
