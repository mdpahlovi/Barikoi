import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutocompleteResult } from "barikoiapis";

type LocationResult = {
    id: string;
    address: string;
    city: string;
    area: string;
    latitude: number;
    longitude: number;
};

type LocationState = {
    searchQuery: string;
    results: LocationResult[];
    selectedLocation: LocationResult | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: LocationState = {
    searchQuery: "",
    results: [],
    selectedLocation: null,
    isLoading: false,
    error: null,
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
            if (action.payload) {
                state.error = null;
            }
        },
        setResults: (state, action: PayloadAction<AutocompleteResult[]>) => {
            state.results = action.payload.map((result) => ({
                id: `${result.latitude}${result.longitude}`,
                address: result.address,
                city: result.city,
                area: result.area,
                latitude: Number(result.latitude),
                longitude: Number(result.longitude),
            }));
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.results = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        selectLocation: (state, action: PayloadAction<LocationResult>) => {
            state.selectedLocation = action.payload;
        },
        clearSelection: (state) => {
            state.selectedLocation = null;
        },
        clearResults: (state) => {
            state.results = [];
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setSearchQuery, setLoading, setResults, setError, selectLocation, clearSelection, clearResults } = locationSlice.actions;

export default locationSlice.reducer;
