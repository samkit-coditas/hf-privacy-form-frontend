"use client";
import React, { useState, useEffect } from "react";
import Home from "../page";

const Main = () => {
  const [url, setURL] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setURL(window.location.pathname.slice(1))
    }
  },[])

  return(
    <>
      <Home lang={url}/>
    </>
  )
};

export default Main;
