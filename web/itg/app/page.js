"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [serverHealth, setServerHealth] = useState("unknown");
  const [fileHealth, setFileHealth] = useState("unknown");

  useEffect(() => {
    const checkHealth = async (url, setter) => {
      if (!url) {
        setter("inactive");
        return;
      }

      try {
        const res = await fetch(url);
        const responseObject = await res.json();
        const text = responseObject.status
        setter(text.trim().toLowerCase() === "active" ? "active" : "inactive");
      } catch {
        setter("inactive");
      }
    };

    checkHealth(
      process.env.NEXT_PUBLIC_SERVER_HEALTH_API_URL,
      setServerHealth
    );
    checkHealth(
      process.env.NEXT_PUBLIC_FILESTORAGE_HEALTH_API_URL,
      setFileHealth
    );
  }, []);

  const StatusDot = ({ active }) => (
    <span
      className={`inline-block h-3 w-3 rounded-full ${
        active ? "bg-green-500" : "bg-red-500"
      }`}
    />
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between bg-white py-32 px-16 dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            ITG
          </h1>
        </div>
      </main>

      {/* Health Status Bar */}
      <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-6 rounded-full bg-white px-6 py-3 text-sm shadow-md dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <StatusDot active={serverHealth === "active"} />
          <span className="text-zinc-700 dark:text-zinc-300">
            Server
          </span>
        </div>

        <div className="flex items-center gap-2">
          <StatusDot active={fileHealth === "active"} />
          <span className="text-zinc-700 dark:text-zinc-300">
            Filestorage
          </span>
        </div>
      </div>
    </div>
  );
}
