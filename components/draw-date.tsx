import React, { useMemo } from "react";
import { getDrawDate } from "../lib/switch-dates";

const DrawDate = () => {
  const drawDate = useMemo(() => {
    const date = getDrawDate() + Date.now();
    return new Date(date).toLocaleString();
  }, []);
  return <p className="text-xl font-bold">Draw date: {drawDate}</p>;
};

export default DrawDate;
