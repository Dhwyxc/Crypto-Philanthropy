import { useAppSelector } from "@hooks/reduxHook";
import React from "react";
import { useQuery } from "react-query";
import { getUserAnswerForPoll } from "../services";

const useUserAnswer = (pollId) => {
  const account = useAppSelector((state) => state.auth?.account);

  return useQuery(
    ["user-answer", pollId, account],
    async () => {
      return await getUserAnswerForPoll(pollId, account);
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      enabled: !!account && !!pollId,
    }
  );
};

export default useUserAnswer;
