import { memo, useEffect, useState } from "react";
import Countdown from "react-countdown";
import { getDrawDate } from "../../lib/switch-dates";
import RenderTime from "./renderTime";

const CountDown = () => {
  return (
    <section className="w-full flex flex-col space-y-5 justify-center items-center">
      <Countdown
        date={Date.now() + getDrawDate()}
        renderer={RenderTime}
        autoStart={true}
      />
    </section>
  );
};

export default memo(CountDown);
