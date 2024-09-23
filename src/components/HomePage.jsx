import React, { useState, useEffect, useRef } from "react";

import SheldonLogo from "../assets/Sheldon_Logo.jpg";

export default function HomePage(props) {
  const { setAudioStream, setFile } = props;

  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const mineType = "audio/webm";

  async function startRecording() {
    let tempStream;

    console.log("Start recording");

    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.log(err.message);
      return;
    }
    setRecordingStatus("recording");

    // create new Media recorder instance using the Stream
    const media = new MediaRecorder(tempStream, { type: mineType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") {
        return;
      }
      if (event.data.size === 0) {
        return;
      }
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  }

  async function stopRecording() {
    setRecordingStatus("inactive");
    console.log("Stop recording");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mineType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  }

  useEffect(() => {
    if (recordingStatus === "inactive") {
      return;
    }

    const interval = setInterval(() => {
      setDuration((curr) => curr + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <main className="flex-1 p-4 flex flex-col gap-3 text-center sm:gap-4  justify-center pb-20">
      <img src={SheldonLogo} alt="" className="w-32 h-auto mx-auto" />
      <h1 className="text-[#E5281A] font-semibold text-5xl sm:text-6xl md:text-7xl">
        Bazzinga<span className="text-[#FFD600] bold">Cooper</span>
      </h1>
      <h3 className="font-medium text-[#E5281A] md:text-lg">
        Record <span className="text-[#FFD600]">&rarr;</span> Transcribe{" "}
        <span className="text-[#FFD600]">&rarr;</span> Translate{" "}
        <span className="text-[#FFD600]">&rarr;</span>
      </h3>
      <button
        onClick={
          recordingStatus === "recording" ? stopRecording : startRecording
        }
        className="flex specialBtn px-4 py-2 rounded-xl item-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4"
      >
        <p className="text-[#FFD600]">
          {recordingStatus === "inactive" ? "Record" : `Stop recording`}
        </p>
        <div className="flex item-center gap-2">
          {duration && <p className="text-sm">{duration}s</p>}
          <i
            className={
              "fa-solid duration-200 fa-microphone pt-1" +
              (recordingStatus === "recording" ? " text-rose-300 " : " ")
            }
          ></i>
        </div>
      </button>
      <p className="text-base">
        Or{" "}
        <label className="text-[#FFD600] cursor-pointer hover:text-[#E5281A] duration-200">
          upload{" "}
          <input
            onChange={(e) => {
              const tempFile = e.target.files[0];
              setFile(tempFile);
            }}
            className="hidden"
            type="file"
            accept=".mp3,.wave"
          />
        </label>{" "}
        an mp3 file
      </p>
      <p className="italic text-slate-400">Free now free forever</p>
    </main>
  );
}
