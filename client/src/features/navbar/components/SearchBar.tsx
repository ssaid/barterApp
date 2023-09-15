import {Input} from "@nextui-org/react";
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEvent, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";

export const SearchBar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('')
    navigate('/')
  }

  useEffect(() => {

    const params = new URLSearchParams()
    const category = new URLSearchParams(location.search).get('category')
    if (category) params.append('category', category)

    if (debouncedSearchTerm) params.append('search', debouncedSearchTerm)

    navigate({pathname: '/', search: params.toString()})

  }, [debouncedSearchTerm])

  return (
    <Input
      isClearable
      className="max-w-[90%] sm:max-w-[340px]"
      variant="faded"
      onChange={handleChange}
      onClear={handleClear}
      placeholder="Buscar..."
      startContent={
        <BsSearch className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
      }
    />
  );
}
