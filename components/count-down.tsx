import { memo, useState } from "react";
import Countdown from "react-countdown";
import { getDrawDate } from "../lib/switch-dates";

const CountDown = () => {
  const [drawDate, setDrawDate] = useState<number>(Date.now() + getDrawDate());

  const onCountDownComplete = () => {
    setDrawDate(Date.now() + getDrawDate());
  };

  return (
    <section className="w-full flex flex-col space-y-5 justify-center items-center">
      <h3 className="text-2xl font-bold">Remaining time</h3>
      <Countdown
        date={drawDate}
        renderer={renderer}
        autoStart={true}
        onComplete={onCountDownComplete}
      />
    </section>
  );
};
const renderer = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className="text-6xl font-semibold flex lg:space-x-5 space-x-3">
      {days > 0 && (
        <>
          <span>{days}d</span>
          <span>:</span>
        </>
      )}
      {hours > 0 && (
        <>
          <span>{hours}h</span>
          <span>:</span>
        </>
      )}
      {hours > 0 && (
        <>
          <span>{minutes}m</span>
          <span>:</span>
        </>
      )}
      <span>{seconds}s</span>
    </div>
  );
};

export default memo(CountDown);
