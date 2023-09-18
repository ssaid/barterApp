import { useQuery } from "@tanstack/react-query";
import * as service from "../services";



export const useFavourites = () => {

  const query = useQuery(
    ["favourites"],
    service.getFavourites,
  );

  return query
}
