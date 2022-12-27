import { Contract, ethers } from "ethers";
import React, { useState } from "react";
import { ERC20ABI as abi } from "abi/ERC20ABI";
import { parseEther } from "ethers/lib/utils";
import { Web3Provider } from "@ethersproject/providers";

import styles from "./styles";
import { useWeb3React } from "@web3-react/core";

interface TransferERC20Props {
  contractAddress: string;
}

const TransferERC20 = ({ contractAddress }: TransferERC20Props) => {
  const [amount, setAmount] = useState<number>(0);
  const [toAddress, setToAddress] = useState<string>("");

  const { account, active, library } = useWeb3React<Web3Provider>();

  const transfer = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!(active && account && library)) return;

    const erc20 = new Contract(contractAddress, abi, library.getSigner());
    erc20
      .transfer(toAddress, parseEther(String(amount)))
      .catch("error", console.error);
  };

  if (!active) return null;

  return (
    <form onSubmit={transfer}>
      <label htmlFor="amount">Amount: </label>
      <input
        type="number"
        defaultValue={amount}
        min={10}
        max={1000}
        id="amount"
        placeholder="Amount"
        className={styles.input}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <label htmlFor="to_address">To address: </label>
      <input
        id="to_address"
        type="text"
        placeholder="Address"
        className={styles.input}
        required
        onChange={(e) => setToAddress(e.target.value)}
      />
      <button
        type="submit"
        disabled={!account}
        className="my-2 w-full h-10 cursor-pointer bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded px-2"
      >
        Transfer
      </button>
    </form>
  );
};

export default TransferERC20;
