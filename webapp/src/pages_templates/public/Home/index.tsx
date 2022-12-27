import Layout from "components/Layout";
import ReadERC20 from "components/ReadERC20";
import TransferERC20 from "components/TransferERC20";
import ConnectMetamask from "components/ConnectMetamask";
import ETHBalance from "components/ETHbalance";

const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Home = () => {
  return (
    <Layout>
      <ConnectMetamask />

      <div className="my-4">
        <h6 className="text-2xl">ETH Balance</h6>
        <ETHBalance />
      </div>

      <div className="my-4">
        <h6 className="text-2xl">Read ClassToken Info</h6>
        <ReadERC20 contractAddress={CONTRACT_ADDRESS} />
      </div>

      <div className="my-4">
        <h6 className="text-2xl">Transfer ClassToken Info</h6>
        <TransferERC20 contractAddress={CONTRACT_ADDRESS} />
      </div>
    </Layout>
  );
};

export default Home;
