import React, { useMemo } from "react";
import { getDrawDate } from "../lib/switch-dates";

const DrawDate = () => {
  const drawDate = useMemo(() => {
    const date = getDrawDate() + Date.now();
    return new Date(date).toDateString();
  }, []);
  return <p className="md:text-xl text-sm font-bold">Draw date: {drawDate}</p>;
};

export default DrawDate;
