"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { addToWatchlist } from "@/app/actions";

interface WatchlistButtonProps {
    animeId: string;
    title: string;
    image: string;
}

export function WatchlistButton({ animeId, title, image }: WatchlistButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = async () => {
        setIsLoading(true);
        const res = await addToWatchlist(animeId, title, image);
        setIsLoading(false);

        if (res?.success) {
            setIsAdded(true);
            // toast.success("Added to watchlist");
        } else {
            // toast.error("Failed to add");
        }
    };

    return (
        <Button variant="outline" size="lg" onClick={handleAdd} disabled={isLoading || isAdded}>
            {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : isAdded ? (
                <Check className="mr-2 h-4 w-4" />
            ) : (
                <Plus className="mr-2 h-4 w-4" />
            )}
            {isAdded ? "Added" : "Add to Watchlist"}
        </Button>
    )
}
