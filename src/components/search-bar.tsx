"use client";

import { LocationData, setError, setLoading, setResults, setSearchQuery } from "@/lib/features/location/locationSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Search } from "lucide-react";
import { useEffect } from "react";

const MOCK_RESULTS: LocationData[] = [
    { id: 1, address: "Barikoi Office", city: "Dhaka", area: "Banani", longitude: 90.4043, latitude: 23.7915, uCode: "BKOI1" },
    { id: 2, address: "Gulshan 2 Circle", city: "Dhaka", area: "Gulshan", longitude: 90.4125, latitude: 23.7936, uCode: "GLS2" },
    { id: 3, address: "Dhanmondi Lake", city: "Dhaka", area: "Dhanmondi", longitude: 90.3788, latitude: 23.7461, uCode: "DHN1" },
    { id: 4, address: "Mirpur 10 Roundabout", city: "Dhaka", area: "Mirpur", longitude: 90.3687, latitude: 23.8068, uCode: "MRP10" },
    {
        id: 5,
        address: "Bashundhara City Shopping Mall",
        city: "Dhaka",
        area: "Panthapath",
        longitude: 90.3897,
        latitude: 23.7503,
        uCode: "PNT1",
    },
];

export default function SearchBar() {
    const dispatch = useAppDispatch();
    const { searchQuery } = useAppSelector((state) => state.location);

    useEffect(() => {
        if (!searchQuery.trim()) {
            dispatch(setResults([]));
            return;
        }

        const timer = setTimeout(() => {
            dispatch(setLoading(true));

            try {
                const filtered = MOCK_RESULTS.filter(
                    (res) =>
                        res.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        res.area?.toLowerCase().includes(searchQuery.toLowerCase()),
                );

                if (filtered.length === 0) {
                    dispatch(setError('No locations found. Try searching for "Banani" or "Gulshan".'));
                    dispatch(setResults([]));
                } else {
                    dispatch(setResults(filtered));
                }
            } catch (error) {
                dispatch(setError("Failed to fetch locations"));
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, dispatch]);

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
