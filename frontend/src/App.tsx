import { useEffect, useRef, useState } from "react";
import { IsDev, Quit, ReadFile, SearchJishoWord } from "../wailsjs/go/main/App";
import { features } from "../wailsjs/go/models";
import "./App.css";

function App() {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [words, setWords] = useState<features.JishoResponse | null>(null);

  const handleClickOutside = () => {
    Quit();
  };

  const readInput = async () => {
    return await ReadFile("data.txt");
  };

  const searchJishoWords = async (textx: string) => {
    return await SearchJishoWord(textx);
  };

  const refreshWords = async () => {
    const input = await readInput();
    setText(input);

    const words = await searchJishoWords(input);
    setWords(words);
  };

  useEffect(() => {
    refreshWords().catch(console.log);

    !IsDev && window.addEventListener("blur", handleClickOutside);
    return () => {
      !IsDev && window.removeEventListener("blur", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen bg-white grid grid-cols-1 p-3"
    >
      <div className="absolute top-3 right-3 flex gap-1">
        <button
          className="bg-black text-white text-[11px] font-bold rounded p-1 px-2"
          onClick={refreshWords}
        >
          R
        </button>
        <button
          className="bg-black text-white text-[11px] font-bold rounded p-1 px-2"
          onClick={handleClickOutside}
        >
          X
        </button>
      </div>
      <div className="w-full h-full flex flex-col gap-2">
        <h1 className="text-blue-900 text-2xl font-bold font-mono">
          {text != null && text != "" ? text : "例えば"}
        </h1>
        <div>
          <h2 className="text-[11px] font-bold uppercase">Jisho</h2>
          {words?.data.map((data) => (
            <div className="py-1 text-sm">
              <div className="flex flex-col gap-2">
                <div className="w-full h-[1px] bg-slate-400" />
                <div className="flex items-center">
                  <h4 className="font-bold text-lg w-full shrink-1">
                    {data.japanese[0].word}
                  </h4>
                  <h4 className="shrink-0">{data.japanese[0].reading}</h4>
                </div>
              </div>
              {data.senses.map((meaning, i) => (
                <ul className="flex text-sm list-disc">
                  <li className="flex flex-wrap">
                    {meaning.english_definitions.map((def, j) => (
                      <div className="flex">
                        {j == 0 && <span className="p-0 m-0">-&nbsp;</span>}
                        <span className="p-0 m-0">{def}</span>
                        {j < meaning.english_definitions.length - 1 && (
                          <span className="p-0 m-0">,&nbsp;</span>
                        )}
                      </div>
                    ))}
                  </li>
                </ul>
              ))}
              {/* <div className="flex flex-row">
                {data.japanese.slice(1).map((jp, i) => (
                  <>
                    <h4 className="font-bold text-sm">{jp.word}</h4>
                    {i < data.japanese.length - 2 && (
                      <span className="p-0 m-0">、</span>
                    )}
                  </>
                ))}
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
