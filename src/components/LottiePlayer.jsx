"use client";

import React from "react";
import Lottie from "lottie-react";

export default function LottiePlayer({ animationData, className }) {
  return (
    <div className={className}>
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
}
