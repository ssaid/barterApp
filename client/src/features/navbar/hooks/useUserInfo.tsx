import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../auth/services";


export const useUserInfo = () => {

  const query = useQuery(
    ['user_info'],
    getUserInfo
  );

  return query
}
