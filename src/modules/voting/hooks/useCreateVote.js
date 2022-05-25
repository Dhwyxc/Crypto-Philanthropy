import { useAppSelector } from "@hooks/reduxHook";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { creatVote } from "../services";

const useCreateVote = (pollId) => {
  const account = useAppSelector((state) => state.auth?.account);
  const queryClient = useQueryClient();
  return useMutation(
    async (mutationData) => {
      return await creatVote({ ...mutationData, pollId, account });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user-answer", pollId, account]);
      },
    }
  );
};

export default useCreateVote;
