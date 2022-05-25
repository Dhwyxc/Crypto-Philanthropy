import { useAppSelector } from "@hooks/reduxHook";
import { useQuery } from "react-query";
import { getUserPoll } from "../services";

const useUserPoll = () => {
  const account = useAppSelector((state) => state.auth?.account);
  return useQuery(
    ["user-poll", account],
    async () => {
      return await getUserPoll(account);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false, enabled: !!account }
  );
};

export default useUserPoll;
