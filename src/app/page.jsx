"use client";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Animals from "@/components/Aminals/Animals";
import Navbar from "@/components/Navbar/Navbar";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [animals, setAnimals] = useState([]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen w-full px-14 py-8">
        <Navbar
          setAnimals={setAnimals}
          setCategories={setCategories}
          categories={categories}
        />
        {/* Animals section */}
        <Animals animals={animals} />
      </div>
    </>
  );
}
