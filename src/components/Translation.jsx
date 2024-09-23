import React from "react";
import { LANGUAGES } from "../utils/presets";

export default function Translation(props) {
  const {
    textElement,
    toLanguage,
    translating,
    setToLanguage,
    generateTranslation,
  } = props;
  return (
    <div className="flex flex-col gap-2 max-w-[400px] w-full mx-auto">
      {!translating && (
        <div className="flex flex-col gap-1">
          <p className="text-xs sm:text-sm font-medium text-slate-500 mr-auto">
            To Language
          </p>
          <div className="flex items-stretch gap-2">
            <select
              className="flex-1 outline-none bg-white focus:outline-none border border-solid border-transparent rounded-lg p-2  hover:border-[#E5281A] duration-200"
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="Select Language">Select Language</option>
              {Object.entries(LANGUAGES).map(([key, value]) => {
                return (
                  <option key="key" value={value}>
                    {key}
                  </option>
                );
              })}
            </select>
            <button
              onClick={generateTranslation}
              className="specialBtn px-3 py-2 rounded-lg text-[#E5281A] hover:[#ff6054] duration-200"
            >
              Translate
            </button>
          </div>
        </div>
      )}
      {textElement && !translating && <p>{textElement}</p>}
      {translating && (
        <div className="grid place-items-center">
          <i className="fa-solid fa-circle-notch animate-spin"></i>
        </div>
      )}
    </div>
  );
}
