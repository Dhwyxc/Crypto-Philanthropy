import IconButton from "@components/IconButton";
import Input from "@components/Input";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { useAppSelector } from "@hooks/reduxHook";
import useAccount from "@modules/voting/hooks/useAccount";
import useCreatePoll from "@modules/voting/hooks/useCreatePoll";
// import { createPoll } from "@modules/voting/services";
import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const CreateVote = () => {
  const navigate = useNavigate();
  const [answerIds, setAnswerIds] = useState([nanoid(), nanoid()]);
  const account = useAppSelector((state) => state.auth?.account);
  const { connectWallet } = useAccount();
  const addAnswerIds = () => {
    setAnswerIds((old) => [...old, nanoid()]);
  };
  const deleteAnswer = (id) => {
    setAnswerIds((old) => old?.filter((v) => v !== id));
  };

  const { mutate: createPoll } = useCreatePoll();
  const { register, handleSubmit } = useForm();
  return (
    <div className="space-y-6">
      <div className="mt-10 space-y-2 text-center">
        <div className="text-2xl font-bold">Create a poll</div>
        <div className="text-gray-400 ">
          Complete the below fields to create your poll.
        </div>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          createPoll(
            {
              ...data,
              answers: Object.keys(data?.answers).flatMap((v) => {
                return v ? [{ id: v, name: data?.answers?.[v] }] : [];
              }),
              account,
            },
            {
              onSuccess: (data) => {
                navigate(`/poll/${data?.id}`);
              },
            }
          );
        })}
        className="mx-auto bg-[#1f2937] max-w-3xl px-6 py-7 rounded space-y-4 border-t-4 border-blue-500"
      >
        <Input
          type={"text"}
          {...register("title")}
          label="Title"
          placeholder="Type yout question here"
        />
        <Input
          type={"text"}
          {...register("desc")}
          label="Description"
          optional
        />
        <div className="w-full space-y-1">
          <div>
            <span className="text-sm font-medium text-gray-200">
              Answers Options
            </span>
          </div>
          <div className="space-y-2">
            {answerIds?.map((v, i) => {
              return (
                <div className="relative" key={v}>
                  <Input
                    {...register("answers." + v)}
                    type="text"
                    placeholder={`Option ${i + 1}`}
                  />
                  {answerIds?.length > 2 && (
                    <IconButton
                      type="button"
                      onClick={() => deleteAnswer(v)}
                      icon={<XIcon className="w-4 h-4" />}
                      className="absolute top-0 right-0 h-full"
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="!mt-2">
            <IconButton
              type="button"
              onClick={addAnswerIds}
              icon={<PlusIcon className="w-4 h-4" />}
              className="text-sm bg-[#374151]"
            >
              Add Option
            </IconButton>
          </div>
          {/* <input
            {...rest}
            ref={ref}
            className={classNames("custom-input", s, className)}
          /> */}
        </div>
        <div className="flex justify-end">
          {account && (
            <IconButton
              icon={<PlusIcon className="w-4 h-4" />}
              className="px-4 py-2 bg-blue-500 text-gray-50"
            >
              Create poll
            </IconButton>
          )}
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
        </div>
      </form>
    </div>
  );
};

export default CreateVote;
