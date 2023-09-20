import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../auth/services";


type Props = {
  shouldFetch: boolean
}

export const useUserInfo = ({ shouldFetch }: Props) => {

  const query = useQuery(
    ['user_info'],
    getUserInfo,
    {
      enabled: shouldFetch,
    }
  );

  return query
}
