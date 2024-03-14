import React, { useState } from "react";

export default function ProductQuantity(props) {
  const { que, setQue } = props;

  // console.log("🚀 ~ ProductQuantity ~ stock:", stock);

  const setInc = () => {
    // console.log("setInc============");
    que < 5  ? setQue(que + 1) : setQue(que);
  };

  const setDec = () => {
    // console.log("setDec========");/
    que > 1 ? setQue(que - 1) : setQue(1);
  };

  return (
    <div className=" text-xl ">
      <button
        className="px-2 py-1 bg-[#ab7a5f] text-white hover:bg-[#c5a491] hover:text-black  rounded-md"
        onClick={setInc}
      >
        +
      </button>
      <input
        type="text"
        readOnly
        style={{ width: "30px" }}
        value={que}
        className="mx-1 text-center border py-1 rounded-md"
      />
      <button
        className="px-2 py-1 bg-[#ab7a5f] text-white hover:bg-[#c5a491] hover:text-black rounded-md"
        onClick={setDec}
      >
        -
      </button>
    </div>
  );
}
