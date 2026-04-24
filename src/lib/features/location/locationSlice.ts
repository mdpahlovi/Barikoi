import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AutocompleteResult } from "barikoiapis";

interface LocationState {
    searchQuery: string;
    results: AutocompleteResult[];
    selectedLocation: AutocompleteResult | null;
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
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
            if (action.payload) {
                state.error = null;
            }
        },
        setResults: (state, action: PayloadAction<AutocompleteResult[]>) => {
            state.results = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.results = [];
            state.isLoading = false;
            state.error = action.payload;
        },
        selectLocation: (state, action: PayloadAction<AutocompleteResult>) => {
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
