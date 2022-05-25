import React from "react";
import { useQuery } from "react-query";
import { getPoll } from "../services";

const usePoll = (id) => {
  return useQuery(
    ["poll", id],
    async () => {
      return await getPoll(id);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false, enabled: !!id }
  );
};

export default usePoll;
