"use client";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Animals from "@/components/Aminals/Animals";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [animalsLoading, setAnimalsLoading] = useState(true);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full px-14 py-8">
        {/* Navbar controls */}
        <Navbar
          setAnimals={setAnimals}
          setCategories={setCategories}
          categories={categories}
          setAnimalsLoading={setAnimalsLoading}
        />

        {/* Animals section */}
        <Animals animals={animals} animalsLoading={animalsLoading} />
      </div>
    </>
  );
}
