import {Card, Skeleton} from "@nextui-org/react";

export const CategorySkeleton = () => {

  return (
    <Card 
      radius="sm"
      className="h-[150px] w-[150px] relative shrink-0 border border-default-200"
    >
      <div className="flex items-end justify-center h-full p-5">
        <Skeleton className="w-4/5 rounded-md h-5">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </Card>
  );
}
