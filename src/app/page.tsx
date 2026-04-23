import { MapPin, Search } from "lucide-react";

export default function Home() {
    return (
        <main className="flex flex-col md:flex-row h-screen w-full">
            <div className="w-full md:w-80 flex flex-col gap-4 border-r shadow-xl p-4 bg-background">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                        <MapPin className="text-primary h-6 w-6" /> Location Finder
                    </h1>
                    <p className="text-sm text-muted-foreground">Search for places in Dhaka</p>
                </div>

                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border rounded-xl leading-5 bg-surface placeholder-muted-foreground focus:outline-none focus:ring-2 focus:border-primary"
                        placeholder="Search location (e.g., Banani)..."
                    />
                </div>

                <div className="flex-1 flex flex-col bg-surface rounded-xl p-2 border">
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <Search className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-muted-foreground">Start typing to search locations.</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col"></div>
        </main>
    );
}
