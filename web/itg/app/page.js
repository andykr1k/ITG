"use client";

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
        const text = responseObject.status;
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
      <main className="flex min-h-screen w-full max-w-3xl flex-col justify-center bg-white py-32 px-16 dark:bg-black">
        <div
    className="pointer-events-none absolute inset-0 
               bg-[radial-gradient(circle,rgba(0,0,0,0.06)_1px,transparent_1px)]
               [background-size:24px_24px]
               dark:bg-[radial-gradient(circle,rgba(255,255,255,0.15)_0.5px,transparent_1px)]"
  />
        <div className="flex flex-col gap-6 text-center sm:text-left">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Intelligent Guidance
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            We are building the next generation of intelligent life guidance—a
            system that goes beyond productivity tools to deeply understand
            human goals, context, and growth over time. Developed by PhD
            researchers in artificial intelligence, this platform combines
            advances in planning, representation learning, and human–AI
            interaction to act as a personalized cognitive partner. Rather than
            offering generic advice, the system continuously models each user’s
            intentions, constraints, and evolving behavior to provide grounded
            guidance, adaptive motivation, and meaningful reflection.
          </p>
        </div>
      </main>

      {/* Health Status Bar */}
      <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-6 rounded-full bg-white px-6 py-3 text-sm shadow-md dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          <StatusDot active={serverHealth === "active"} />
          <span className="text-zinc-700 dark:text-zinc-300">Server</span>
        </div>

        <div className="flex items-center gap-2">
          <StatusDot active={fileHealth === "active"} />
          <span className="text-zinc-700 dark:text-zinc-300">Filestorage</span>
        </div>
      </div>
    </div>
  );
}
