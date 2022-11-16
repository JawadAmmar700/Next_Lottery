import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import toast, { Toaster } from "react-hot-toast";
import useLottery from "../hooks/useLottery";
import { BigNumber, ethers } from "ethers";
import { generateColor } from "../utils/functions";

type manualBalls = {
  num: number;
  color: string;
};

const GenerateBalls = () => {
  const address = useAddress();
  const { contract, error } = useLottery();
  const [balls, setBalls] = useState<number[]>([]);
  const [btn, setBtn] = useState<string>("");
  const [manualBalls, setManualBalls] = useState<Array<manualBalls>>([]);
  const [profit, setProfit] = useState<string>("");

  if (error) {
    return <div>{error}</div>;
  }

  useEffect(() => {
    const getBalance = async () => {
      if (!contract) return;
      const balance = await contract?.getBalance();
      setProfit(ethers.utils.formatEther(BigNumber.from(balance).toString()));
    };
    getBalance();
  }, [contract]);

  const randomPick = () => {
    if (!address) return toast.error("Please connect your wallet");
    setBalls([]);
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const result = await contract?.generate_winning_balls();
          if (!result) return toast.error("Cannot generate balls");
          const _balls = result.map((ball: BigNumber) =>
            BigNumber.from(ball).toNumber()
          );
          setBalls(_balls);
          resolve(result);
          setBtn("generate");
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }),
      {
        loading: "Generating your ticket...",
        success: <b>Generated</b>,
        error: <b>Something went wrong</b>,
      }
    );
  };

  const storeTicket = (_balls: Array<number>) => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const result = await contract?.mine_balls(_balls, {
            value: ethers.utils.parseEther("0.001"),
          });
          contract?.on("MintBalls", async () => {
            const balance = await contract?.getBalance();
            setProfit(
              ethers.utils.formatEther(BigNumber.from(balance).toString())
            );
            setManualBalls([]);
            setBalls([]);
            setBtn("");
            resolve(result);
          });
        } catch (err) {
          console.log(err);
          reject(err);
        }
      }),
      {
        loading: "Mining...",
        success: <b>Mined successfully</b>,
        error: <b>Something went wrong</b>,
      }
    );
  };

  const mine = (btnClicked: string) => {
    if (btnClicked === "generate") {
      storeTicket(balls);
    }
    if (btnClicked === "manual") {
      const _balls = manualBalls.map((ball) => ball.num);
      setBalls(_balls);
      storeTicket(_balls);
    }
  };
  return (
    <>
      <section className="w-full flex flex-col space-y-5 justify-center items-center">
        <h2 className="text-xl md:text-3xl font-bold">
          Participate in the raffle to increase the value
        </h2>
        <h3 className="text-xl font-bold">Withdrawal value: {profit} ETH </h3>
        <div className="flex justify-between items-center md:w-[400px] w-full">
          <button
            onClick={randomPick}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Random pick
            </span>
          </button>
          <button
            onClick={() => {
              if (!address) return toast.error("Please connect your wallet");
              setBalls([]);
              setBtn("manual");
            }}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Manual pick
            </span>
          </button>
        </div>
      </section>

      <section className="w-full flex flex-col space-y-5 justify-center items-center">
        {btn === "generate" && (
          <>
            <div className="flex justify-between items-center w-[300px]">
              <h2 className="text-xl md:text-3xl font-bold">Your tickets</h2>
              <button
                onClick={() => setBtn("")}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  &times;
                </span>
              </button>
            </div>
            <div className="flex space-x-5">
              {balls.length > 0 &&
                balls.map((n: number) => (
                  <div
                    key={n}
                    className={`w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-bold`}
                    style={{ backgroundColor: generateColor() }}
                  >
                    {n}
                  </div>
                ))}
            </div>
            <button
              onClick={() => mine("generate")}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Mine balls
              </span>
            </button>
          </>
        )}
        {
          // manual pick
          btn === "manual" && (
            <>
              <div className="flex justify-between items-center w-[300px]">
                <h2 className="text-xl md:text-3xl font-bold">Pick numbers</h2>
                <button
                  onClick={() => setBtn("")}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    &times;
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-4 md:grid-cols-8  gap-1 md:gap-2 w-[300px] md:w-auto">
                {[...Array(65)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[50px] h-[50px] ${
                      manualBalls.length > 5
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }  bg-gray-500  rounded-full flex items-center justify-center text-white text-xl font-bold  hover:bg-slate-700`}
                    onClick={() =>
                      manualBalls.length < 6
                        ? manualBalls.findIndex((item: any) => item.num === i) <
                            0 &&
                          setManualBalls([
                            ...manualBalls,
                            { num: i, color: generateColor() },
                          ])
                        : toast.error("You can only pick 6 numbers")
                    }
                    style={{
                      backgroundColor:
                        manualBalls.findIndex((n) => n.num === i) !== -1
                          ? manualBalls[
                              manualBalls.findIndex((n) => n.num === i)
                            ].color
                          : "",
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="flex space-x-5">
                <button
                  onClick={() => mine("manual")}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Mine balls
                  </span>
                </button>
                <button
                  onClick={() => setManualBalls([])}
                  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                >
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Clear balls
                  </span>
                </button>
              </div>
            </>
          )
        }
      </section>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default GenerateBalls;
