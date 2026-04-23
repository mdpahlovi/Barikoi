import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LocationData {
    id: string | number;
    address: string;
    city?: string;
    area?: string;
    longitude: number;
    latitude: number;
    uCode?: string;
}

interface LocationState {
    searchQuery: string;
    results: LocationData[];
    selectedLocation: LocationData | null;
    isLoading: boolean;
    error: string | null;
}

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
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setResults: (state, action: PayloadAction<LocationData[]>) => {
            state.results = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        selectLocation: (state, action: PayloadAction<LocationData>) => {
            state.selectedLocation = action.payload;
        },
        clearSelection: (state) => {
            state.selectedLocation = null;
        },
    },
});

export const { setSearchQuery, setLoading, setResults, setError, selectLocation, clearSelection } = locationSlice.actions;

export default locationSlice.reducer;
