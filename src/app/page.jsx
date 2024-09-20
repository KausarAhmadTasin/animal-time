"use client";
import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";

export default function Home() {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [categoryError, setCategoryError] = useState("");
  const [categories, setCategories] = useState([]);

  const axiosUrl = useAxios();

  const handleClose = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      if (showAddCategory) setShowAddCategory(false);
      if (showAddAnimal) setShowAddAnimal(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axiosUrl.get(`/categories`);
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [axiosUrl]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const category = {
      category_name: e.target.category.value,
    };

    await axiosUrl
      .post(`/categories`, category)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          setShowAddCategory(false);
          fetchCategories();
        }
      })
      .catch((error) => {
        setCategoryError(error.response.data.message);
      });
  };

  return (
    <>
      <div className="min-h-screen w-full px-20 py-8">
        <ul className="flex text-lg text-center justify-between">
          <div className="grid grid-cols-4 gap-x-4">
            {" "}
            {categories.length > 0 ? (
              categories.map((category) => (
                <li className="px-5 mb-5 py-3 border rounded-full cursor-pointer">
                  {category.category_name}
                </li>
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="grid grid-cols-2 h-fit gap-x-4">
            {" "}
            <li
              onClick={() => setShowAddAnimal(true)}
              className="px-3 py-3 border rounded-full cursor-pointer"
            >
              Add Animal
            </li>
            <li
              onClick={() => {
                setShowAddCategory(true);
                setCategoryError("");
              }}
              className="px-5 py-3 border rounded-full cursor-pointer"
            >
              Add Category
            </li>
          </div>
        </ul>

        {/* Add Category Pop-up */}
        {showAddCategory && (
          <div
            className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose}
          >
            <div
              className="bg-white p-6 rounded-3xl max-w-sm w-full"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 className="text-xl text-black mb-4">Add Category</h2>
              <form onSubmit={handleCategorySubmit}>
                <div className="mb-4">
                  <input
                    name="category"
                    type="text"
                    required
                    className="w-full text-black px-6 py-3 border rounded-md bg-gray-100"
                    placeholder="Name"
                  />
                  {categoryError && (
                    <p className="text-rose-500 text-sm ml-1">
                      {categoryError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add Animal Pop-up */}
        {showAddAnimal && (
          <div
            className="modal-backdrop fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleClose}
          >
            <div
              className="bg-white p-6 rounded-3xl max-w-sm w-full"
              onClick={(event) => event.stopPropagation()} // Prevent click through the modal content
            >
              <h2 className="text-xl text-black mb-4">Add Category</h2>
              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    className="w-full text-black px-4 py-3 border rounded-md bg-gray-100"
                    placeholder="Name"
                  />
                </div>

                {/* Category selection */}
                <div className="mb-4">
                  <select
                    className="w-full px-4 py-3 border rounded-md bg-gray-100 text-black"
                    defaultValue="" // Ensures the first option is a placeholder
                  >
                    <option value="" disabled>
                      Choose a category
                    </option>
                    <option value="mammals">Mammals</option>
                    <option value="birds">Birds</option>
                    <option value="reptiles">Reptiles</option>
                    <option value="amphibians">Amphibians</option>
                    <option value="fish">Fish</option>
                    <option value="insects">Insects</option>
                  </select>
                </div>

                {/* Image Input */}
                <div className="mb-4 relative">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer absolute outline-1 z-10 text-black right-3 top-2 text-center bg-[#CCC] border px-2 py-1 rounded-lg hover:bg-gray-300"
                  >
                    Upload
                  </label>
                  <input
                    type="text"
                    readOnly
                    placeholder="Image"
                    className="w-full text-black px-5 py-3 outline-none border rounded-md bg-gray-100"
                  />
                  <input id="file-upload" type="file" className="hidden" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                >
                  Create Animal
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
