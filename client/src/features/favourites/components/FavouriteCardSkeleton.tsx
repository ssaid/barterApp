import { Card, CardBody, CardHeader, Image, Skeleton } from "@nextui-org/react";


export const FavouriteCardSkeleton = () => {


  return (
    <Card className="py-4 max-w-xs relative w-full">
      <CardHeader className="py-2 px-4 flex-col items-start gap-1">
        <Skeleton className="w-1/2 h-8 rounded-xl" />
        <Skeleton className="w-2/3 h-4 rounded-xl" />
        <Skeleton className="flex rounded-full w-9 h-9 absolute top-1 right-1 m-1"/>
      </CardHeader>
      <CardBody className="p-4" >
        <Skeleton className="rounded-xl">
          <Image height="350px" width="350px" />
        </Skeleton>
      </CardBody>
    </Card>

  )

}


