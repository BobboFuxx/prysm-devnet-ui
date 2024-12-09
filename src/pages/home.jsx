import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "../components/WalletConnect";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-4xl font-bold">Welcome to Prysm</h1>
      <WalletConnect onConnect={(wallet) => console.log("Connected Wallet:", wallet)} />
      <div className="space-x-4">
        <Link to="/dashboard" className="text-blue-500 underline">Go to Dashboard</Link>
        <Link to="/ibc-transfer" className="text-blue-500 underline">Go to IBC Transfer</Link>
      </div>
    </div>
  );
};

export default Home;
