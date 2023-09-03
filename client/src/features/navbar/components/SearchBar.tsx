import {Input} from "@nextui-org/react";
import { BsSearch } from "react-icons/bs";

export const SearchBar = () => {
  return (
    <Input
      isClearable
      // size="sm"
      className="max-w-[150px] sm:max-w-[340px]"
      variant="faded"

      placeholder="Buscar..."
      startContent={
        <BsSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
}
