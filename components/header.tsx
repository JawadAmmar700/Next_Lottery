import dynamic from "next/dynamic";
import React, { useCallback, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import useLottery from "../hooks/useLottery";
const DrawDate = dynamic(import("../components/draw-date"), {
  ssr: false,
});

const Header = () => {
  const { contract, error } = useLottery();
  const [drawNum, setDrawNum] = useState<number>(0);

  if (error) return <div>{error}</div>;

  useCallback(async () => {
    setDrawNum(await contract?.draw_id());
  }, [contract]);

  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex flex-col space-y-3 items-start">
        <h2 className="text-3xl font-bold">Draw no: #{drawNum}</h2>
        <DrawDate />
      </div>
      <ConnectWallet />
    </header>
  );
};

export default Header;
