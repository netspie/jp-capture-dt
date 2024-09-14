import { useEffect, useRef, useState } from "react";
import { Quit } from "../wailsjs/go/main/App";
import "./App.css";

function App() {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = () => {
    Quit();
  };

  useEffect(() => {
    window.addEventListener("blur", handleClickOutside);

    return () => {
      if (ref.current)
        ref.current.removeEventListener("blur", handleClickOutside);
      window.removeEventListener("blur", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-white grid grid-cols-1 place-items-center justify-items-center mx-auto py-8"
    >
      <button className="absolute right-2 top-1" onClick={handleClickOutside}>QUIT</button>
      <div className="text-blue-900 text-2xl font-bold font-mono">
        <h1 className="content-center">Vite + React + TS + Tailwind</h1>
      </div>
    </div>
  );
}

export default App;
