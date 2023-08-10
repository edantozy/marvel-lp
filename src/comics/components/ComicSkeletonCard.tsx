import { Card, Skeleton } from "@nextui-org/react"

export const ComicSkeletonCard = () => {
    return (
        <Card className="col-span-12 lg:col-span-3 md:col-span-4 sm:col-span-6 h-[300px]">
            <Skeleton className="rounded-lg">
                <div className="h-[300px] rounded-lg bg-default-300"></div>
            </Skeleton>
        </Card >
    )
}
