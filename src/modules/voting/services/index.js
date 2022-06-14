import { CHARITY_LIST_ABI, CHARITY_LIST_ADDRESS } from "@config/web3/config";
import { web3 } from "@config/web3/index";

const PollContract = new web3.eth.Contract(
  CHARITY_LIST_ABI,
  CHARITY_LIST_ADDRESS
);

export const createPoll = async (data) => {
  console.log(data);
  const returnData = await PollContract.methods
    .createPoll(data?.title, data?.desc, data?.answers)
    .send({ from: data?.account });
  console.log(returnData);
  return returnData?.events?.PollCreated?.returnValues;
};

export const creatVote = async (data) => {
  return await PollContract.methods
    .createVote(data?.pollId, data?.voteId)
    .send({ from: data?.account });
};
export const getPoll = async (id) => {
  const data = await PollContract.methods.polls(id).call();
  console.log(data);
  const answers = await getPollAnswers(id);
  console.log({ ...data, answers });
  return { ...data, answers };
};
export const getPollAnswers = async (id) => {
  const keysLength = await getPollAnswerKeysLength(id);
  let listResult = [];
  for (let i = 0; i < keysLength; i++) {
    const task = await getPollAnswer(id, i);

    listResult.push(task);
  }
  console.log(listResult);
  return listResult;
};

export const getPollAnswer = async (id, idA) => {
  const data = await PollContract.methods.getPollAnwser(id, idA).call();
  return data;
};

export const getPollAnswerKeysLength = async (id) => {
  const data = await PollContract.methods.getPollAnswerKeyLength(id).call();
  console.log(data);
  return data;
};

export const getUserAnswerForPoll = async (pollId, account) => {
  const answerKey = await PollContract.methods
    .getUserAnswerKey(pollId)
    .call({ from: account });
  const data = await PollContract.methods.pollAnswers(answerKey).call();
  return data?.answerId ? data : null;
  // return data;
};

export const getPollUserAnswerKeysLength = async (id) => {
  const data = await PollContract.methods.getPollUserAnswerKeyLength(id).call();
  // console.log(data);
  return data;
};
export const getPollUserAnswer = async (pollId, answerIndex) => {
  const data = await PollContract.methods
    .getPollUserAnswer(pollId, answerIndex)
    .call();
  return data;
};
export const getPollUserAnswers = async (id) => {
  const keysLength = await getPollUserAnswerKeysLength(id);
  let listResult = [];
  for (let i = 0; i < keysLength; i++) {
    const task = await getPollUserAnswer(id, i);

    listResult.push(task);
  }
  console.log(listResult);
  return listResult;
};
export const getUserPollKeyLength = async (account) => {
  const data = await PollContract.methods
    .getUserPollKeyLength()
    .call({ from: account });
  // console.log(data);
  return data;
};
export const getUserPollKeyFromIndex = async (account, index) => {
  return await PollContract.methods
    .getUserPollKeyFromIndex(index)
    .call({ from: account });
};
export const getUserPoll = async (account) => {
  const keysLength = await getUserPollKeyLength(account);
  let listResult = [];
  for (let i = 0; i < keysLength; i++) {
    const key = await getUserPollKeyFromIndex(account, i);
    const task = await PollContract.methods.polls(key).call();
    listResult.push(task);
  }
  return listResult;
};
export const getUserAnswerKeyLength = async (account) => {
  const data = await PollContract.methods
    .getUserAnswerKeyLength()
    .call({ from: account });
  // console.log(data);
  return data;
};
export const getUserAnswerFromIndex = async (account, index) => {
  return await PollContract.methods
    .getUserAnswerFromIndex(index)
    .call({ from: account });
};
export const getUserAnswers = async (account) => {
  const keysLength = await getUserAnswerKeyLength(account);
  let listResult = [];
  for (let i = 0; i < keysLength; i++) {
    const task = await getUserAnswerFromIndex(account, i);
    const poll = await getPoll(task?.pollId);
    listResult.push({ ...task, poll });
  }
  return listResult;
};
