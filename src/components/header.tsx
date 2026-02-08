"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"

import { MobileSidebar } from "@/components/sidebar"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { UserAuthButton } from "@/components/user-auth-button"

export function Header() {
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const query = e.currentTarget.value;
            if (query.trim()) {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <MobileSidebar />
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            Adze.DESIGN
                        </span>
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search everything..."
                                className="pl-8 md:w-[300px] lg:w-[400px]"
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <nav className="flex items-center space-x-2">
                        <UserAuthButton />
                    </nav>
                </div>
            </div>
        </header>
    )
}
