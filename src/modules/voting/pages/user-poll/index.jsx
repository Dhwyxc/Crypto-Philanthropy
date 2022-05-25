import IconButton from "@components/IconButton";
import { StarIcon } from "@heroicons/react/outline";
import { useAppSelector } from "@hooks/reduxHook";
import useAccount from "@modules/voting/hooks/useAccount";
import useUserPoll from "@modules/voting/hooks/useUserPoll";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

const UserPoll = () => {
  const { data } = useUserPoll();
  const account = useAppSelector((state) => state.auth?.account);
  const { connectWallet } = useAccount();
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      <div className="mx-auto bg-[#1f2937] rounded divide-y divide-gray-700">
        <div className="flex items-center px-6 py-5 space-x-2">
          <StarIcon className="w-5 h-5" />
          <div className="text-xl font-semibold">Your Polls</div>
        </div>
        <div className="px-4 py-5">
          {!account && (
            <div>
              <div>Connect wallet to see your polls</div>
              <IconButton
                className="px-4 py-2 bg-blue-500 text-gray-50"
                onClick={connectWallet}
              >
                Connect wallet
              </IconButton>
            </div>
          )}
          {account && !data?.length && (
            <div>
              <div>Seem that you dont have any polls</div>
            </div>
          )}
          {data?.map((v) => (
            <Link
              to={`/poll/${v?.id}`}
              className="block p-2 transition-colors rounded-md hover:bg-gray-600"
            >
              <div>
                <span className="font-semibold">{v?.title}</span>
              </div>
              <div className="text-sm text-gray-400">
                {moment(Number(v?.createdAt) * 1000).fromNow()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPoll;
