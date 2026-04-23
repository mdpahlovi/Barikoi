"use client";

import { selectLocation } from "@/lib/features/location/locationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AlertCircle, Loader2, MapPin, Search } from "lucide-react";
import { JSX } from "react";

export default function SearchResult() {
    const dispatch = useAppDispatch();
    const { searchQuery, results, isLoading, error, selectedLocation } = useAppSelector((state) => state.location);

    if (results?.length) {
        return (
            <div className="flex-1 flex flex-col gap-2 min-h-0 overflow-y-auto bg-surface rounded-xl p-2 border">
                {results.map((location) => (
                    <button
                        key={location.id}
                        onClick={() => dispatch(selectLocation(location))}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors border ${
                            selectedLocation?.id === location.id
                                ? "bg-primary/10 border-primary ring-1 ring-primary"
                                : "bg-white hover:bg-primary/10 hover:border-primary"
                        }`}
                    >
                        <p className="font-semibold">{location.address}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {location.area}, {location.city}
                        </p>
                    </button>
                ))}
            </div>
        );
    }

    let view: JSX.Element;

    if (isLoading) {
        view = (
            <>
                <Loader2 className="animate-spin h-8 w-8" />
                <p className="text-muted-foreground">Searching for the location...</p>
            </>
        );
    }

    if (error) {
        view = (
            <>
                <AlertCircle className="h-8 w-8 opacity-50" />
                <p className="text-muted-foreground">{error}</p>
            </>
        );
    }

    if (searchQuery.length) {
        view = (
            <>
                <p className="text-muted-foreground">No results found for &quot;{searchQuery}&quot;</p>
            </>
        );
    } else {
        view = (
            <>
                <Search className="h-8 w-8 opacity-50" />
                <p className="text-muted-foreground">Start typing to search locations.</p>
            </>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-surface rounded-xl p-2 border">
            <div className="flex-1 flex flex-col justify-center items-center gap-2">{view}</div>
        </div>
    );
}
