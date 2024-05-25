"use client";

import { getAllCarriers } from "@/utils/pre-define-data/data";
import React from "react";

const Issue = () => {
  const allCarriers = React.useMemo(() => getAllCarriers(), []);

  return <div>Issue</div>;
};

export default Issue;
