import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
  const { output } = props;
  const [tab, setTab] = useState("transcription");
  const [translation, setTranslation] = useState(null);
  const [translating, setTranslating] = useState(null);
  const [toLanguage, setToLanguage] = useState("Select Language");
  console.log(output);

  const worker = useRef();

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }
    const onMessageReceived = async (e) => {
      switch (e.data.status) {
        case "initiate":
          console.log("DOWNLOADING");
          break;
        case "progress":
          console.log("LOADING");
          break;
        case "update":
          setTranslation(e.data.output);
          console.log(e.data.output);
          break;
        case "complete":
          setTranslating(false);
          console.log("DONE");
          break;
      }
    };
    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  });

  const textElement =
    tab === "transcription"
      ? output.map((val) => val.text)
      : translation || "No Translation";

  function handleCopy() {
    navigator.clipboard.writeText(textElement);
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([textElement], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `BazzingaCooper_${new Date().toString()}.txt`;
    document.body.appendChild(element);
    element.click();
  }

  function generateTranslation() {
    if (translating || toLanguage === "Select Language") {
      return;
    }

    setTranslating(true);

    worker.current.postMessage({
      text: output.map((val) => val.text),
      src_lang: "eng_Latn",
      tgt_lang: toLanguage,
    });
  }

  return (
    <main
      className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4 md-gap-5 justify-center pb-20  
    .+max-w-prose w-full mx-auto"
    >
      <h1 className="text-[#E5281A] font-semibold text-4xl sm:text-5xl md:text-6xl whitespace-nowrap">
        Your<span className="text-[#FFD600] bold"> Transcription</span>
      </h1>
      <div className="grid grid-cols-2 mx-auto bg-white  shadow rounded-full overflow-hidden item-center  ">
        <button
          onClick={() => setTab("transcription")}
          className={
            "px-4 duration-200 py-2 " +
            (tab == "transcription"
              ? " bg-[#E5281A] text-white "
              : " text-[#E5281A] hover:text-[#ff6054]")
          }
        >
          Transcription
        </button>
        <button
          onClick={() => setTab("translation")}
          className={
            "px-4 duration-200 py-2 " +
            (tab == "translation"
              ? " bg-[#E5281A] text-white "
              : " text-[#E5281A] hover:text-[#ff6054]")
          }
        >
          Translation
        </button>
      </div>
      <div className="my-8 flex flex-col">
        {tab === "transcription" ? (
          <Transcription {...props} textElement={textElement} />
        ) : (
          <Translation
            {...props}
            toLanguage={toLanguage}
            translating={translating}
            textElement={textElement}
            setTranslation={setTranslation}
            setTranslating={setTranslating}
            setToLanguage={setToLanguage}
            generateTranslation={generateTranslation}
          />
        )}

        <div className="flex items-center pt-10 gap-4 mx-auto ">
          <button
            onClick={handleCopy}
            title="Copy"
            className="specialBtn p-2 aspect-square grid place-item-center hover:text-[#ff6054]  text-[#E5281A] rounded "
          >
            <i className="fa-solid fa-copy"></i>
          </button>
          <button
            onClick={handleDownload}
            title="Download"
            className="specialBtn p-2 aspect-square grid place-item-center hover:text-[#ff6054]  text-[#E5281A] rounded"
          >
            <i className="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    </main>
  );
}
