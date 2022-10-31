import React, { useEffect, useState } from "react";
import useLottery from "../hooks/useLottery";

const Subscribers = () => {
  const { contract, error } = useLottery();
  const [subscribers, setSubscribers] = useState<Array<any>>([]);

  if (error) {
    return <div>{error}</div>;
  }

  const getSubscribers = async () => {
    // const subscribers = await contract?.set_subscribers_for_draw_id(0);
    // const data = await contract?.get_sub_for_draw_id();
    const data = await contract?.get_subscribers_for_all_draws();
    const subscribers = data?.filter(
      async (item: any) => item._drawId !== (await contract?.draw_id())
    );
    setSubscribers(subscribers);
    console.log(subscribers);
  };

  useEffect(() => {
    getSubscribers();
    contract?.on("MintBalls", (user) => {
      console.log(user);
    });
  }, [contract]);

  return (
    <div className="flex flex-col items-start space-y-8">
      <h2 className="text-3xl font-bold">Subscribers</h2>
      <div className="flex flex-col space-y-5 justify-center items-center">
        {subscribers?.map((item: any, _id) => (
          <div
            key={_id}
            className="flex justify-between items-center w-[400px]"
          >
            <div className="flex items-center space-x-5">
              <p className="text-sm font-bold">{item.me}</p>
            </div>
            {/* <p className="text-xl font-bold mr-4">0.1 ETH</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribers;
