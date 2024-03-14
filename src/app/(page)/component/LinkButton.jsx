import Link from "next/link";
import React from "react";

export default function LinkButton(props) {
  const { path, name } = props;
  return (
    <Link
      href={path}
      className="bg-[#ab7a5f] text-white hover:bg-[#c5a491] hover:text-black rounded-md px-3 py-2 text-sm font-medium tracking-wider"
    >
      {name}
    </Link>
  );
}
