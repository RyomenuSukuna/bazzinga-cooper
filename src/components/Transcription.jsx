import React from "react";

export default function Transcription(props) {
  const { textElement } = props;

  return <div className="flex flex-col ">{textElement}</div>;
}
