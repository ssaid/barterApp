import { useMutation, useQueries, useQuery } from "@tanstack/react-query"
import * as service from "../services"
import { Point } from "../../../types/location"



export const useFormInfo = () => {


  const [ countries, states ] = useQueries({
    queries: [
      { queryKey: [ 'countries' ], queryFn: service.getCountries, retry: false },
      { queryKey: [ 'states' ], queryFn: service.getStates, retry: false },
    ],

  })

  const location = useMutation( service.geoLocalize )


  const loading = countries.isLoading || states.isLoading


  return {
    countries,
    states,
    loading,
    location
  }

}
