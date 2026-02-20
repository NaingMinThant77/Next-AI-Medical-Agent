"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);
  return (
    <div className="mt-10">
      {historyList.length == 0 ? (
        <div className="flex items-center flex-col justify-center p-7 border-2 border-dashed rounded-2xl ">
          <Image
            src={"/medical-assistance.png"}
            alt="empty"
            width={150}
            height={150}
          />
          <h2 className="text-xl font-bold mt-3">No Recent Consultations</h2>
          <p>It looks like you have no recent consultations</p>
          <Button className="mt-3">+ Start a Consultation</Button>
        </div>
      ) : (
        <p className="text-center text-gray-500 font-bold">No history found</p>
      )}
    </div>
  );
};

export default HistoryList;
