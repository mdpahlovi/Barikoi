"use client";

import {
    clearResults,
    clearSelection,
    selectLocation,
    setError,
    setLoading,
    setResults,
    setSearchQuery,
} from "@/lib/features/location/locationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { autocomplete, setConfig } from "barikoiapis";
import { Search } from "lucide-react";
import { useEffect } from "react";

export default function SearchBar() {
    const apiKey = process.env.NEXT_PUBLIC_BARIKOI_API_KEY;
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.location);

    useEffect(() => {
        const query = searchQuery.trim();

        if (query.length < 2) {
            dispatch(clearResults());
            if (!query.length) {
                dispatch(clearSelection());
            }
            return;
        }

        const timeoutId = window.setTimeout(async () => {
            try {
                dispatch(setLoading(true));

                setConfig({ apiKey, version: "v1" });

                const response = await autocomplete({ q: query });

                if (!response.places) {
                    dispatch(clearSelection());
                    dispatch(setError(`No locations found for "${query}".`));
                    return;
                }

                dispatch(setResults(response.places));
                dispatch(selectLocation(response.places[0]));
            } catch (error) {
                dispatch(clearSelection());
                dispatch(setError(error instanceof Error ? error.message : "Failed to fetch locations."));
            }
        }, 350);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [dispatch, searchQuery]);

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-surface placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-primary"
                placeholder="Search location (e.g., Banani)..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
        </div>
    );
}
