import React from "react";
import { useQuery } from "react-query";
import { getPollUserAnswers } from "../services";

const usePollResult = (pollId) => {
  return useQuery(["poll-result", pollId], async () => {
    const data = await getPollUserAnswers(pollId);
    return data;
  });
};

export default usePollResult;
