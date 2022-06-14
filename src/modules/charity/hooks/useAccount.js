import { useCallback, useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import ConnectWeb3 from "../ConnectWeb3";
import { CHARITY_LIST_ADDRESS } from "../config";
import { useAppDispatch } from "@hooks/reduxHook";
import { address } from "@modules/auth/slices";
import { getContractAddress } from "ethers/lib/utils";
const useAccount = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [charities, setCharities] = useState([]);
  const conn = useRef(new ConnectWeb3());
  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        console.log({ balance });
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  const dispatch = useAppDispatch();
  const accountChangedHandler = useCallback(
    async (newAccount) => {
      setDefaultAccount(newAccount);
      dispatch(address(newAccount.toString()));
      getAccountBalance(newAccount.toString());
    },
    [dispatch]
  );

  const getTxByWallet = async (wallet) => {
    alert(wallet);
    let n = await conn.current.web3.eth.getBlockNumber();
    console.log({ n });
    let txs = [];
    for (let i = 0; i <= n; i++) {
      let block = await conn.current.web3.eth.getBlock(i, true);
      console.log({ block });
      for (let j = 0; j < block.transactions?.length; j++) {
        if (block.transactions[j].from === wallet && block.transactions[j].to)
          txs.push(block.transactions[j]);
      }
    }
    return txs;
  };
  const charityDeposit = async (value = 10, message, ownerAddress) => {
    alert(ownerAddress);
    console.log({ method: conn.current.todoList.methods });
    // conn.current.todoList.methods.deposit(defaultAccount, 1, 25);
    return new Promise((resolve, reject) => {
      conn.current.todoList.methods
        .createDonate(message, ownerAddress)
        .send({
          from: defaultAccount,
          value: value,
        })
        .once("transactionHash", function (hash) {
          console.log({ hash });
        })
        .once("receipt", function (receipt) {
          resolve(receipt);
        })
        .on("confirmation", function (confNumber, receipt) {
          console.log({ confNumber, receipt });
        })
        .on("error", function (error) {
          reject(error);
        })
        .then(function (receipt) {
          console.log({ receipt });
          // will be fired once the receipt is mined
        });
    });
    // createCharity;

    // .call({ from: CHARITY_LIST_ADDRESS, value: 50 });
  };
  const getAllCharity = async () => {
    const charityCount = await conn.current.todoList.methods
      .charityCount()
      .call();
    let listResult = [];
    for (let i = 1; i <= charityCount; i++) {
      const task = await conn.current.todoList.methods.charities(i).call();
      listResult.push(task);
    }
    setCharities(listResult);
    return listResult;
  };
  const connectWalletHandler = useCallback(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);

          getAccountBalance(result[0]);
          // charityDeposit();
          console.log("alo");
        })
        .catch((error) => {
          //   setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      //   setErrorMessage("Please install MetaMask browser extension to interact");
    }
  }, [accountChangedHandler]);
  useEffect(() => {
    window.ethereum.on("accountsChanged", accountChangedHandler);

    //  window.ethereum.on("chainChanged", chainChangedHandler);

    return () => {
      // window.ethereum.off("accountsChanged", accountChangedHandler);
    };
  }, [accountChangedHandler]);

  useEffect(() => {
    connectWalletHandler();
  }, [connectWalletHandler]);

  return {
    account: defaultAccount,
    balance: userBalance,
    charityDeposit,
    charities,
    getAllCharity,
    getTxByWallet,
  };
};

export default useAccount;
