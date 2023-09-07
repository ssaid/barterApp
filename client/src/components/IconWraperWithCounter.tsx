import {cn} from "@nextui-org/react";

export const IconWrapperWithCounter = ({children, className}) => (
  <div className={cn(className, "flex items-center rounded-small justify-around w-14 h-10")}>
    {children}
  </div>
);
