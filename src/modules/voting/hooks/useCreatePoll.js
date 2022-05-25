import React from "react";
import { useMutation } from "react-query";
import { createPoll } from "../services";

const useCreatePoll = () => {
  return useMutation(async (mutationData) => {
    return await createPoll(mutationData);
  });
};

export default useCreatePoll;
