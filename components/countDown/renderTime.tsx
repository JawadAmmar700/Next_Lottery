import React from "react";
import Completed from "./completed";

const RenderTime = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: RenderTimeProps) => {
  if (completed) {
    return <Completed />;
  }

  return (
    <div className=" flex flex-col space-y-5 justify-center items-center">
      <h3 className="text-2xl font-bold">Remaining time</h3>
      <div className="text-2xl md:text-6xl font-semibold flex lg:space-x-5 space-x-3">
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
        {minutes > 0 && (
          <>
            <span>{minutes}m</span>
            <span>:</span>
          </>
        )}
        <span>{seconds}s</span>
      </div>
    </div>
  );
};

export default RenderTime;
