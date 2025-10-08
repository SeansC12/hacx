"use client";

import { useEffect, useState } from "react";

export default function Home() {
  useEffect(() => {
    const fetchTest = async () => {
      const res = await fetch("/api/healthcheck");
      const text = await res.text();
      setTestState(text);
    };
    fetchTest();
  }, []);

  const [testState, setTestState] = useState("Loading...");

  return <div>{testState}</div>;
}
