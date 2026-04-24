import BarikoiMap from "@/components/barikoi-map";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import SearchResult from "@/components/search-result";
import { MapPin } from "lucide-react";

export default function Home() {
    return (
        <main className="flex flex-col md:flex-row h-screen w-full">
            <section className="w-full md:w-80 flex flex-col gap-4 border-r p-4 bg-background">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="text-primary h-6 w-6" /> Location Finder
                    </h1>
                    <p className="text-sm text-muted-foreground">Search for places</p>
                </div>

                <SearchBar />

                <SearchResult />
            </section>

            <section className="flex-1 flex flex-col">
                <Header />

                <BarikoiMap />
            </section>
        </main>
    );
}
