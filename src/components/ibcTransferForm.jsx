import React, { useState, useEffect } from "react";
import { performIbcTransfer } from "../utils/ibcTransfer";
import { fetchChainDetails } from "../utils/chainRegistry";

const IbcTransferForm = ({ walletAddress, signer }) => {
  const [chains, setChains] = useState([]);
  const [destinationChain, setDestinationChain] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadChains = async () => {
      try {
        const chainData = await fetchChainDetails();
        setChains(chainData.map((chain) => chain.chain_name));
      } catch (err) {
        setError("Failed to load chain data.");
      }
    };

    loadChains();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setTxHash("");

    if (!recipient || !amount || !destinationChain) {
      setError("All fields are required.");
      return;
    }

    try {
      const hash = await performIbcTransfer(
        walletAddress,
        recipient,
        amount,
        destinationChain,
        signer
      );
      setTxHash(hash);
    } catch (err) {
      setError(`IBC Transfer failed: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold">IBC Transfer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Recipient Address</label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block">Destination Chain</label>
          <select
            value={destinationChain}
            onChange={(e) => setDestinationChain(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select a chain</option>
            {chains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {txHash && (
        <p className="text-green-500 mt-4">
          Transfer successful! Tx Hash: {txHash}
        </p>
      )}
    </div>
  );
};

export default IbcTransferForm;
