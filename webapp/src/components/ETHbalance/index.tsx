import { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { formatEther } from "ethers/lib/utils";
import { Contract } from "@ethersproject/contracts";

export const SWRLibraryfetcher =
  (library: Web3Provider | undefined) =>
  (...args: string[][]) => {
    if (!library) return;

    const [method, ...params] = args[0];
    return (library as unknown as Contract)[method](...params);
  };

const ETHBalance = () => {
  const { active, account, library } = useWeb3React<Web3Provider>();

  const { data: balance, mutate } = useSWR<number>(
    ["getBalance", account, "latest"],
    {
      fetcher: SWRLibraryfetcher(library),
    }
  );

  useEffect(() => {
    if (!library) return;
    library.on("block", () => {
      mutate();
    });

    return () => {
      library.removeAllListeners("block");
    };
  }, [library]);

  return (
    <div>
      {!!balance && active && (
        <p>ETH in account: {parseFloat(formatEther(balance)).toFixed(3)}</p>
      )}
    </div>
  );
};

export default ETHBalance;
