"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { User, LogOut } from "lucide-react"
import Image from "next/image"

export function UserAuthButton() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return (
            <Button variant="ghost" size="icon" disabled>
                <User className="h-5 w-5 opacity-50" />
            </Button>
        )
    }

    if (status === "authenticated" && session.user) {
        return (
            <div className="flex items-center gap-2">
                {session.user.image ? (
                    <div className="relative h-8 w-8 overflow-hidden rounded-full border">
                        <Image
                            src={session.user.image!}
                            alt={session.user.name || "User"}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted border">
                        <span className="text-xs font-medium">
                            {session?.user?.name?.[0]?.toUpperCase() || "U"}
                        </span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    title="Sign Out"
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        )
    }

    return (
        <Button variant="default" size="sm" onClick={() => signIn()}>
            Sign In
        </Button>
    )
}
