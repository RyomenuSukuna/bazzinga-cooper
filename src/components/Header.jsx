import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4 p-4">
      <a href="/">
        <h1 className="text-[#E5281A] font-medium">
          Bazzinga<span className="text-[#FFD600] bold">Cooper</span>
        </h1>
      </a>
      <a
        href="/"
        className="flex items-center gap-2 specialBtn px-3 text-sm py-2 rounded-lg text-[#E5281A] hover:text-[#ff6054]"
      >
        <p>New</p>
        <i className="fa-solid fa-plus"></i>
      </a>
    </header>
  );
}
