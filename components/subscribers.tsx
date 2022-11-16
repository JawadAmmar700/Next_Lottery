import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import useLottery from "../hooks/useLottery";
import { useAddress } from "@thirdweb-dev/react";
import toast from "react-hot-toast";

const Subscribers = () => {
  const { contract, error } = useLottery();
  const address = useAddress();
  const [subscribers, setSubscribers] = useState<Array<any>>([]);

  if (error) {
    return <div>{error}</div>;
  }

  const getSubscribers = async () => {
    const drawId = BigNumber.from(await contract?.draw_id()).toNumber();
    const subscribers = await contract?.get_subscribers_for_all_draws();
    const filter = subscribers.filter((item: any) => {
      if (BigNumber.from(item._drawId).toNumber() === drawId) {
        return item;
      }
    });
    if (!filter) return toast.error("No subscribers found");
    setSubscribers(filter);
  };

  useEffect(() => {
    if (!contract || !address) return;
    getSubscribers();
    contract?.on("MintBalls", (user) => {
      setSubscribers((subscribers) => [...subscribers, user]);
    });
  }, [contract, address]);

  return (
    <div className="flex flex-col items-start space-y-8">
      {subscribers.length > 0 ? (
        <>
          <h2 className="text-xl md:text-3xl font-bold">Subscribers</h2>
          <div className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-white uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Address
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Balls
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscribers?.map((item: any, _id) => (
                  <tr key={_id} className="bg-transparent dark:bg-gray-800">
                    <td className="py-4 px-6">{item.me}</td>
                    <td className="py-4 px-6">
                      {item.balls &&
                        item.balls.map((ball: any, id: number) => (
                          <span key={id}>
                            {" "}
                            {BigNumber.from(ball).toNumber()}
                          </span>
                        ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h2 className="text-xl md:text-3xl font-bold">No subscribers found</h2>
      )}
    </div>
  );
};

export default Subscribers;
