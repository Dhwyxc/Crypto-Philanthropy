import { useAppDispatch } from "@hooks/reduxHook";
import { login } from "@modules/auth/slices";
import { useCallback, useEffect } from "react";

const useAccount = () => {
  const dispatch = useAppDispatch();

  const connectWalletHandler = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (account?.length) dispatch(login({ account: account?.[0] }));
    } else {
      console.log("Need to install MetaMask");
      //   setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };
  const checkIfWalletIsConnect = useCallback(async () => {
    const account = await window.ethereum.request({ method: "eth_accounts" });
    console.log("checkIfWalletIsConnect");
    if (account?.length) dispatch(login({ account: account?.[0] }));
  }, [dispatch]);

  useEffect(() => {
    window.ethereum.on("accountsChanged", checkIfWalletIsConnect);

    //  window.ethereum.on("chainChanged", chainChangedHandler);

    return () => {
      // window.ethereum.off("accountsChanged", accountChangedHandler);
    };
  }, [checkIfWalletIsConnect]);

  //   useEffect(() => {
  //     connectWalletHandler();
  //   }, []);

  return {
    connectWallet: connectWalletHandler,
    checkIfWalletIsConnect,
  };
};

export default useAccount;
