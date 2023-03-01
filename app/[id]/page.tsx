"use client";
import { languagesMapping } from "@/constants/constants";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Home from "../page";

const Main = () => {
  const [url, setURL] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (
        !Object.keys(languagesMapping).includes(
          window.location.pathname.slice(1))

      ) {
        if(window.location.pathname !== "/"){
          router.push("/en");
        }
      } else {
        setURL(window.location.pathname.slice(1));
      }
    }
  }, []);

  return (
    <>
      <Home lang={url} />
    </>
  );
};

export default Main;
