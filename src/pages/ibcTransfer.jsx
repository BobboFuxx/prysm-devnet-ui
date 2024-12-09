import React from "react";
import IbcTransferForm from "../components/IbcTransferForm";

const IbcTransfer = ({ walletAddress, signer }) => {
  if (!walletAddress || !signer) {
    return (
      <div className="p-4">
        <h1 className="text-xl">Please connect a wallet to use IBC Transfers.</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">IBC Transfers</h1>
      <IbcTransferForm walletAddress={walletAddress} signer={signer} />
    </div>
  );
};

export default IbcTransfer;
