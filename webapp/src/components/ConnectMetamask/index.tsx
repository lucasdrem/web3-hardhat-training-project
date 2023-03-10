import { useEffect } from "react";

import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { injected } from "utils/connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { formatAddress } from "utils/helpers";
import { useCallback } from "react";

const ConnectMetamask = () => {
  const { chainId, account, activate, deactivate, setError, active } =
    useWeb3React<Web3Provider>();

  const onClickConnect = useCallback(() => {
    activate(
      injected,
      (error) => {
        if (error instanceof UserRejectedRequestError) {
          console.error(error.message);
        } else {
          setError(error);
        }
      },
      false
    );
  }, [activate, setError]);

  const onClickDisconnect = useCallback(() => {
    deactivate();
  }, [deactivate]);

  return (
    <div>
      {active && typeof account === "string" ? (
        <div>
          <button type="button" onClick={onClickDisconnect}>
            Account: {formatAddress(account, 4)}
          </button>
          <p>ChainID: {chainId} connected</p>
        </div>
      ) : (
        <div>
          <button type="button" onClick={onClickConnect}>
            Connect MetaMask
          </button>
          <p>not connected</p>
        </div>
      )}
    </div>
  );
};

export default ConnectMetamask;
