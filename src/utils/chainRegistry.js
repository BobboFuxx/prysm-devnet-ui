import axios from "axios";

const KEPLR_REGISTRY_URL =
  "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/registry.json";

export const fetchChainDetails = async () => {
  try {
    const response = await axios.get(KEPLR_REGISTRY_URL);
    return response.data.chains;
  } catch (err) {
    throw new Error("Failed to fetch chain details.");
  }
};
