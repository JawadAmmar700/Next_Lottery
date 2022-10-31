import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../config/abi.json";

declare let window: any;

type returnType = {
  contract: ethers.Contract | null;
  error: string | null;
};

const useLottery = (): returnType => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      const { ethereum } = window;
      if (!ethereum) return setError("No ethereum provider found");
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          `${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}`,
          abi.abi,
          signer
        );
        setContract(contract);
      } catch (error: any) {
        setError(error.message);
      }
    }
  }, []);

  return {
    contract,
    error,
  };
};

export default useLottery;
