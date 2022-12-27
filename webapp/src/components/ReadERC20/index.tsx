import React, { useEffect, useState } from "react";
import { ERC20ABI as abi } from "abi/ERC20ABI";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from "@web3-react/core";
import useSWR from "swr";
import { formatEther } from "ethers/lib/utils";

interface ReadERC20Props {
  contractAddress: string;
}

const SWRLibraryfetcher =
  (library: Web3Provider | undefined, abi: string[]) =>
  (...args: string[][]) => {
    if (!library) return;

    const [arg1, arg2, ...params] = args[0];
    const address = arg1;
    const method = arg2;
    const contract = new Contract(address, abi, library);

    return contract[method](...params);
  };

export const ReadERC20 = ({ contractAddress }: ReadERC20Props) => {
  const [{ totalSupply, symbol }, setTokenData] = useState({
    totalSupply: 0,
    symbol: "",
  });

  const { account, active, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR(
    [contractAddress, "balanceOf", account],
    {
      fetcher: SWRLibraryfetcher(library, abi),
    }
  );

  useEffect(() => {
    if (!(active && account && library)) return;
    const erc20: Contract = new Contract(contractAddress, abi, library);

    const fromMe = erc20.filters.Transfer(account, null);
    erc20.on(fromMe, () => {
      mutate();
    });

    const toMe = erc20.filters.Transfer(null, account);
    erc20.on(toMe, () => {
      mutate();
    });

    return () => {
      erc20.removeAllListeners(toMe);
      erc20.removeAllListeners(fromMe);
    };
  }, [active, account]);

  useEffect(() => {
    if (!(active && account && library)) return;

    const erc20: Contract = new Contract(contractAddress, abi, library);
    library.getCode(contractAddress).then((result: string) => {
      if (result === "0x") return;

      queryTokenData(erc20);
    });
  }, []);

  const queryTokenData = async (erc20: ethers.Contract) => {
    try {
      const symbol = await erc20.symbol();
      const totalSupply = await erc20.totalSupply();

      setTokenData({
        symbol,
        totalSupply: Number(ethers.utils.formatEther(totalSupply)),
      });
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <div className="border-neutral-200 border-2 rounded p-2 my-1">
      <p>
        ERC20 Contract: <b>{contractAddress}</b>
      </p>
      {!!totalSupply && !!symbol && (
        <p>
          token total supply:{" "}
          <b>
            {totalSupply} {symbol}
          </b>
        </p>
      )}
      {!!balance && (
        <p>
          ClassToken in current account:{" "}
          <b>{parseFloat(formatEther(balance)).toFixed(1)}</b>
        </p>
      )}
    </div>
  );
};

export default ReadERC20;
