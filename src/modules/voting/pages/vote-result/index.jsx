import IconButton from "@components/IconButton";
import { ShareIcon, StarIcon } from "@heroicons/react/outline";
import SharePollSection from "@modules/voting/components/SharePollSection";
import usePoll from "@modules/voting/hooks/usePoll";
import usePollResult from "@modules/voting/hooks/usePollResult";
import classNames from "classnames";
import moment from "moment";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const VoteResult = () => {
  const { pollId } = useParams();
  const { data } = usePoll(pollId);
  const { data: voteResult } = usePollResult(pollId);
  const result = useMemo(() => {
    const data = voteResult?.reduce((all, cur) => {
      all[cur?.answerId] = (all[cur?.answerId] || 0) + 1;
      return all;
    }, {});
    return data;
  }, [voteResult]);

  //   const { register, handleSubmit, watch, control } = useForm();
  // const value = watch("value");
  // console.log(value);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      <div className="mx-auto bg-[#1f2937] px-6 py-7 rounded space-y-4 border-t-4 border-blue-500">
        <div>
          <div className="text-xl font-semibold">{data?.title}</div>
          <div className="text-sm text-gray-400">
            By {data?.onwer} 8 mins ago
          </div>
        </div>
        <div>
          <div>
            <div>
              <div className="space-y-2">
                {data?.answers?.map((plan) => (
                  <div
                    key={plan?.id}
                    value={plan.name}
                    className={classNames(
                      "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none text-white overflow-hidden"
                    )}
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-gray-600 -z-1"
                      style={{
                        width: `${
                          ((result?.[plan?.id] || 0) * 100) / voteResult?.length
                        }%`,
                      }}
                    ></div>
                    <div className="z-10 flex items-center justify-between w-full">
                      <div className="flex items-center w-full">
                        <div className="flex-grow text-sm">
                          <p className={`font-medium  ${"text-white"}`}>
                            {plan.name}
                          </p>
                        </div>
                        <div className="text-sm">
                          {((result?.[plan?.id] || 0) * 100) /
                            voteResult?.length}
                          %
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5">
          <Link to={`/poll/${pollId}`} className="block">
            <IconButton
              // icon={<PlusIcon className="w-4 h-4" />}
              className="w-full px-4 py-2 bg-primary text-gray-50"
            >
              Back to poll
            </IconButton>
          </Link>

          <IconButton
            // icon={<PlusIcon className="w-4 h-4" />}
            className="px-4 py-2 bg-primary text-gray-50"
          >
            Share
          </IconButton>
        </div>
      </div>
      <SharePollSection pollId={pollId} />
      <div className="mx-auto bg-[#1f2937] rounded divide-y divide-gray-700">
        <div className="flex items-center px-6 py-5 space-x-2">
          <StarIcon className="w-5 h-5" />
          <div className="text-xl font-semibold">Vote</div>
        </div>
        <div className="px-4 py-5">
          {voteResult?.map((v) => (
            <div>
              <div>
                {`${v?.onwer?.slice(0, 4)}...${v?.onwer?.slice(-4)}`} -{" "}
                <span className="font-semibold">
                  {data?.answers?.find((a) => a?.id === v?.answerId)?.name}
                </span>
              </div>
              <div>{moment(Number(v?.createdAt) * 1000).fromNow()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoteResult;
