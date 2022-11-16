import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import useLottery from "../hooks/useLottery";
import { BigNumber } from "ethers";
const DrawDate = dynamic(import("../components/draw-date"), {
  ssr: false,
});

const Header = () => {
  const { contract, error } = useLottery();
  const [drawNum, setDrawNum] = useState<number | null>(null);

  if (error) return <div>{error}</div>;

  useEffect(() => {
    if (!contract) return;
    const getDrawId = async () => {
      setDrawNum(BigNumber.from(await contract?.draw_id()).toNumber());
    };
    getDrawId();
  }, [contract]);

  return (
    <header className="w-full flex justify-between items-center">
      <div className="flex flex-col space-y-3 items-start">
        <h2 className="text-xl md:text-3xl font-bold">
          Draw no: {`#${drawNum === null ? "loading..." : drawNum}`}
        </h2>
        <DrawDate />
      </div>
      <ConnectWallet />
    </header>
  );
};

export default Header;
