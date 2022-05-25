import { useAppSelector } from "@hooks/reduxHook";
import { useQuery } from "react-query";
import { getUserAnswers } from "../services";

const useUserAnswers = () => {
  const account = useAppSelector((state) => state.auth?.account);
  return useQuery(
    ["user-answers", account],
    async () => {
      return await getUserAnswers(account);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false, enabled: !!account }
  );
};

export default useUserAnswers;
