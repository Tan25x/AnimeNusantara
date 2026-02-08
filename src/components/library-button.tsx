"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check, Loader2 } from "lucide-react";
import { addToLibrary } from "@/app/actions";

interface LibraryButtonProps {
    mangaId: string;
    title: string;
    image: string;
}

export function LibraryButton({ mangaId, title, image }: LibraryButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = async () => {
        setIsLoading(true);
        const res = await addToLibrary(mangaId, title, image);
        setIsLoading(false);

        if (res?.success) {
            setIsAdded(true);
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
            {isAdded ? "Saved" : "Save to Library"}
        </Button>
    )
}
