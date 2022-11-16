import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import { generateColor } from "../../utils/functions";
import useLottery from "../../hooks/useLottery";
import toast from "react-hot-toast";
import { Balls } from "../../types";

declare let window: any;

const Completed = () => {
  const address = useAddress();
  const { contract, error } = useLottery();
  const [drawBalls, setDrawBalls] = useState<Array<Balls>>([]);

  if (error) {
    toast(error, { icon: "🚨", duration: 5000 });
  }

  useEffect(() => {
    if (!contract) return;
    const getDrawBalls = async () => {
      const draw_id = await contract?.draw_id();

      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const drawBalls = await contract?.generate_winning_balls();
            const _balls = drawBalls.map((ball: BigNumber) => {
              return {
                num: BigNumber.from(ball).toNumber(),
                color: generateColor(),
              };
            });
            setDrawBalls(_balls);

            await contract?.set_winner(
              _balls.map((ball: Balls) => BigNumber.from(ball.num).toNumber()),
              draw_id
            );

            contract.on("Winner", async (winner_address) => {
              if (winner_address === ethers.constants.AddressZero) {
                return reject("No winner this draw, better luck next time!");
              }

              if (winner_address !== address) {
                return reject(
                  "You didn't win this draw, better luck next time!"
                );
              }

              resolve("Congratulations, you should receive your gift soon!");
              await contract?.receive_gift(winner_address);
            });
          } catch (err: any) {
            reject(err.message);
          }
        }),
        {
          loading: "Generating balls & searching for winner...",
          success: (data: any) => `${data}`,
          error: (err) => `${err.toString()}`,
        }
      );
    };
    getDrawBalls();
  }, [contract]);

  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-xl font-bold">Draw has been completed</h1>
      <div className="flex space-x-5">
        {drawBalls.length > 0 &&
          drawBalls.map((n: Balls) => (
            <div
              key={n.num}
              className={`w-[50px] h-[50px] rounded-full flex items-center justify-center text-white text-xl font-bold`}
              style={{ backgroundColor: n.color }}
            >
              {n.num}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Completed;
