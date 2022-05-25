import IconButton from "@components/IconButton";
import { RadioGroup } from "@headlessui/react";
import { ChartBarIcon, CheckIcon, ShareIcon } from "@heroicons/react/outline";
import { useAppSelector } from "@hooks/reduxHook";
import SharePollSection from "@modules/voting/components/SharePollSection";
import useAccount from "@modules/voting/hooks/useAccount";
import useCreateVote from "@modules/voting/hooks/useCreateVote";
import usePoll from "@modules/voting/hooks/usePoll";
import useUserAnswer from "@modules/voting/hooks/useUserAnswer";
import classNames from "classnames";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const Vote = () => {
  const { handleSubmit, control } = useForm();
  const { pollId } = useParams();
  const { data } = usePoll(pollId);
  const { mutate: createVote } = useCreateVote(pollId);
  const { data: userAnswer } = useUserAnswer(pollId);
  const account = useAppSelector((state) => state.auth?.account);
  const { connectWallet } = useAccount();
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-10">
      <form
        onSubmit={handleSubmit((data) => createVote(data))}
        className="mx-auto bg-[#1f2937] px-6 py-7 rounded space-y-4 border-t-4 border-blue-500"
      >
        <div>
          <div className="text-xl font-semibold">{data?.title}</div>
          <div className="text-sm text-gray-400">
            By {data?.onwer} 8 mins ago
          </div>
        </div>
        <div>
          <div>Make a choice:</div>
          <div>
            {!userAnswer && (
              <Controller
                control={control}
                name="voteId"
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <RadioGroup {...{ onChange, value, onBlur, ref }}>
                    <RadioGroup.Label className="sr-only">
                      Server size
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {data?.answers?.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan.id}
                          className={({ active, checked }) =>
                            classNames(
                              active &&
                                "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300",
                              checked
                                ? "bg-[#374151] bg-opacity-75"
                                : "bg-primary",
                              "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none text-white"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${"text-white"}`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="text-white shrink-0">
                                    <CheckIcon className="w-5 h-5" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                )}
              />
            )}
            {userAnswer && (
              <RadioGroup value={userAnswer?.answerId}>
                <RadioGroup.Label className="sr-only">
                  Server size
                </RadioGroup.Label>
                <div className="space-y-2">
                  {data?.answers?.map((plan) => (
                    <RadioGroup.Option
                      key={plan.name}
                      value={plan.id}
                      className={({ active, checked }) =>
                        classNames(
                          active &&
                            "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300",
                          checked ? "bg-[#374151] bg-opacity-75" : "bg-primary",
                          "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none text-white"
                        )
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${"text-white"}`}
                                >
                                  {plan.name}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            {checked && (
                              <div className="text-white shrink-0">
                                <CheckIcon className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-x-5">
          {account &&
            (!userAnswer ? (
              <IconButton
                // icon={<PlusIcon className="w-4 h-4" />}
                className="col-span-2 px-4 py-2 bg-blue-500 text-gray-50"
              >
                Vote
              </IconButton>
            ) : (
              <IconButton
                type="button"
                className="col-span-2 px-4 py-2 bg-green-500 text-gray-50"
              >
                You already voted
              </IconButton>
            ))}
          {!account && (
            <IconButton
              // icon={<PlusIcon className="w-4 h-4" />}
              className="px-4 py-2 bg-blue-500 text-gray-50"
              onClick={connectWallet}
              type="button"
            >
              Connect wallet to create
            </IconButton>
          )}
          <Link to={`/poll/${pollId}/result`} className="block">
            <IconButton
              type="button"
              icon={<ChartBarIcon className="w-4 h-4" />}
              className="w-full px-4 py-2 bg-primary text-gray-50"
            >
              Result
            </IconButton>
          </Link>

          <IconButton
            type="button"
            icon={<ShareIcon className="w-4 h-4" />}
            className="px-4 py-2 bg-primary text-gray-50"
          >
            Share
          </IconButton>
        </div>
      </form>
      <SharePollSection pollId={pollId} />
    </div>
  );
};

export default Vote;
