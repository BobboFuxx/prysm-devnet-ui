import React, { useState } from 'react';
import {
  connectToKeplr,
  connectToMetaMask,
  connectToLeapWallet,
  connectToWalletConnect,
} from '../utils/walletUtils';

export default function WalletConnect({ onConnect }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConnectKeplr = async () => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await connectToKeplr();
      onConnect(wallet);
    } catch (err) {
      setError("Failed to connect Keplr: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectMetaMask = async () => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await connectToMetaMask();
      onConnect(wallet);
    } catch (err) {
      setError("Failed to connect MetaMask: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectLeapWallet = async () => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await connectToLeapWallet();
      onConnect(wallet);
    } catch (err) {
      setError("Failed to connect Leap Wallet: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectWalletConnect = async () => {
    setLoading(true);
    setError(null);
    try {
      const wallet = await connectToWalletConnect();
      onConnect(wallet);
    } catch (err) {
      setError("Failed to connect WalletConnect: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleConnectKeplr}
        disabled={loading}
        className="bg-blue-500 text-white p-2 w-full rounded"
      >
        {loading ? "Connecting..." : "Connect Keplr"}
      </button>
      <button
        onClick={handleConnectMetaMask}
        disabled={loading}
        className="bg-orange-500 text-white p-2 w-full rounded"
      >
        {loading ? "Connecting..." : "Connect MetaMask"}
      </button>
      <button
        onClick={handleConnectLeapWallet}
        disabled={loading}
        className="bg-yellow-500 text-white p-2 w-full rounded"
      >
        {loading ? "Connecting..." : "Connect Leap Wallet"}
      </button>
      <button
        onClick={handleConnectWalletConnect}
        disabled={loading}
        className="bg-green-500 text-white p-2 w-full rounded"
      >
        {loading ? "Connecting..." : "Connect WalletConnect"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
