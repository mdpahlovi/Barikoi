"use client";

import { useAppSelector } from "@/lib/hooks";

export default function Header() {
    const { selectedLocation } = useAppSelector((state) => state.location);

    return (
        <div className="flex items-center justify-between border-b p-4 bg-background">
            <div>
                <h2 className="text-lg font-semibold">Map view</h2>
                <p className="text-sm text-muted-foreground">
                    {selectedLocation ? `Centered on ${selectedLocation.address}` : "Showing Dhaka until a search result is selected"}
                </p>
            </div>
            <div className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">{selectedLocation ? "Focused" : "Idle"}</div>
        </div>
    );
}
