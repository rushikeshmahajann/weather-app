import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MainLayout from "../component/MainLayout";

function App() {
  return (
    <main className="w-screen h-screen overflow-y-auto flex justify-center items-center bg-[#F0F1F6]">
      <MainLayout />
    </main>
  );
}

export default App;
