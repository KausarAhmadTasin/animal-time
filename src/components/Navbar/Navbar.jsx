"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchCategories } from "@/utils/fetchCategories";
import { fetchAnimals } from "@/utils/fetchAnimals";
import { useAxios } from "@/hooks/useAxios";

const image_hosting_key = process.env.NEXT_PUBLIC_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Navbar = ({
  categories,
  setAnimals,
  setCategories,
  setAnimalsLoading,
}) => {
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddAnimal, setShowAddAnimal] = useState(false);

  const [imageName, setImageName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [navSelectedCategory, setNavSelectedCategory] = useState("All");

  const [categoryError, setCategoryError] = useState("");
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const axiosUrl = useAxios();

  const handleClose = (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      if (showAddCategory) setShowAddCategory(false);
      if (showAddAnimal) setShowAddAnimal(false);
    }
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    const category = await fetchCategories();
    setCategories(category);
    setCategoriesLoading(false);
  };

  const loadAnimals = async () => {
    setAnimalsLoading(true);
    const animals = await fetchAnimals(navSelectedCategory);
    setAnimals(animals);
    setAnimalsLoading(false);
  };

  useEffect(() => {
    loadCategories();
  }, [axiosUrl]);

  useEffect(() => {
    loadAnimals();
  }, [navSelectedCategory]);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const category = {
      category_name: e.target.category.value,
    };

    await axiosUrl
      .post(`/categories`, category)
      .then((res) => {
        if (res.data.insertedId) {
          setShowAddCategory(false);
          loadCategories();
        }
      })
      .catch((error) => {
        setCategoryError(
          error?.response?.data?.message || "Error adding category"
        );
      });
  };

  const handleAddAnimalSubmit = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const imageFile = { image: e.target.image.files[0] };
    try {
      const res = await axios.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.data.display_url) {
        const animal = {
          animal_name: e.target.animal.value,
          animal_category: selectedCategory,
          image: res.data.data.display_url,
        };

        const animalRes = await axiosUrl.post("/animals", animal);
        if (animalRes.data.insertedId) {
          toast.success("Animal added!");
          setShowAddAnimal(false);
          loadAnimals();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error adding animal. Please try again.");
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <div>
      <ul className="flex gap-x-3 mb-2 text-base text-center justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-4">
          {categoriesLoading ? (
            <p className="text-center py-5 text-gray-300">
              Loading categories...
            </p>
          ) : (
            categories.length > 0 &&
            categories.map((category) => (
              <li
                key={category._id}
                className={`px-5 mb-5 py-3 border-2 rounded-full cursor-pointer ${
                  navSelectedCategory === category.category_name
                    ? "border-[#058F34] text-[#058F34]"
                    : "border-[#EF0D0D] text-[#EF0D0D]"
                }`}
                onClick={() => setNavSelectedCategory(category.category_name)}
              >
                {category.category_name}
              </li>
            ))
          )}
        </div>
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 h-fit gap-x-4">
          {" "}
          <li
            onClick={() => {
              setShowAddAnimal(true);
              setImageName("");
            }}
            className="px-3 py-3 border-2 rounded-full cursor-pointer"
          >
            Add Animal
          </li>
          <li
            onClick={() => {
              setShowAddCategory(true);
              setCategoryError("");
            }}
            className="px-5 py-3 border-2 rounded-full cursor-pointer"
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
                  <p className="text-rose-500 text-sm ml-1">{categoryError}</p>
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
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className="text-xl text-black mb-4">Add Animal</h2>
            <form onSubmit={handleAddAnimalSubmit}>
              {/* Animal name */}
              <div className="mb-4">
                <input
                  type="text"
                  name="animal"
                  required
                  className="w-full text-black px-4 py-3 border rounded-md bg-gray-100"
                  placeholder="Name"
                />
              </div>

              {/* Category selection */}
              <div className="mb-4">
                <select
                  required
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md bg-gray-100 text-black"
                >
                  <option className="text-gray-400" value="" disabled>
                    Choose a category
                  </option>
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option
                        className="text-base bg-gray-300"
                        value={category.category_name}
                      >
                        {category.category_name}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>

              {/* Image Input */}

              <div className="mb-4">
                <input
                  type="file"
                  name="image"
                  id="file-upload"
                  onChange={(e) => setImageName(e.target.files[0])}
                  className="hidden "
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-between cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-2 hover:bg-gray-200"
                >
                  <span className="text-gray-800 pl-3">
                    {imageName.name || "Image"}
                  </span>
                  <span className="text-black bg-[#CCC] rounded-lg px-2 py-1">
                    Upload
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={buttonDisabled}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
              >
                Create Animal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
