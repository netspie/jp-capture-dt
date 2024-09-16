import { useEffect, useRef, useState } from "react";
import { Quit, ReadFile, SearchJishoWord } from "../wailsjs/go/main/App";
import "./App.css";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");

  const handleClickOutside = () => {
    Quit();
  };

  const readText = async () => {
    return await ReadFile("data.txt");
  };

  const searchJishoWords = async (textx: string) => {
    await SearchJishoWord(textx);
  };

  useEffect(() => {
    window.addEventListener("blur", handleClickOutside);

    const setTextAsync = async () => {
      const textx = await readText();
      setText(textx);
      await searchJishoWords(textx);
    };
    setTextAsync().catch(console.log);

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
      <button className="absolute right-2 top-1" onClick={handleClickOutside}>
        QUIT
      </button>
      <div className="text-blue-900 text-2xl font-bold font-mono">
        <h1 className="">{text}</h1>
      </div>
    </div>
  );
}

export default App;
