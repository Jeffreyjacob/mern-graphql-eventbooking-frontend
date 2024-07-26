import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const EventCardSkeleton = () => {
  return (
    <Card className="w-full h-[370px]">
       <Skeleton className="w-full h-full bg-grey100"/>
    </Card>
  )
}

export default EventCardSkeleton