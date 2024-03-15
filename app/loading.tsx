"use client";

import Next13ProgressBar from "next13-progressbar";

export default function Loading() {
  return (
    <>
      <Next13ProgressBar
        height="4px"
        startPosition={0.2}
        color="#16a34a"
        showOnShallow
        showSpinner={false}
      />
    </>
  );
}
