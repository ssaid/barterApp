import { useMutation, useQueries } from "@tanstack/react-query"
import * as service from "../services"



export const useFormInfo = () => {


  const [ countries, states, c_methods, user_info ] = useQueries({
    queries: [
      { queryKey: [ 'countries' ], queryFn: service.getCountries, retry: false },
      { queryKey: [ 'states' ], queryFn: service.getStates, retry: false },
      { queryKey: [ 'c_methods' ], queryFn: service.getContactMethods, retry: false },
      { queryKey: [ 'user_info' ], queryFn: service.getUserInfo, retry: false },
    ],

  })

  const location = useMutation( service.geoLocalize )

  const save = useMutation( service.saveUserInfo )

  const loading = countries.isLoading || states.isLoading || c_methods.isLoading || user_info.isLoading


  return {
    countries,
    states,
    loading,
    c_methods,
    user_info,
    save,
    location
  }

}
