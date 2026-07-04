"use client";

import { useEffect, useState } from "react";

// The © year in a static export freezes at build time — this re-renders it
// client-side so it stays current without a redeploy.
export default function YearNow() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <span suppressHydrationWarning>{year}</span>;
}
