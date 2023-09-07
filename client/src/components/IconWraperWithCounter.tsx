import {cn} from "@nextui-org/react";

export const IconWrapperWithCounter = ({children, className}) => (
  <div className={cn(className, "flex gap-1 items-center rounded-small justify-around min-w-12 h-8 sm:min-w-14 sm:h-10")}>
    {children}
  </div>
);
