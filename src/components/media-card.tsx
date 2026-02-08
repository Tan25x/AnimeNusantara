import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface MediaCardProps {
    id: string
    title: string
    image: string
    rating?: number
    type?: string
    href: string
}

export function MediaCard({ id, title, image, rating, type, href }: MediaCardProps) {
    return (
        <Link href={href} className="group relative block overflow-hidden rounded-lg bg-secondary/20 transition-all hover:scale-105">
            <div className="aspect-[2/3] w-full overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={300}
                    height={450}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex items-center justify-center">
                        <div className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg">
                            <Play className="h-6 w-6 fill-current" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3">
                <h3 className="line-clamp-1 text-sm font-medium text-foreground">{title}</h3>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{type || "Anime"}</span>
                    {rating && <span>★ {rating}</span>}
                </div>
            </div>
        </Link>
    )
}
